## Proffy APP :iphone

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

### Instalação, configuração e execução :wrench

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
<br></br>

> Rocketseat ? [Me adicione](https://app.rocketseat.com.br/me/caio-medeiros-1562947679) na sua rede
> <br></br>
> Visite meu [portifólio](https://www.gitshowcase.com/caioquirinomedeiros)
> <br></br>
> Sinta-se a vontade para dar um fork nesse projeto (não esqueça de deixar uma estrela!)
