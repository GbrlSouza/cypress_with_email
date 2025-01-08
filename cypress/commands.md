No Cypress, há diversos comandos que você pode usar para interagir com sua aplicação e realizar testes. Aqui está uma lista organizada por categorias com os comandos mais comuns:

---

### **1. Comandos para Interagir com Elementos na Página**
- **`cy.get(selector)`**: Seleciona elementos com base em um seletor.
- **`cy.contains(text)`**: Seleciona um elemento que contém um texto específico.
- **`cy.click()`**: Clica em um elemento.
- **`cy.type(text)`**: Digita texto em um campo de entrada.
- **`cy.select(value)`**: Seleciona uma opção em um dropdown.
- **`cy.check()` / `cy.uncheck()`**: Marca ou desmarca uma checkbox.
- **`cy.clear()`**: Limpa o valor de um campo de entrada.
- **`cy.trigger(event)`**: Dispara eventos personalizados.

---

### **2. Comandos de Validação e Assertivas**
- **`cy.should(condition)`**: Faz uma assertiva em um elemento.
- **`cy.expect(expression)`**: Usa a API de assertions do Chai para verificações.
- **`cy.and(condition)`**: Encadeia mais assertivas.
- **Exemplo**:
  ```javascript
  cy.get('button').should('be.visible').and('have.text', 'Enviar');
  ```

---

### **3. Comandos para Manipular Cookies, LocalStorage e Sessões**
- **`cy.setCookie(name, value)`**: Define um cookie.
- **`cy.getCookie(name)`**: Recupera um cookie específico.
- **`cy.clearCookies()`**: Limpa todos os cookies.
- **`cy.setLocalStorage(key, value)`**: Define um valor no localStorage.
- **`cy.getLocalStorage(key)`**: Obtém um valor do localStorage.
- **`cy.session(name, setupFunction)`**: Gerencia sessões de usuário para reutilizar estados.

---

### **4. Comandos para Requisições HTTP**
- **`cy.request(options)`**: Faz uma requisição HTTP.
- **`cy.intercept(url, response)`**: Intercepta e manipula requisições e respostas HTTP.

---

### **5. Comandos de Controle de Tempo**
- **`cy.wait(time)`**: Aguarda um tempo específico (em milissegundos).
- **`cy.clock()`**: Congela o relógio do navegador.
- **`cy.tick(milliseconds)`**: Avança o relógio virtual em um período específico.

---

### **6. Comandos para Trabalhar com Arquivos**
- **`cy.readFile(filePath)`**: Lê o conteúdo de um arquivo.
- **`cy.writeFile(filePath, data)`**: Escreve dados em um arquivo.

---

### **7. Comandos para Fixtures**
- **`cy.fixture(fileName)`**: Carrega um arquivo de fixture para ser usado nos testes.

---

### **8. Comandos para Navegação**
- **`cy.visit(url)`**: Navega para uma URL.
- **`cy.go(direction)`**: Navega no histórico (`back` ou `forward`).
- **`cy.reload()`**: Recarrega a página atual.

---

### **9. Comandos para Depuração**
- **`cy.log(message)`**: Registra uma mensagem no log do Cypress.
- **`cy.debug()`**: Adiciona um ponto de depuração no teste.

---

### **10. Comandos Customizados**
Você pode criar seus próprios comandos usando `Cypress.Commands.add`:
```javascript
Cypress.Commands.add('login', (username, password) => {
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('button[type="submit"]').click();
});
```

---

### **11. Outros Comandos Úteis**
- **`cy.wrap(object)`**: Envolve um objeto para usar comandos Cypress nele.
- **`cy.viewport(width, height)`**: Define o tamanho da janela do navegador.
- **`cy.screenshot(name)`**: Tira um screenshot da página.
- **`cy.task(taskName, arguments)`**: Executa tarefas personalizadas definidas no `plugins/index.js`.

---

Esses comandos cobrem grande parte das funcionalidades que você pode precisar. Caso tenha uma necessidade específica, me avise para que eu possa sugerir algo mais direcionado! 😊
