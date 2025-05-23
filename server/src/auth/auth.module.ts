import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbModule } from '../database/db.module'; // 👈 이거 추가

@Module({
    imports: [DbModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}