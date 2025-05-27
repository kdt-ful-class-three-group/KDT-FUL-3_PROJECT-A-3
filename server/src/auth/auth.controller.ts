import { IdCheckDto } from './dto/idCheck.dto';
import { IdCheckService } from './idCheck.service';
import { LoginService } from './login.service';
import { Body, Controller, Post, Get,HttpCode } from "@nestjs/common";
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {EmailCheckService} from "./emailCheck.service";
import {EmailCheckDto} from "./dto/emailCheck.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly loginService: LoginService,
    private readonly IdCheckService: IdCheckService,
    private readonly EmailCheckService: EmailCheckService,
  ) {}
  @Post('register')

  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
  @Post('login')
  async login(@Body() dto : LoginDto) {
    return this.loginService.login(dto);
  }
  @Post('idCheck')
  async idCheck(@Body() dto: IdCheckDto) {
    return this.IdCheckService.idCheck(dto);
  }
  @Post('emailCheck')
    async emailCheck(@Body() dto: EmailCheckDto) {
        return this.EmailCheckService.emailCheck(dto);
    }
}