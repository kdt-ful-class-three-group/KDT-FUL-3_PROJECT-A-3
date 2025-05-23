import { LoginService } from './login.service';
import { Body, Controller, Post, Get,HttpCode } from "@nestjs/common";
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,    private readonly loginService: LoginService) {}
  @Get()
  async getHello() {
    return 'Hello World!';
  }
  @Post('register')
  @HttpCode(201)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
  @Post('login')
  @HttpCode(201)
  async login(@Body() dto : LoginDto) {
    return this.loginService.login(dto);
  }
}