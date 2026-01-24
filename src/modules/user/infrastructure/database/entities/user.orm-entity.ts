import { Column, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

export type UserRoleType = 'admin' | 'teacher' | 'student';

export const RoleMap = {
  admin: 1,
  teacher: 2,
  student: 3,
};

export const RoleMapInverse: Record<number, UserRoleType> = {
  1: 'admin',
  2: 'teacher',
  3: 'student',
};

@Entity({ name: 'users' })
export class UserOrmEntity {
  @PrimaryColumn({ name: 'id', type: 'int', generated: true })
  id: number;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({
    type: 'int',
    name: 'role',
    transformer: {
      to: (value: UserRoleType) => RoleMap[value] ?? 3,
      from: (value: number) => RoleMapInverse[value] ?? 'student',
    },
  })
  role: UserRoleType;

  @Column({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt?: Date | null;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date | null;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date | null;
}
