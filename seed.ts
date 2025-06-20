import { Location } from 'src/locations/entities/location.entity';
import { Panel } from 'src/panels/entities/panel.entity';
import { seedPanelsAndLocations } from 'src/seeds/panels.seed';
import { seedUsers } from 'src/seeds/user.seed';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass',
  database: 'marcante',
  entities: [User, Panel, Location],
});
AppDataSource.initialize()
  .then(async () => {
    await seedUsers(AppDataSource);
    await seedPanelsAndLocations(AppDataSource);
  })
  .then(() => AppDataSource.destroy())
  .catch((err) => {
    console.error('Erro ao rodar seed:', err);
    process.exit(1);
  });
