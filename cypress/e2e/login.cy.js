describe("Login Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("basarılı login oluyor", () => {
    cy.get('input[name="email"]').type("erdem.guntay@wit.com.tr");
    //passwordsec ve içine bunu yaz
    //checkbox işaretle
    //test:buton disabled olmamalı
    //girişe bas
    //ekranda basarılı metin var mı

    cy.get('input[name="password"]').type("9fxIH0GXesEwH_I");
    cy.get('input[type="checkbox"]').check();
    const submit = cy.get('[data-cy="login-submit"]');
    submit.should("not.be.disabled");
    submit.click();
  });
});
