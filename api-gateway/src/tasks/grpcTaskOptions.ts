import { ClientOptions, Transport } from '@nestjs/microservices';
import 'dotenv/config';
import { join } from 'path';

export const taskGrpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'projects-service',
    package: 'task',
    protoPath: join(__dirname, 'task.proto'),
  },
};
