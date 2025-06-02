import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'node:process';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
      // *  환경 변수에서 JWT 토큰키 가져옴
        const jwtSecret = process.env.JWT_TOKEN_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_TOKEN_SECRET is not defined in environment variables');
        }

         // * ExtractJwt.fromAuthHeaderAsBearerToken() : Authorization 헤더에서 Bearer 토큰을 추출하는 함수
         // * secretOrKey : JWT 토큰을 검증하기 위한 비밀 키

      const cookieExtractor = (req: any) => {
            let token = null;
            if (req && req.cookies) {
                token = req.cookies['access_token']; // 쿠키에서 jwt 토큰을 추출
            }
            return token;
      }

      super({
        // 헤더에서 못찾으면 쿠키에서 찾도록 설정함
        jwtFromRequest: ExtractJwt.fromExtractors([
          ExtractJwt.fromAuthHeaderAsBearerToken(),
          cookieExtractor,
        ]),
        secretOrKey: jwtSecret,
      });
    }

    // 페이로드에 담긴 정보를 이용해 사용자 정보 검증함
    async validate(payload: any) {
        return { user_id: payload.user_id, name:payload.name, guide_check: payload.guide_check };
    }
}