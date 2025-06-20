import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

// Cria a conexão com o banco (igual ao que está no ormconfig.ts)

export async function seedUsers(AppDataSource: DataSource) {
  const userRepo = AppDataSource.getRepository(User);
  const passwordHash = await bcrypt.hash('password', 10);

  const users = [
    {
      name: 'Jeferson Marcante',
      email: 'jeferson@marcante.com',
      telephone: '11999999999',
      password: passwordHash,
      isActive: true,
      isStaff: true,
      isSuperuser: true,
    },
    {
      name: 'Bernardo Dariva',
      email: 'bernardo@dariva.com',
      telephone: '11888888888',
      password: passwordHash,
      isActive: true,
      isStaff: true,
      isSuperuser: true,
    },
    {
      name: 'Cliente',
      email: 'cliente@cliente.com',
      telephone: '11888998888',
      password: passwordHash,
      isActive: true,
      isStaff: false,
      isSuperuser: false,
      tenantId: 1, // ← com tenant
    },
  ];

  for (const user of users) {
    const existing = await userRepo.findOne({ where: { email: user.email } });

    if (!existing) {
      await userRepo.save(user);
      console.log(`✅ Usuário ${user.email} criado`);
    } else {
      console.log(`ℹ️ Usuário ${user.email} já existe`);
    }
  }
}
