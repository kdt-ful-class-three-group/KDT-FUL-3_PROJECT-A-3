import {Body, Controller, Get, Post, Res, Req, UseGuards} from "@nestjs/common";
import { AccountService } from "./account.service";
import { CheckService } from './check.service';
import { AuthGuard } from '@nestjs/passport';
import {response} from "express";
import { InsertService } from "./account.insert";
import { AccountDto } from "./dto/account.dto";


@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly CheckService: CheckService,
    private readonly InsertService: InsertService,
  ) {}
  @Get()
  async getAllAccount() {
    return this.CheckService.getAllAccount();
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
}
