import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(_type => String, { nullable: false })
  id: string;

  @Field(_type => String, { nullable: false })
  name: string;

  @Field(_type => String, { nullable: false })
  email: string;

  password: string;

  @Field(_type => String, { nullable: true })
  image_url?: string;
}
