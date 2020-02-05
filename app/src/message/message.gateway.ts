import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Message } from './message.entity';
import { Server } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@WebSocketGateway()
export class MessageGateway implements OnGatewayConnection{

  @WebSocketServer()
  server: Server;
  repo: Repository<Message>;

  constructor(@InjectRepository(Message) repo) {
    this.repo = repo;
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('CLiente conectado');
  }

  @SubscribeMessage('getMessages')
  async getMessages(): Promise<Array<Message>>  {
    const messages = await this.repo.find()
    return messages;
  }

  @SubscribeMessage('createMessage')
  async createMessage(@MessageBody() data: { user: string, text: string }): Promise<void>{
      const message = await this.repo.save(data);
      this.server.emit('messageCreated', message)
  }
}