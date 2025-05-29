import { Module } from "@nestjs/common";
import { DbModule } from "src/database/db.module";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { GetService } from "./get.service";
import { CheckService } from "./check.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
    imports: [
        DbModule,
        JwtModule.registerAsync({
                    imports: [ConfigModule], // 👈 ConfigModule 주입
                    inject: [ConfigService],
                useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_TOKEN_SECRET'),
                signOptions: { expiresIn: '1h' },
              }),
            }),
    ],
    controllers: [AccountController],
    providers: [AccountService, GetService, CheckService],
})
export class AccountModule {}