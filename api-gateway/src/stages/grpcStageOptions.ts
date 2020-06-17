import { ClientOptions, Transport } from '@nestjs/microservices';
import 'dotenv/config';
import { join } from 'path';

export const grpcStageOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'projects-service',
    package: 'stage',
    protoPath: join(__dirname, 'stage.proto'),
    loader: {
      arrays: true,
    },
  },
};
