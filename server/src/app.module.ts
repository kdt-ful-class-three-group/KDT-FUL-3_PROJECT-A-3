import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './database/db.module';
import { ConfigModule } from '@nestjs/config';
import {StocksModule} from "./stocks/stocks.module";

@Module({
    imports: [ConfigModule.forRoot({isGlobal:true}),AuthModule, DbModule, StocksModule],
})
export class AppModule {}