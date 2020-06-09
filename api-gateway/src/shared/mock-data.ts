import { SignUpUserInput } from 'src/users/users.types';

export const getFakeUsers = () => {
  const users: SignUpUserInput[] = [];

  for (let i = 0; i < 2; i++) {
    users.push({
      name: `teste ${i}`,
      email: `teste${i}@teste.com`,
      password: `teste${i}`,
      image_url: `image_teste${i}`,
    });
  }

  return users;
};
