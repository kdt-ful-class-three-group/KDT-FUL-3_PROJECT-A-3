import { IsEmail, IsString, Length } from 'class-validator';

export class VerifyCodeDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 6, { message: '인증코드는 6자리여야 합니다.' })
  code: string;
}