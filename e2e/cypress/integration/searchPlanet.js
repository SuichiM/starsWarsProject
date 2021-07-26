it('searching planets', () => {
  cy.visit('/');

  cy.get('#searchField').type('Tatoo', {force: true});

  const suggestionOptions = cy.get('.rc-virtual-list-holder-inner').children();

  suggestionOptions
    .its('length') // calls 'length' property returning that value
    .should('to.eql', 1);
});

it('add item to list on click', () => {
  cy.get('.rc-virtual-list-holder-inner')
    .find('div.ant-select-item.ant-select-item-option')
    .first()
    .as('firstItem');

  cy.get('@firstItem').click();

  const listItems = cy.get('ul.ant-list-items').children();

  listItems
    .its('length') // calls 'length' property returning that value
    .should('to.eql', 1);
});

it('removing item from the list', () => {
  // get the remove button
  cy.get('ul.ant-list-items').first('li.ant-list-item').find('button').click();

  //click on confirm remove
  cy.get('.ant-popover-buttons').find('button.ant-btn-primary').click();

  cy.get('.ant-list-empty-text');
});
