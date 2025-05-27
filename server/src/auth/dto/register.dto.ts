import {ApiProperty} from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty()
  name: string;
  user_id: string;
  birth: Date;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  last_login: Date;
  guide_check: boolean;
}
