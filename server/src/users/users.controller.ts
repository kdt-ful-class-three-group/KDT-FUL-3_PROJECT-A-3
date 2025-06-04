import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// * Controller 데코레이터의 괄호 안에 경로를 지정하지 않으면, 기본적으로 해당 컨트롤러의 경로는 '/users'가 된다.
// * 괄호안에 경로를 지정하면, 해당 경로가 컨트롤러의 기본 경로가 된다.
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // * @Get 데코레이터는 HTTP GET 요청을 처리하고, 괄호안에 경로를 지정하지 않으면, 기본적으로 컨트롤러의 기본 경로가 된다.
  // * 따라서, 이 컨트롤러의 기본 경로는 '/users'가 되고, 이 메서드는 '/users' 경로로 GET 요청을 처리한다.
  @Get()
  // * getAllUsers 메서드는 UsersService의 getAllUsers 메서드를 호출하여 모든 유저 정보를 가져온다.
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // 유저에 표시할 아이디 가져오기
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req){
    return this.usersService.getUserById(req.user.user_id)
  }
}