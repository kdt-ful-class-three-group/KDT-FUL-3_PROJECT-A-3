import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AccountDto } from "./dto/account.dto";
import { GetService } from './get.service';
import { CheckDto } from "./dto/check.dto";
import { CheckService } from "./check.service";


@Controller('account')
export class AccountController {
  constructor(
    private readonly AccountService: AccountService,
    private readonly GetService: GetService,
    private readonly CheckService: CheckService,

  ) {}
  @Get()
  async getAllAccount() {
    return this.GetService.getAllAccount();
  }

  @Post('make')
  async account(@Req() req, @Res({ passthrough: true })res: Response) {
    return this.AccountService.account(req, res);
  }

  @Post('check')
    async check(@Req() req, @Res({ passthrough: true })res: Response) {
    return this.CheckService.check(req, res);
  }
}