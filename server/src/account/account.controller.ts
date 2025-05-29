import {Body, Controller, Get, Post, Res, Req, UseGuards} from "@nestjs/common";
import { AccountService } from "./account.service";
import { CheckService } from './check.service';
import { AuthGuard } from '@nestjs/passport';
import {response} from "express";


@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly CheckService: CheckService
  ) {}
  @Get()
  async getAllAccount() {
    return this.CheckService.getAllAccount();
  }


  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async create(@Req() req: any) {
    console.log(req.cookies)
    return this.accountService.createAccount(req.user,null); // req.user를 넘김
  }
}
