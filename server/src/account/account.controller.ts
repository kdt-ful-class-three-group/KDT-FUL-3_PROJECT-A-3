import {Body, Controller, Get, Post, Res, Req, UseGuards} from "@nestjs/common";
import { AccountService } from "./account.service";
import { AuthGuard } from '@nestjs/passport';
import {response} from "express";
import { InsertService } from "./account.insert";
import { AccountDto } from "./dto/account.dto";
import { GetService } from "./get.service";
import { CheckService } from './check.service';
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";


@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly GetService: GetService,
    private readonly InsertService: InsertService,
    private readonly CheckService: CheckService,
  ) {}

  @Get()
  async getAllAccount() {
    return this.GetService.getAllAccount();
  }

  @Post('check')
  @UseGuards(AuthGuard('jwt'))
    async check(@Req() req:any) {
    return this.CheckService.check(req.user);
  }


  @Post('createNumber')
  @UseGuards(AuthGuard('jwt'))
  async create(@Req() req: any) {
    console.log(req.cookies)
    return this.accountService.createAccount(req.user,null); // req.user를 넘김
  }

  @Post('insertData')
  @UseGuards(AuthGuard('jwt'))
  async createAccount(@Body() dto: AccountDto, @Req() req: any) {
    return this.InsertService.insertAccount(dto, req.user);
  }

  //   @Post('make')
  // async account(@Body() dto : AccountDto) {
  //   return this.accountService.createAccount(dto,null);
  // }

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
