# Proffy :books:

> Uma aplicação que facilita o encontro entre alunos e professores particulares

<div align="center">
  <img src="./assets/proffy_app.gif" width="280px" style="margin: 0 auto;"/>
</div>
<br />
<img src="./assets/proffy_web.gif" width="100%"/>

## Frentes

- [API](#api-nodejs-satellite)
- [WEB](#web-reactjs-computer)
- [APP](#app-reactnative-iphone)

---

## O que é esse projeto?

Essa aplicação foi desenvolvida em uma NLW (Next Level Week) da [Rocketseat](https://rocketseat.com.br/), uma semana de imersão nas tecnologias JavaScript onde é desenvolvida uma aplicação de ponta a ponta (back-end, front-end e mobile). Ao final da semana foram passados desafios para incrementar a aplicação à uma versão 2.0. Esse projeto se trata da minha versão final da aplicação, tendo inclusive diferenças em relação ao que foi proposto. Me dediquei nesse projeto com o intuito de praticar meus conhecimentos na stack e acrescentar no meu portifólio.

## O que é esse app e o que ele faz?

Trata-se de uma plataforma para professores particulares se cadastrarem e alunos poderem entrar em contato. Quem tiver interesse em ensinar pode cadastrar sua "aula" informando uma breve descrição, as matérias que domina, o preço da sua hora/aula, o número de contato e quais horários tem disponíveis (dia da semana e hora). Quem tiver interesse em ter aulas pode filtrar os professores pela matéria, dia da semana e horário.

---

## Projeto em produção

- [WEB](https://webproffy.netlify.app/)
- [APP](https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40caioquirino/proffy-app-9024a124021a41b3908347974ffcd784-signed.apk) (.apk)

### Funcionalidades

- Cadastro de usuário
- Autenticação
- Recuperação de senha (envio de e-mail)
- Edição de dados do usuário, incluindo senha
- Upload de foto de perfil do usuário
- Cadastro e edição de aula
- Listagem com filtro de todas as aulas cadastradas na plataforma

---

## API (NodeJS) :satellite:

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

## WEB (ReactJS) :computer:

### Em produção

Realizei o deploy no [Netlify](https://www.netlify.com/), você pode acessar [nesse link](https://webproffy.netlify.app/)

### Principais bibliotecas utilizadas

- axios
- react-icons
- react-router-dom
- react-select
- react-spinners
- react-spring
- react-text-mask
- typescript
- yup

### Instalação, configuração e execução :wrench:

1. ```shell
   cd proffy-web
   ```

2. Instale as dependencias:

```shell
  yarn install
```

3. Configure as variáveis ambientes (recomendo criar um arquivo `.env`) de acordo com o arquivo `.env.example`

4. Execute o projeto:

```shell
  yarn start
```

## APP (ReactNative) :iphone:

### Em produção

Realizei o build do aplicativo no expo e você pode baixar o .apk [neste link](https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40caioquirino/proffy-app-9024a124021a41b3908347974ffcd784-signed.apk)

### Principais bibliotecas utilizadas

- @expo/react-native-action-sheet
- @react-native-community/async-storage
- @react-native-community/datetimepicker
- @react-navigation/bottom-tabs
- @react-navigation/native
- @react-navigation/stack
- axios
- date-fns
- expo-image-picker
- react-native-modal
- yup

### Instalação, configuração e execução :wrench:

1. ```shell
   cd proffy-app
   ```

2. Instale as dependencias:

```shell
  yarn install
```

3. [Configure o expo](https://docs.expo.io/get-started/installation/), caso ainda não o tenha

4. Altere o `baseURL` para a url onde o servidor está rodando (./src/services/api.ts)

5. Execute o projeto:

```shell
  yarn android
```

<br></br>

> Rocketseat ? [Me adicione](https://app.rocketseat.com.br/me/caio-medeiros-1562947679) na sua rede
> <br></br>
> Visite meu [portifólio](https://www.gitshowcase.com/caioquirinomedeiros)
> <br></br>
> Sinta-se a vontade para dar um fork nesse projeto (não esqueça de deixar uma estrela!)
