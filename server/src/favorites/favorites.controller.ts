import { DeleteService } from './delete.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesDto } from './dto/favorites.dto';
import { AuthGuard } from '@nestjs/passport';

// * Controller 데코레이터의 괄호 안에 경로를 지정하지 않으면, 기본적으로 해당 컨트롤러의 경로는 '/users'가 된다.
// * 괄호안에 경로를 지정하면, 해당 경로가 컨트롤러의 기본 경로가 된다.
@Controller('favorites')
export class FavoritesController {
  constructor(
    private readonly FavoritesService: FavoritesService,
    private readonly DeleteService: DeleteService,
  ) {}

  // * @Get 데코레이터는 HTTP GET 요청을 처리하고, 괄호안에 경로를 지정하지 않으면, 기본적으로 컨트롤러의 기본 경로가 된다.
  // * 따라서, 이 컨트롤러의 기본 경로는 '/users'가 되고, 이 메서드는 '/users' 경로로 GET 요청을 처리한다.
  @Post()
  @UseGuards(AuthGuard('jwt'))
  // * getAllUsers 메서드는 UsersService의 getAllUsers 메서드를 호출하여 모든 유저 정보를 가져온다.
  async favorites(@Body() dto:FavoritesDto, @Req()  req: any) {
    return this.FavoritesService.favorites(dto, req.user);
  }

  @Post('delete')
  @UseGuards(AuthGuard('jwt'))
  // * getAllUsers 메서드는 UsersService의 getAllUsers 메서드를 호출하여 모든 유저 정보를 가져온다.
  async delete(@Body() dto:FavoritesDto, @Req()  req: any) {
    return this.DeleteService.delete(dto, req.user);
  }
}