import { Prisma, User } from '@prisma/client';
export class UsersEntity implements User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  verified: boolean;
  activated: boolean;
  roles: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
