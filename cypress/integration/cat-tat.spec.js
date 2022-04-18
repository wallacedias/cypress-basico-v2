/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    this.beforeEach(() => {

        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {

        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName').should('be.visible').type('Mark')
        cy.get('#lastName').should('be.visible').type('Steven')
        cy.get('#email').should('be.visible').type('mark.steven@marvel.com')
        cy.get('#open-text-area').should('be.visible').type('Help me, please!', { delay: 0 })
        cy.contains('.button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').should('be.visible').type('Mark')
        cy.get('#lastName').should('be.visible').type('Steven')
        cy.get('#email').should('be.visible').type('mark.steven#marvel.com')
        cy.get('#open-text-area').should('be.visible').type('Help me, please!', { delay: 0 })
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('valida campo telefone permanece vazio digitando valor diferente de numerico', function () {
        cy.get('#phone').type('call').should('not.have.value')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').should('be.visible').type('Mark')
        cy.get('#lastName').should('be.visible').type('Steven')
        cy.get('#email').should('be.visible').type('mark.steven#marvel.com')
        cy.get('#open-text-area').should('be.visible').type('Help me, please!', { delay: 0 })
        cy.get('#phone-checkbox').click()
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').should('be.visible').type('Mark').should('have.value', 'Mark').clear().should('not.have.value')
        cy.get('#lastName').should('be.visible').type('Steven').should('have.value', 'Steven').clear().should('not.have.value')
        cy.get('#email').should('be.visible').type('mark.steven@marvel.com').should('have.value','mark.steven@marvel.com').clear().should('not.have.value')
        cy.get('#phone').should('be.visible').type('16999991234').should('have.value','16999991234').clear().should('not.have.value')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
    })

})