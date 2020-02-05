import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService extends TypeOrmCrudService<Message> {
  constructor(@InjectRepository(Message) repo) {
    super(repo);
  }
}