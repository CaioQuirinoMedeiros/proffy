# Proffy API :satellite:

### Em produção

Realizei o deploy da aplicação no [Heroku](https://www.heroku.com/), você pode acessar através [dessa url](https://proffy-caio.herokuapp.com)

### Documentação

Fiz a documentação no [Insomnia](https://insomnia.rest/) e usei o [insomnia-documenter](https://github.com/jozsefsallai/insomnia-documenter) para gerar a documentação. Ela pode ser acessada [aqui](https://proffy-caio.herokuapp.com/docs)

### Principais bibliotecas utilizadas

- express
- aws-sdk
- bcryptjs
- celebrate
- date-fns
- jsonwebtoken
- multer
- nodemailer
- pg
- typeorm

### Instalação, configuração e execução :wrench:

1. ```shell
   cd proffy-api
   ```

2. Instale as dependencias:

```shell
  yarn install
```

3. Crie o arquivo com as credenciais da aws de acordo com o arquivo exemplo `awsconfig.example.json`. Ou [veja aqui](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html) outras formas de configurar as credenciais da aws, se preferir

4. Configure as variáveis ambientes (recomendo criar um arquivo `.env`) de acordo com o arquivo `.env.example`

5. Certifique-se de criar o banco no PostgreSQL de acordo com a configuração das variáveis ambiente. Ou [veja aqui](https://typeorm.io/#/using-ormconfig) como configurar o TypeORM de outras formas, se preferir

6. Rode as migrations para criar as tabelas no banco de dados:

```shell
  yarn typeorm migration:run
```

7. Enfim, execute o server:

```shell
  yarn dev:server
```

> Rocketseat ? [Me adicione](https://app.rocketseat.com.br/me/caio-medeiros-1562947679) na sua rede
> <br></br>
> Visite meu [portifólio](https://www.gitshowcase.com/caioquirinomedeiros)
> <br></br>
> Sinta-se a vontade para dar um fork nesse projeto (não esqueça de deixar uma estrela!)
