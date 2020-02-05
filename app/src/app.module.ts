import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { databaseConnectionModule } from './db/database';
import { AppService } from './app.service';


import { MessagesModule } from './message/message.module';

@Module({
  imports: [MessagesModule, databaseConnectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
