import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './database/db.module';
import { ConfigModule } from '@nestjs/config';
import {StocksModule} from "./stocks/stocks.module";
import { AccountModule } from './account/account.module';

@Module({

    imports: [ConfigModule.forRoot({isGlobal:true}),AuthModule, UsersModule, DbModule, StocksModule, AccountModule],
})
export class AppModule {}