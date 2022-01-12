describe("image slider", () => {
    it("Should open main app page", () => {
        cy.visit("/");
    });

    it("After click thumbnail, active thumbnail should has active class", () => {
        cy.viewport(1440, 900);

        cy.get("[data-cy=image-slider-thumbnail]").each((el) => {
            cy
                .wrap(el)
                .click()
                .should("have.class", "image-slider__thumbnail--active");
        });
    });

    it("When click big image, should open lightbox", () => {
        cy.viewport(1440, 900);

        cy.get("[data-cy=lightbox]")
            .should("be.not.visible");

        cy.get("[data-cy=main-slider-image]")
            .click();

        cy.get("[data-cy=lightbox]")
            .should("be.visible");
    });

    it("Lightbox functionality", () => {
        cy.viewport(1440, 900);

        cy.get("[data-cy=lightbox-thumbnail]").each((el) => {
            cy
                .wrap(el)
                .click()
                .should("have.class", "lightbox__thumbnail--active");
        });
        
        cy.get("[data-cy=lightbox-thumbnail]").each((el) => {
            cy.get("[data-cy=lightbox-arrow-right]")
                .click();
            
            cy
                .wrap(el)
                .should("have.class", "lightbox__thumbnail--active");
        });

        for (let i = 3; i >= 0; i--) {
            cy.get("[data-cy=lightbox-thumbnail]")
                .eq(i)
                .should("have.class", "lightbox__thumbnail--active");
        
            cy.get("[data-cy=lightbox-arrow-left]")
                .click();
        }

        cy.get("[data-cy=lightbox-close-icon]")
            .click();
    
        cy.get("[data-cy=lightbox]")
            .should("be.not.visible");
    });
});
