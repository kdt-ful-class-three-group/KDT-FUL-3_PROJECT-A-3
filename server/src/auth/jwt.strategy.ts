// jwt라는 인증 전략 (strategy) 등록

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(configService: ConfigService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // '!' 없이 작성 -> 계속 타입에러 발생
      // '!' 사용 : 해당 값이 undefined가 아님을 보장하겠다는 의미, .get() 값이 항상 존재하는 경우에만 사용
      secretOrKey: configService.get<string>('JWT_TOKEN_SECRET')!,
    })
  }

  async validate(payload:any) {
    // payload : {user_id:...,...}
    return {user_id: payload.user_id}
  }
}