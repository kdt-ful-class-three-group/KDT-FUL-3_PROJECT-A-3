import {ApiProperty} from "@nestjs/swagger";

export class IdCheckDto {
  @ApiProperty()
  user_id: string;
}