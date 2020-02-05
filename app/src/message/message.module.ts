import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from './message.entity';
import { MessagesService } from './message.service';
import { MessagesController } from './message.controller';
import { MessageGateway } from './message.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessagesService, MessageGateway],
  controllers: [MessagesController],
})
export class MessagesModule {}