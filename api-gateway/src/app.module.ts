import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(__dirname, 'schema.gql'),
    }),
  ],
})
export class AppModule {}
