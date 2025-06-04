import { GetPortfolio } from './getPortfolio.service';
import {Body, Controller, Get, Post, Res, Req, UseGuards, Patch} from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import {response} from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserPortfolioDto } from "./dto/userportfolio.dto";
import { TradeService } from "./userportfolio.service";


@Controller('userportfolio')
export class UserPortfolioController {
  constructor(
    private readonly TradeService: TradeService,
    private readonly GetPortfolio: GetPortfolio,
  ) {}

  @Post('calc')
  @UseGuards(AuthGuard('jwt'))
  async calc(@Req() req: any) 
  {
    return this.GetPortfolio.calc(req.user); // dto 제거
  }

  @Patch('trade')
  @UseGuards(AuthGuard('jwt'))
  async trade(@Body() dto: UserPortfolioDto, @Req() req: any) {
    console.log('데이터가 들어는 와유');
    return this.TradeService.trade(dto, req.user);
  }
} 
