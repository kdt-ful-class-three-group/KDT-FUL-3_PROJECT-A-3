import {ApiProperty} from "@nestjs/swagger";

export class AccountDto {
  @ApiProperty()
  user_id: string;
  account_number: string;
  asset: number;
}
