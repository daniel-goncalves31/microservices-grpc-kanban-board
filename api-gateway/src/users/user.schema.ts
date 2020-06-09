import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  email: string;

  password: string;

  @Field(() => String, { nullable: true })
  image_url?: string;
}
