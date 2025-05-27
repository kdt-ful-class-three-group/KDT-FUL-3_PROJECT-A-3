import { JwtService } from '@nestjs/jwt';
import { IdCheckDto } from './dto/idCheck.dto';
import { IdCheckService } from './idCheck.service';
import { LoginService } from './login.service';
import { Body, Controller, Post, Get,HttpCode, Res, UnauthorizedException, Req } from "@nestjs/common";
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {EmailCheckService} from "./emailCheck.service";
import {EmailCheckDto} from "./dto/emailCheck.dto";
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly loginService: LoginService,
    private readonly IdCheckService: IdCheckService,
    private readonly EmailCheckService: EmailCheckService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('register')

  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
  @Post('login')
  // async login(@Body() dto : LoginDto) {
  //   return this.loginService.login(dto);
  // }
  async login(
  @Body() loginDto: LoginDto,
  @Res({ passthrough: true }) res: Response,
) {
  const { accessToken, refreshToken, user_id, message } =
    await this.loginService.login(loginDto);

  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    // * 1분
    maxAge: 1000 * 60 
  });

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    // * 5분
    maxAge: 1000 * 60 * 5, 
  });

  return { message, user_id };
}
  @Post('idCheck')
  async idCheck(@Body() dto: IdCheckDto) {
    return this.IdCheckService.idCheck(dto);
  }
  @Post('emailCheck')
    async emailCheck(@Body() dto: EmailCheckDto) {
        return this.EmailCheckService.emailCheck(dto);
    }
    @Post('refresh')
async refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) throw new UnauthorizedException('Refresh Token 없음');

  try {
    const payload = this.jwtService.verify(refreshToken); // 검증
    const newAccessToken = this.jwtService.sign(
      { sub: payload.sub, name: payload.name, guide_check: payload.guide_check },
      { expiresIn: '1m' },
    );

    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 ,
    });

    return { message: 'Access Token 재발급 성공' };
  } catch (err) {
    throw new UnauthorizedException('Refresh Token이 유효하지 않음');
  }
}

}
