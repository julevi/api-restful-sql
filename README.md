# Descrição do Projeto

Este projeto consiste em uma API RESTful desenvolvida em Node.js e Express.js, integrada a um banco de dados PostgreSQL para gerenciamento de dados de usuários e transações financeiras. A API inclui autenticação segura de usuários, tratamento de erros robusto e funcionalidades essenciais para registro de usuários, login e gerenciamento de transações financeiras. Implementada para testes, destaca-se pela eficiência, segurança e conformidade com as melhores práticas de desenvolvimento.

## Tecnologias Utilizadas
- **Linguagem de Programação:** JavaScript
- **Banco de Dados:** PostgreSQL
- **Framework Web:** Node.js com Express.js
- **Autenticação:** JWT (JSON Web Tokens)
- **Práticas de Desenvolvimento:** RESTful API

## Funcionalidades Principais

1. **Cadastro de Usuário:**
   - **Endpoint:** POST /usuario
   - Permite o cadastro de novos usuários, validando nome, e-mail e senha. A senha é criptografada antes de ser armazenada no banco de dados.

2. **Login do Usuário:**
   - **Endpoint:** POST /login
   - Possibilita o login de usuários cadastrados, gerando um token de autenticação para sessões subsequentes.

3. **Detalhar Perfil do Usuário Logado:**
   - **Endpoint:** GET /usuario
   - Retorna as informações do perfil do usuário logado, identificado pelo token de autenticação.

4. **Atualizar Perfil do Usuário Logado:**
   - **Endpoint:** PUT /usuario
   - Permite a atualização do perfil do usuário logado, validando e persistindo as alterações no banco de dados.

5. **Listar Categorias:**
   - **Endpoint:** GET /categoria
   - Retorna a lista de categorias disponíveis para associação às transações.

6. **Listar Transações do Usuário Logado:**
   - **Endpoint:** GET /transacao
   - Retorna as transações associadas ao usuário logado, identificado pelo token de autenticação.

7. **Detalhar Transação do Usuário Logado:**
   - **Endpoint:** GET /transacao/:id
   - Retorna detalhes de uma transação específica do usuário logado, validando a propriedade de pertencimento.

8. **Cadastrar Transação para o Usuário Logado:**
   - **Endpoint:** POST /transacao
   - Permite o cadastro de novas transações associadas ao usuário logado, validando os campos obrigatórios e a existência da categoria.

9. **Atualizar Transação do Usuário Logado:**
   - **Endpoint:** PUT /transacao/:id
   - Permite a atualização de transações do usuário logado, validando os campos obrigatórios e a existência da categoria.

10. **Excluir Transação do Usuário Logado:**
    - **Endpoint:** DELETE /transacao/:id
    - Permite a exclusão de transações associadas ao usuário logado, validando a existência da transação.

11. **Obter Extrato de Transações:**
    - **Endpoint:** GET /transacao/extrato
    - Retorna um resumo do extrato financeiro do usuário logado, incluindo a soma de transações do tipo entrada e saída.

## Instruções para Execução do Projeto

1. Realize o fork do repositório.
2. Clone o repositório forkado em sua máquina local.
3. Instale as dependências.
4. Desenvolva o projeto, realizando commits a cada alteração.

## Observações Importantes

- O projeto segue padrões de organização de código, com arquivos específicos para rotas, controladores, conexão com o banco de dados, entre outros.
- Todas as respostas da API seguem os padrões RESTful e incluem códigos de status apropriados.
- A segurança é priorizada, garantindo que cada usuário só possa acessar e manipular seus próprios dados e transações.
- O banco de dados PostgreSQL é utilizado para persistência dos dados, seguindo uma estrutura predefinida com tabelas de usuários, categorias e transações.
- Os endpoints da API estão documentados acima, incluindo exemplos de requisições e respostas esperadas.
- Foram implementados status codes adequados para cada situação, promovendo uma experiência consistente e segura para o usuário.

## Nota Final

Este projeto é mais do que um desafio técnico; é uma oportunidade de aprimorar habilidades de desenvolvimento, práticas de segurança e compreensão de arquiteturas RESTful. A entrega bem-sucedida demonstra não apenas competência técnica, mas também a capacidade de criar soluções robustas e eficientes. Lembre-se: "Feito é melhor que perfeito!"