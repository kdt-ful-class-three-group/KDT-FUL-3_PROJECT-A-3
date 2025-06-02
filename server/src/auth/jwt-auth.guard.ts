// 로그인한 사용자만 접근 가능한 API를 만들 때 필수적인 NestJS인증 가드
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}