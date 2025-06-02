import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbModule } from '../database/db.module';
import { LoginService } from './login.service';
import { IdCheckService } from './idCheck.service';
import {EmailCheckService} from "./emailCheck.service";
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {JwtStrategy} from "./Jwtstrategy";


@Module({
    imports: [
        DbModule, 
        JwtModule.registerAsync({
            imports: [ConfigModule], //
            inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_TOKEN_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
],
    controllers: [AuthController],
    providers: [AuthService, LoginService, IdCheckService, EmailCheckService, JwtStrategy],
})
export class AuthModule {}