import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbModule } from '../database/db.module'; // 👈 이거 추가
import { LoginService } from './login.service';

@Module({
    imports: [DbModule],
    controllers: [AuthController],
    providers: [AuthService, LoginService],
})
export class AuthModule {}