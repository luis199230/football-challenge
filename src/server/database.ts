import * as path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [path.join(__dirname, '../sql/entities/*.{ts,js}')],
    synchronize: true,
    logging: false,
})

export const boostrapDatabase = async () => {
    try{
        await AppDataSource.initialize();
        console.log(`⛁ Database connected with success`);
    }catch(error: unknown){
        console.log(error);
    }
}

export default AppDataSource;
