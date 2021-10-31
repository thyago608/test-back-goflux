## Banco de Dados
 Foi instalado o drive o sqlite3, mas o tipo do banco é sqlite.



## ormconfig.json

É necessário passar algumas configurações para o typeORM, como o tipo do banco de dados, o local de armazenamento das informações, o local onde será criado as migrations, local que o mesmo irá executar as migrations.




## Criação de um migration

No package.json foi adicionado o comando "typeorm":"ts-node-dev node_modules/typeorm/cli.js"

E no ormconfig.json foi adicionado a seguinte config:

    "migrations":["./src/database/migrations/**.ts"],
    "cli":{
        "migrationsDir":"./src/database/migrations"
    }

É especificado o diretório com as migrations que serão executadas.

É especificado o diretório de onde serão criadas as migrations.



Para criar um migration é necessário utilizar o comando:

yarn typeorm migration:create -n NomeMigration




## Executando e removendo migrations

yarn typeorm migration:run  (Irá executar todas as migrations )

yarn typeorm migration:revert ( Desfazer a última migration executada )




## Controllers

São responsáveis em lidar com as chamadas http que chegam em um rota específica da aplicação.

