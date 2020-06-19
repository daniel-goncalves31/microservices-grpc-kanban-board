import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'projects-service',
    package: ['stage', 'project', 'task'],
    protoPath: join(__dirname, '../protos/root.proto'),
    loader: {
      arrays: true,
    },
  },
};
