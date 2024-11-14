# Cypress With Email

Este projeto utiliza o Cypress para realizar testes automatizados e enviar automaticamente os relatórios gerados para um endereço de e-mail após a execução dos testes. O envio é feito através do `nodemailer` e a configuração é feita de forma simples, utilizando o evento `after:run` do Cypress.

## Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/) - Framework de testes end-to-end.
- [Nodemailer](https://nodemailer.com/) - Biblioteca para envio de e-mails.
- [Node.js](https://nodejs.org/) - Ambiente de execução para JavaScript.

## Pré-requisitos

Antes de começar, você precisa ter o Node.js instalado em sua máquina. Caso não tenha, você pode baixar e instalar a versão mais recente do Node.js [aqui](https://nodejs.org/).

Além disso, você vai precisar de um serviço de e-mail para enviar os relatórios (por exemplo, Gmail).

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/GbrlSouza/cypress_with_email.git
   cd cypress_with_email
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

3. Configure o seu serviço de e-mail no arquivo `cypress.config.js`:
   - Altere as informações de autenticação do `nodemailer` para o seu serviço de e-mail (usuário e senha ou token de autenticação).
   
   ```javascript
   const transporter = nodemailer.createTransport({
     service: 'gmail',  // Ou outro serviço de e-mail de sua escolha
     auth: {
       user: 'seu-email@gmail.com',  // Seu e-mail
       pass: 'sua-senha',  // Sua senha ou token de autenticação
     },
   });
   ```

## Como Usar

1. Execute os testes do Cypress:

   ```bash
   npx cypress run
   ```

   O Cypress irá rodar os testes e, ao final, o relatório será enviado automaticamente para o e-mail configurado.

2. O e-mail será enviado com o relatório gerado, no formato `.html`, como anexo.

## Estrutura do Projeto

```
cypress_with_email/
├── cypress/                # Contém os testes automatizados do Cypress
│   ├── integration/        # Arquivos de testes
│   └── reports/            # Relatórios gerados pelo Cypress
├── node_modules/           # Dependências do Node.js
├── cypress.config.js       # Arquivo de configuração do Cypress
├── package.json            # Arquivo de configuração do projeto
└── README.md               # Este arquivo
```

## Personalização

- Você pode modificar o caminho do relatório HTML no `cypress.config.js` se precisar de um diretório diferente.
- No arquivo de configuração do e-mail (`nodemailer`), é possível alterar o servidor de e-mail, a autenticação e o conteúdo da mensagem para personalizar a forma como os relatórios serão enviados.

## Contribuição

1. Faça o fork deste repositório.
2. Crie uma nova branch (`git checkout -b minha-nova-feature`).
3. Faça as alterações desejadas e commit (`git commit -am 'Adicionando minha nova feature'`).
4. Envie para o repositório (`git push origin minha-nova-feature`).
5. Crie uma pull request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
