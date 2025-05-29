import {ApiProperty} from "@nestjs/swagger";

export class CheckDto {
  @ApiProperty()
  user_id: string;
}
