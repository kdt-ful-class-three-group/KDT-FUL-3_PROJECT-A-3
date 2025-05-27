import {Injectable, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbModule } from '../database/db.module'; // 👈 이거 추가
import { LoginService } from './login.service';
import { IdCheckService } from './idCheck.service';
import {EmailCheckService} from "./emailCheck.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from '@nestjs/config';



@Module({
    imports: [DbModule, JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_TOKEN_SECRET'),
            signOptions: { expiresIn: '15m' }, // 토큰 만료 시간 설정
        }),
    })],
    controllers: [AuthController],
    providers: [AuthService, LoginService, IdCheckService, EmailCheckService],
})
export class AuthModule {}