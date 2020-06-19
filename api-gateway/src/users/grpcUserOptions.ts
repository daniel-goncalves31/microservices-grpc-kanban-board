import { ClientOptions, Transport } from '@nestjs/microservices';
import 'dotenv/config';
import { join } from 'path';

export const userGrpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: process.env.USERS_SERVICE_URL,
    package: 'users',
    protoPath: join(__dirname, '../protos/users.proto'),
  },
};
