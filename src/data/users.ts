
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
};

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: '123456',
    phone: '03001234567',
  },
];
