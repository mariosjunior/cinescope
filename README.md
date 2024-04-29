![CineScope](https://github.com/mariosjunior/cinescope/blob/master/cinescope.png?raw=true)

# CineScope

O CineScope é um aplicativo web que permite aos usuários explorar e descobrir filmes populares. Com o CineScope, você pode:

- Ver uma lista dos filmes mais bem avaliados
- Ver detalhes de um filme específico, incluindo sinopse, elenco e avaliação
- Adicionar filmes à sua lista de favoritos

## Funcionalidades

- Listagem dos filmes mais bem avaliados
- Página de detalhes do filme
- Adição de filmes aos favoritos
- Listagem dos filmes favoritos
- Layout responsivo para dispositivos móveis
- Infinite Loading

## Tecnologias utilizadas

- Vue.js 3
- Vue Router
- Vuex
- TypeScript
- Axios
- API do The Movie Database (TMDb)
- Jest
- Vue Test Utils

## Como executar o projeto localmente

### Pré-requisitos

- Node.js (versão 12 ou superior)
- NPM (geralmente vem com a instalação do Node.js)

### Passos

1. Clone este repositório para o seu computador:

```sh
     git clone https://github.com/mariosjunior/cinescope.git
```

2. Navegue até o diretório do projeto:

```sh
    cd cinescope
```

3. Instale as dependências do projeto:

```sh
    npm install
```

4. Pegue sua chave API do TMDb:

   
   https://developer.themoviedb.org/docs
   

5. Crie um arquivo `.env` na raiz do projeto e adicione a sua chave de API do TMDb:

```sh
    VITE_API_KEY=sua_chave_de_api_aqui
```

Substitua `sua_chave_de_api_aqui` pela sua chave de API válida do TMDb. 

6. Inicie o servidor de desenvolvimento:

```sh
 npm run dev
```

Para rodar os testes use:

```sh
 npm run test
```

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
