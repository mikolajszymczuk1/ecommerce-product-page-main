describe("navigation", () => {
    it("Should open main app page", () => {
        cy.visit("/");
    });

    it("the menu should show up after clicking the menu icon and closing after pressing the close icon", () => {
        cy.viewport(375, 900);

        cy.get("[data-cy=menu-icon]")
            .click();

        cy.get("[data-cy=navigation-links-wrapper]")
            .should("be.visible");

        cy.get("[data-cy=close-icon]")
            .click();

        cy.get("[data-cy=navigation-links-wrapper]")
            .should("be.not.visible");
    });
});
