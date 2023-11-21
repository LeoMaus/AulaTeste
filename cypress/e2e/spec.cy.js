describe('Acesso ao sistema de teste', () => {
  it('Validar a tela de login', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').should('exist')
  });
  it('Preencher o formulário de login', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').should('be.visible').type('standard_user');
    cy.get('#password').should('be.visible').type('secret_sauce');
    cy.get('#login-button').should('be.visible').click();
    cy.get('.app_logo').should('contain', 'Swag Labs');
    it('Deve pesquisar por um produto e exibir resultados corretos', () => {
      cy.get('.product_sort_container').select('Price (high to low)');
      cy.get('.inventory_item_price').first().should('contain', '$49.99');
    });
    it('Adicionar o produto ao carrinho', () => {
      cy.get('.inventory_item_name').should('contain', 'Sauce Labs Fleece Jacket').click();
      cy.get('.btn_primary.btn_inventory').click();
    });
    it('Validação carrinho de compras', () => {
      cy.get('.shopping_cart_link').click();
      cy.get('.cart_item').should('have.length', 1);
      cy.get('.cart_item').should('contain', 'Sauce Labs Fleece Jacket');
      cy.get('.btn_action.checkout_button').click();
    });
    it('Forma de pagamento', () => {
      cy.get('#first-name').type('Tentativa');
      cy.get('#last-name').type('Maus');
      cy.get('#postal-code').type('99999-999');
      cy.get('.btn_primary.cart_button').click();
      cy.get('#finish').click();
    });
    it('Validação carrinho vazio', () => {
      cy.get('.complete-header').should('contain', 'Thank you for your order!');
      cy.get('.shopping_cart_link').click();
      cy.get('.cart_item').should('have.length', 0);
    });
  });  
});

  

