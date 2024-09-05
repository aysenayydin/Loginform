// import { slowCypressDown } from "cypress-slow-down";
// // slow down each command by the default amount
// // which is 1 second
// slowCypressDown(250);

describe("Login Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("basarılı login oluyor", () => {
    cy.get('input[name="email"]').type("erdem.guntay@wit.com.tr");

    //passwordsec ve içine bunu yaz
    cy.get('input[name="password"]').type("9fxIH0GXesEwH_I");

    //checkbox işaretle
    cy.get('input[type="checkbox"]').check();

    //test:buton disabled olmamalı
    const submit = cy.get('[data-cy="login-submit"]');
    submit.should("not.be.disabled");

    //girişe bas
    submit.click();
    //ekranda basarılı metin var mı
    // Başarı sayfasının açıldığını kontrol et
    cy.url().should("include", "/success");
    cy.contains("Başarıyla giriş yapıldı!").should("be.visible");
  });

  it("hatalı eposta girişi yapınca buton disabled olmalı", () => {
    cy.get('input[name="password"]').type("1234");
    cy.get('input[name="terms"]').click();
    cy.get('input[name="email"]').type("asd@adfacom");
    const submit = cy.get('[data-cy="login-submit"]');
    submit.should("be.disabled");
    cy.contains("Please enter a valid email address").should("be.visible");
    cy.get('[data-cy="email-error-text"]').should("have.length", 1);
  });
  it("hatalı kısa şifre girişi yapınca buton disabled olmalı", () => {
    cy.get('input[name="terms"]').click();
    cy.get('input[name="email"]').type("asd@adfa.com");
    cy.get('input[name="password"]').type("123");
    const submit = cy.get('[data-cy="login-submit"]');
    submit.should("be.disabled");
  });

  it("email ve sifre yanlıs hatası goster", () => {
    // Ekranda iki tane hata mesajının olduğunu kontrol et
    cy.get('input[name="email"]').type("yanlis.email");
    cy.get('[data-cy="email-error-text"]').should("have.length", 1); // Email hatası
    cy.get('input[name="password"]').type("yre");
    cy.get('[data-cy="password-error-text"]').should("have.length", 1); // Şifre hatası
  });

  it("email ve password yanlış girildiğinde alert içindeki hata mesajını kontrol eder", () => {
    cy.get('input[name="email"]').type("yanlis.email@wit.com");
    cy.get('input[name="password"]').type("yanlisSifre");
    cy.get('input[name="terms"]').click();
    const submit = cy.get('[data-cy="login-submit"]');
    submit.click();
    // Alert'leri kontrol etmek için bir stub oluştur
    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub");
    });

    // Hata mesajı bekleniyor
    cy.get("@alertStub").should(
      "be.calledOnceWith",
      "Invalid email or password"
    );
  });

  it("email ve password doğru ama kuralları kabul etmeden giriş yapmaya çalışırken buton disabled olmalı", () => {
    cy.get('input[name="email"]').type("erdem.guntay@wit.com.tr");
    cy.get('input[name="password"]').type("9fxIH0GXesEwH_I");
    // Checkbox'ı işaretlemedik
    const submit = cy.get('[data-cy="login-submit"]');
    submit.should("be.disabled");
  });
});
