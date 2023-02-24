import { Prisma, User } from '@prisma/client';
export class UsersEntity implements User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  photoUrl: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  addressCountry: string;
  verified: boolean;
  token: string;
  activated: boolean;
  deleted: boolean;
  roles: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
