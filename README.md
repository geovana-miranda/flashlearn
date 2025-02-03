# Flashlearn

Este é um aplicativo de **Flashcards**, desenvolvido para ajudar no estudo e memorização de conteúdo. O usuário pode criar baralhos de flashcards, adicionar cards dentro desses baralhos, estudar o conteúdo e revisar os cards que errou. O app também exibe as estatísticas de desempenho do usuário.

## Funcionalidades

- **Criar Baralhos**: O usuário pode criar novos baralhos de flashcards, com título e descrição.
- **Adicionar Cards**: Cada baralho pode conter diversos cards, permitindo que o usuário insira perguntas e respostas.
- **Estudar Flashcards**: O usuário pode estudar os cards, passando pelas perguntas e revelando as respostas, marcando se sabia a respota ou não.
- **Revisão**: Após a sessão de estudo, os cards em que o usuário errou são revisados.
- **Estatísticas**: O app calcula a taxa de acertos do usuário, exibindo um histórico de desempenho com base na última sessão.

## Tecnologias Usadas

- **React**: Biblioteca para construir a interface de usuário.
- **React Router**: Para navegação entre páginas.
- **CSS Modules**: Para gerenciamento de estilos locais.
- **UUID**: Para geração de IDs únicos para os baralhos.
- **Context API**: Para gerenciamento de estado global dos baralhos.
- **React Icons**: Para ícones personalizáveis e de fácil uso na interface.
- **Local Storage**: Para armazenamento dos dados localmente no navegador.

## Como Rodar o Projeto

### Pré-requisitos

- **Node.js** e **npm** instalados. Caso não tenha, instale o [Node.js](https://nodejs.org/).

### Passos

1. Clone este repositório para sua máquina:

    ```bash
    git clone https://github.com/geovana-miranda/flashlearn.git
    ```

2. Acesse a pasta do projeto:

    ```bash
    cd flashlearn
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Inicie o projeto:

    ```bash
    npm start
    ```

    O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000).

## Funcionalidades Futuras

- Implementação de backend utilizando **JSON Server**, utilizando operações CRUD (Criar, Ler, Atualizar, Excluir) para gerenciamento de dados.
- Otimização da experiência do usuário, tornando a aplicação totalmente responsiva para dispositivos móveis e desktops.
