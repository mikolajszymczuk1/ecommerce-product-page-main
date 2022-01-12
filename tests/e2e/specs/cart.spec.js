describe("cart", () => {
    it("Should open main app page", () => {
        cy.visit("/");
    });

    it("Click on cart icon should show or hide cart", () => {
        cy.viewport(1440, 900);
        
        cy.get("[data-cy=cart]")
            .should("be.not.visible");
        
        cy.get("[data-cy=cart-icon-wrapper]")
            .click();

        cy.get("[data-cy=cart]")
            .should("be.visible");
    });

    it("When user add items to cart, cart should contain items", () => {
        cy.viewport(1440, 900);

        cy.get("[data-cy=cart-content]")
            .find("[data-cy=empty-message]")
            .contains("Your cart is empty");
        
        for (let i = 0; i < 5; i++) {
            cy.get("[data-cy=increment-icon]")
                .click();
        }

        cy.get("[data-cy=counter-value]")
            .contains(5);

        cy.get("[data-cy=add-to-cart-button]")
            .click();

        cy.get("[data-cy=items-counter]")
            .contains(5);

        cy.get("[data-cy=cart-content]")
            .should("be.not.empty");

        cy.get("[data-cy=cart-item]")
            .should("be.exist");
    });

    it("When click item's delete icon, should decrement quantity if item", () => {
        cy.viewport(1440, 900);

        cy.get("[data-cy=item-delete-icon]")
            .click();

        cy.get("[data-cy=items-counter]")
            .contains(4);

        for (let i = 0; i < 4; i++) {
            cy.get("[data-cy=item-delete-icon]")
                .click();
        }
        
        cy.get("[data-cy=items-counter]")
            .should("be.not.visible");

        cy.get("[data-cy=cart-icon-wrapper]")
            .click();
    });
});
