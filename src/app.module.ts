import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { PanelsModule } from './panels/panels.module';
import { MessagesModule } from './messages/messages.module';
import { GroupsModule } from './groups/groups.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass',
      database: 'marcante',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    PanelsModule,
    MessagesModule,
    GroupsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
