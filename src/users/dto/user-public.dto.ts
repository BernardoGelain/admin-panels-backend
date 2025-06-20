import { User } from '../entities/user.entity';

// src/users/dto/user-public.dto.ts
export class UserPublicDto {
  name: string;
  email: string;
  telephone: string;
  isActive: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
  dateJoined: Date;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
