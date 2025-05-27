import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './database/db.module';
import { ConfigModule } from '@nestjs/config';
import {StocksModule} from "./stocks/stocks.module";
import { JwtModule } from '@nestjs/jwt';

@Module({

    imports: [ConfigModule.forRoot({isGlobal:true}),AuthModule, UsersModule, DbModule, StocksModule, JwtModule],
})
export class AppModule {}