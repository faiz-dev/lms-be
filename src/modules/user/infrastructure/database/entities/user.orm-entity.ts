import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserOrmEntity {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'role' })
  role: 'admin' | 'teacher' | 'student';

  @Column({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt?: Date | null;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date | null;
}
