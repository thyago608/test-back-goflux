import { createConnection, Connection, getConnectionOptions } from 'typeorm';

export default async():Promise<Connection> => {
    //Pegando as configurações do ormConfig
    const defaultOptions = await getConnectionOptions();

    //Sobreescrevendo o caminho do banco de dados que foi passado no ormconfig
    return createConnection(
        Object.assign(defaultOptions,{
            database: process.env.NODE_ENV === 'test'? "./src/database/database.test.sqlite": defaultOptions.database
        })
    );
}