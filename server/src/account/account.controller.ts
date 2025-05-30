import { Body, Controller, Get, Post, UseGuards , Req } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AccountDto } from "./dto/account.dto";
import { CheckService } from './check.service';
import { GetService } from "./get.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";


@Controller('account')
export class AccountController {
  constructor(
    private readonly AccountService: AccountService,
    private readonly CheckService: CheckService,
    private readonly GetService: GetService
  ) {}

  @Get()
  async getAllAccount() {
    return this.CheckService.getAllAccount();
  }

  @Post('make')
  async account(@Body() dto : AccountDto) {
    return this.AccountService.account(dto);
  }

  // 토큰 사용해서 계좌 정보 읽기
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyAccount(@Req() req){
    // req.user.user_id 에서 유저 정보 추출
    // 디버깅
    // console.log('req.user',req.user)
    return this.GetService.getAccountByUserId(req.user.user_id)
  }
}