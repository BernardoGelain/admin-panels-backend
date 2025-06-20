import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';
import { Panel } from 'src/panels/entities/panel.entity';
import { Location } from 'src/locations/entities/location.entity';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass',
  database: 'marcante',
  entities: [User, Panel, Location],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
