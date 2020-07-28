import * as controller from "./controller.js";



const app = Sammy("#root", function () {
    this.use("Handlebars", "hbs");

    this.get("#/home", controller.loadHomePage.bind(this));

    this.get("#/", controller.loadHomePage.bind(this));

    this.get("#/register", controller.loadRegisterPage.bind(this));

    this.post("#/register", controller.registerProceed.bind(this));

    this.get("#/login", controller.loadLoginPage.bind(this));

    this.post("#/login", controller.loginProceed.bind(this));

    this.get("#/logout", controller.logoutProceed.bind(this));

    this.get("#/create", controller.loadCreatePage.bind(this));

    this.post("#/create", controller.createProceed.bind(this));

    this.get("#/details/:id", controller.loadDetailsPage.bind(this));

    this.get("#/edit/:id", controller.editEvent.bind(this));

    this.post("#/edit/:id", controller.editEventProceed.bind(this));

    this.get("#/delete/:id", controller.deleteArticle.bind(this));

});


app.run("#/home");

