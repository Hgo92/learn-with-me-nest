import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DecksModule } from './decks/decks.module';
import { DatabaseModule } from './database/database.module';
import { CardsModule } from './cards/cards.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from 'auth';

@Module({
  imports: [
    DecksModule,
    DatabaseModule,
    CardsModule,
    UsersModule,
    // AuthModule.forRoot({ auth }), A remettre quand j'aurai un compte
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
