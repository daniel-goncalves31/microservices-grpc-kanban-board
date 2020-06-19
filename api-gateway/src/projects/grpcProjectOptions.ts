import { ClientOptions, Transport } from '@nestjs/microservices';
import 'dotenv/config';
import { join } from 'path';

export const grpcProjectOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'projects-service',
    package: 'project',
    protoPath: join(__dirname, 'project.proto'),
    loader: {
      arrays: true,
    },
  },
};
