import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty()
  user_id: string;
  password: string;
}
