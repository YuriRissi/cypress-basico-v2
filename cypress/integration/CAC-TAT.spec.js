/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });
  it.only("preenche os campos obrigatórios e envia o formulário", () => {
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
      .type("Teste com Cypress")
      .should("have.value", "Teste com Cypress");
    cy.get("form").find('button[type="submit"]').click();
    cy.get('span[class="success"]').should("be.visible");
  });
});
