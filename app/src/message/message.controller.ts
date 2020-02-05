import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Message } from './message.entity';
import { MessagesService } from './message.service';

@Crud({
  model: {
    type: Message,
  },
})
@Controller('messages')
export class MessagesController {
  constructor(public service: MessagesService) {}
}