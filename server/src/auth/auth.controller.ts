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
    maxAge: 1000 * 60 * 60
  });

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    // * 5분
    maxAge: 1000 * 60 * 60,
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

  // * auth/refresh로 post요청이 들어오면
  @Post('refresh')
  // * { passthrough: true } => NestJS가 기본 응답 흐름을 유지한 채, res 객체만 활용하겠다는 설정
  async refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    // * 디버깅을 위한 콘솔
    console.log('리프레쉬 요청 실행');

    // * accessToken은 req의 쿠키의 access_token이 존재할 때, 가져온 값이다.) 만일 쿠키에 access_token이 존재하지 않으면, undefined
    const accessToken = req.cookies?.access_token;
    //  * 만일 accessToken에 값이 존재하면,
    if (accessToken) {
      // * accessToken 유효 메시지를 보내고, 로직 종료.
      try {
        return { message: 'Access Token 아직 유효함' };
      // * accessToken에 값이 없다면, 아무일도 일어나지 않고, 뒤의 흐름 계속 진행.
      } catch (err) {
      }
    } else {

    // * refreshToken은 req의 쿠키의 refresh_token이 존재할 때, 가져온 값이다.) 만일 쿠키에 refresh_token이 존재하지 않으면, undefined
    const refreshToken = req.cookies?.refresh_token;

    //  * 만일 refreshToken에 값이 존재하지 않으면, 상태코드 401 반환.
    if (!refreshToken) {throw new UnauthorizedException('Refresh Token 없음');}
    // * refreshToken이 존재하면,
    else {

    try {
      // * payload라는 변수에 refreshToken이 유효한 refreshToken인지 검증하는 절차를 거침.
      const payload = this.jwtService.verify(refreshToken); 

      // * 새로운 accessToken 생성 로직.
      const newAccessToken = this.jwtService.sign(
        // * 토큰에 들어갈 데이터
        { user_id: payload.user_id, name: payload.name, guide_check: payload.guide_check },
        // * 유효기간
        { expiresIn: '1m' },
      );
      // * 클라이언트의 쿠키에 토큰을 보내는 로직.
      // * 쿠키 명 : access_token, 쿠키의 내용 위에서 생성한 새로운 accessToken
      res.cookie('access_token', newAccessToken, {
        // * js에서 해당 토큰에 접근 할 수 없도록 함. (xss로 접근 불가.)
        httpOnly: true,
        // * https 환경에서만 쿠키를 전송하도록 하는 조건 => 현재는 http 환경이므로 false, 후에 배포할 때는 https인증을 받아 배포하게 되면 true로 설정.
        secure: false,
        // * get, header와 같은 비교적 안정적인 요청에는 쿠키 전송 허용.
        sameSite: 'lax',
        // * 쿠키 만료 기간 을 10초로 설정.
        // * 디버깅 용으로 짧게 설정 해놓음. 이후 배포할 때는 1000 * 60 * 15 와 같이 15분으로 설정하던가 하는 형식으로 늘릴 듯.
        maxAge: 1000 * 10,
      });

      // * 클라이언트 측에서 확인 가능하게, 토큰 재발급 성공을 메세지에 담아서 보내줌.
      return { message: 'Access Token 재발급 성공' };
    } catch (err) {
      // * 만일 리프레시 토큰이 없을 경우 오류코드 401 반환.
      throw new UnauthorizedException('Refresh Token이 유효하지 않음');
    }
  }
}
}

}
