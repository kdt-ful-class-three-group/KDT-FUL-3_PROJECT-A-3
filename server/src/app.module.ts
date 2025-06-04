import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './database/db.module';
import { ConfigModule } from '@nestjs/config';
import {StocksModule} from "./stocks/stocks.module";
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from './account/account.module';
import { VocaModule } from './voca/voca.module';
import { UserPortfolioModule } from './userportfolio/userportfolio.module';
import { FavoritessModule } from './favorites/favorites.module';

@Module({

    imports: [ConfigModule.forRoot({isGlobal:true}),AuthModule, UsersModule, StocksModule, JwtModule, AccountModule,VocaModule, UserPortfolioModule, FavoritessModule],
})
export class AppModule {}