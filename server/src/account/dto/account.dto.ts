import {ApiProperty} from "@nestjs/swagger";

export class AccountDto {
  @ApiProperty()
  name: string;
  account_number: number;
  asset: number;
}
