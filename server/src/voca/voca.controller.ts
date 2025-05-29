import { Controller, Get } from "@nestjs/common";
import { VocaService } from "./voca.service";

//* 경로
@Controller('voca')
export class VocaController{
  constructor(private readonly vocaService:VocaService){}

  //*GET
  @Get()
  async getAllVoca(){
    return this.vocaService.getAllVoca()
  }
} 