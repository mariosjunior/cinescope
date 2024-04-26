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

## Tecnologias utilizadas

- Vue.js 3
- Vue Router
- Vuex
- TypeScript
- Axios
- API do The Movie Database (TMDb)

## Como executar o projeto localmente

### Pré-requisitos

- Node.js (versão 12 ou superior)
- NPM (geralmente vem com a instalação do Node.js)

### Passos

1. Clone este repositório para o seu computador:
   git clone https://github.com/seu-usuario/cinescope.git
2. Navegue até o diretório do projeto:
   cd cinescope
3. Instale as dependências do projeto:
   npm install
4. Crie um arquivo `.env` na raiz do projeto e adicione a sua chave de API do TMDb:
   VUE_APP_API_KEY=sua_chave_de_api_aqui
   Substitua `sua_chave_de_api_aqui` pela sua chave de API válida do TMDb.
5. Inicie o servidor de desenvolvimento:
   npm run serve

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
