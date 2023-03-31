import { DataSource } from 'typeorm'
import { CreateAppointment1680233020447 } from './migrations/1680233020447-CreateAppointment'

export const connectDB = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'gostack_gobarber',
  migrations: [CreateAppointment1680233020447],
})
