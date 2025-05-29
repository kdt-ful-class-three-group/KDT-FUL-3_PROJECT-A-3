import { Body, Controller, Get, Post } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AccountDto } from "./dto/account.dto";
import { CheckService } from './check.service';


@Controller('account')
export class AccountController {
  constructor(
    private readonly AccountService: AccountService,
    private readonly CheckService: CheckService
  ) {}
  @Get()
  async getAllAccount() {
    return this.CheckService.getAllAccount();
  }

  @Post('make')
  async account(@Body() dto : AccountDto) {
    return this.AccountService.account(dto);
  }
}