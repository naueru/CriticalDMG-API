import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from '../message/message.entity';

const databaseConnectionModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'chat',
  entities: [Message],
  synchronize: true,
});

export { databaseConnectionModule }
