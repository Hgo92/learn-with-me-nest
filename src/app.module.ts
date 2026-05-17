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
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    DecksModule,
    DatabaseModule,
    CardsModule,
    UsersModule,
    AuthModule.forRoot({ auth }),
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    UsersService,
    // { provide: APP_GUARD, useClass: AuthGuard }, // Protège toutes les routes par défaut grâce au AuthGuard de Better Auth
  ],
})
export class AppModule {}
