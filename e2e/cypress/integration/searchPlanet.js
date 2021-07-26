it('searching planets', () => {
  cy.visit('/');

  cy.get('#searchField').type('Tatoo', {force: true});

  const childs = cy.get('.rc-virtual-list-holder-inner').children();

  childs
    .its('length') // calls 'length' property returning that value
    .should('to.eql', 1);
});
