import { LoginService } from './login.service';
import { Body, Controller, Post, Get,HttpCode } from "@nestjs/common";
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly loginService: LoginService) {}
  @Get()
  async getHello() {
    return 'Hello World!';
  }
  @Post('register')

  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
  @Post('login')
  async login(@Body() dto : LoginDto) {
    return this.loginService.login(dto);
  }
}