/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });
  it("preenche os campos obrigatórios e envia o formulário", () => {
    const longText =
      "Teste com Cypress Teste com Cypress Teste com Cypress Teste com Cypress Teste com Cypress Teste com Cypress Teste com Cypress Teste com Cypress Teste com Cypress Teste com Cypress Teste com Cypress Teste com Cypress Teste com Cypress Teste com Cypress";
    cy.get("#firstName")
      .should("be.visible")
      .type("Yuri")
      .should("have.value", "Yuri");
    cy.get("#lastName")
      .should("be.visible")
      .type("Rissi")
      .should("have.value", "Rissi");
    cy.get("#email")
      .should("be.visible")
      .type("yuri@example.com")
      .should("have.value", "yuri@example.com");
    cy.get("#open-text-area")
      .should("be.visible")
      .type(longText, { delay: 0 })
      .should("have.value", longText);
    cy.get("form").find("button", "Enviar").click();

    cy.get('span[class="success"]').should("be.visible");
  });
  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Yuri");
    cy.get("#lastName").type("Rissi");
    cy.get("#email").type("yuriexamplecom");
    cy.get("#open-text-area").type("Teste");
    cy.get("form").find("button", "Enviar").click();

    cy.get('span[class="error"]').should("be.visible");
  });
  it("campo de telefone continua vazio quando preenchido com valor não-númerico", () => {
    cy.get("#firstName").type("Yuri");
    cy.get("#lastName").type("Rissi");
    cy.get("#email").type("yuri@example.com");
    cy.get("#open-text-area").type("Teste");
    cy.get("#phone-checkbox").click();

    cy.get("#phone").type("teste").should("to.be.empty");
  });
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Yuri");
    cy.get("#lastName").type("Rissi");
    cy.get("#email").type("yuri@example.com");
    cy.get("#open-text-area").type("Teste");
    cy.get("#phone-checkbox").check();
    cy.get("form").find("button", "Enviar").click();

    cy.get('span[class="error"]').should("be.visible");
  });
  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Yuri")
      .should("have.value", "Yuri")
      .clear()
      .should("to.be.empty");
    cy.get("#lastName")
      .type("Rissi")
      .should("have.value", "Rissi")
      .clear()
      .should("to.be.empty");
    cy.get("#email")
      .type("yuri@example.com")
      .should("have.value", "yuri@example.com")
      .clear()
      .should("to.be.empty");
    cy.get("#phone")
      .type("99554040")
      .should("have.value", "99554040")
      .clear()
      .should("to.be.empty");
  });
  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.get("form").find("button", "Enviar").click();
    cy.get('span[class="error"]').should("be.visible");
  });
  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();
  });
  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });
  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });
  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });
  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(($radio) => {
        cy.wrap($radio).check().should("be.checked");
      });
  });
  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });
});
