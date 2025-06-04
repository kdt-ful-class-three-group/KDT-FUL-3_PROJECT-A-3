import {ApiProperty} from "@nestjs/swagger";

export class FavoritesDto {
  @ApiProperty()
  symbol: string;
  user_id: string;
}
