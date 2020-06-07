import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hashSync } from 'bcryptjs';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', function(next: Function) {
  const user = this;
  if (user.password) {
    const hash = hashSync(user.password, 12);
    user.password = hash;
    next();
  }
});

export { UserSchema };
