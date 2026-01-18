export interface IUserProps {
  id?: number;
  email: string;
  password: string;
  role: 'admin' | 'teacher' | 'student';
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserParam = Omit<
  IUserProps,
  'id' | 'createdAt' | 'updatedAt'
> & {
  createdAt?: Date; // Optional (untuk keperluan restore/seeding)
  updatedAt?: Date;
  id?: number;
};

export class User implements IUserProps {
  readonly id?: number | undefined;
  readonly email: string;
  readonly password: string;
  readonly role: 'admin' | 'teacher' | 'student';
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: IUserProps) {
    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
    this.role = props.role;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: CreateUserParam): User {
    const now = props.createdAt ?? new Date();

    return new User({
      ...props,
      createdAt: now,
      updatedAt: props.updatedAt ?? now,
    });
  }

  updateEmail(newEmail: string): User {
    return new User({
      ...this,
      email: newEmail,
      updatedAt: new Date(),
    });
  }

  updatePassword(newPassword: string): User {
    return new User({
      ...this,
      password: newPassword,
      updatedAt: new Date(),
    });
  }
}
