import { getData, putData, deleteData, postData, logOutUser } from "./requester.js";
import { showUser, saveSession, emailIsValid } from "./additionalHelper.js";

let partials = {
    header: "./templates/common/header.hbs",
    footer: "./templates/common/footer.hbs"
};

export async function loadHomePage(ctx) {
    showUser(ctx);
    let authToken = localStorage.getItem("authtoken");

    if (ctx.isAuth) {
        let articlesRecords = await getData("data", "langArticles", authToken);
        let jsArticles = articlesRecords.filter(a => a.category === "JavaScript").sort((a, b) => a.title.localeCompare(b.title));
        let cSharpArticles = articlesRecords.filter(a => a.category === "C#").sort((a, b) => a.title.localeCompare(b.title));
        let javaArticles = articlesRecords.filter(a => a.category === "Java").sort((a, b) => a.title.localeCompare(b.title));
        let pytonArticles = articlesRecords.filter(a => a.category === "Python").sort((a, b) => a.title.localeCompare(b.title));

        ctx.jsArticles = jsArticles.length >= 1;
        ctx.jsAllArticles = jsArticles;

        ctx.cSharpArticles = cSharpArticles.length >= 1;
        ctx.cSharpAllArticles = cSharpArticles;

        ctx.javaArticles = javaArticles.length >= 1;
        ctx.javaAllArticles = javaArticles;

        ctx.pytonArticles = pytonArticles.length >= 1;
        ctx.pytonAllArticles = pytonArticles;
    }
    ctx.loadPartials(partials).partial("./templates/homePage.hbs");
}

export function loadRegisterPage(ctx) {
    ctx.loadPartials(partials).partial("./templates/registerPage.hbs");
}

export function registerProceed(ctx) {
    let { username, password } = ctx.params;
    let rePassword = ctx.params["rep-pass"];

    if (password === rePassword && emailIsValid(username) && username && password && rePassword) {
        postData("users", "register", { email: username, password })
            .then(userInfo => {
                alert("Your registration was completed! Please Log In!");
                ctx.redirect("#/home");
            })
            .catch(err => {
                alert(err);
            });
    } else {
        alert("Something went wrong! Please try again!");
    }
}

export function loadLoginPage(ctx) {
    ctx.loadPartials(partials).partial("./templates/loginPage.hbs");
}

export function loginProceed(ctx) {
    let { username, password } = ctx.params;

    postData("users", "login", { login: username, password })
        .then(userInfo => {
            saveSession(userInfo);
        })
        .then(function () {
            ctx.redirect("#/home");
        })
        .catch(err => {
            alert("Something went wrong! Please try again!");
        });
}

export function logoutProceed(ctx) {
    let authToken = localStorage.getItem("authtoken");

    logOutUser("users", "logout", authToken)
        .then(() => {
            localStorage.clear();
        })
        .then(function () {
            ctx.redirect("#/login");
        })
        .catch(err => alert(err));
}

export function loadCreatePage(ctx) {
    showUser(ctx);
    ctx.loadPartials(partials).partial("./templates/createPage.hbs");
}

export function createProceed(ctx) {
    showUser(ctx);
    let authToken = localStorage.getItem("authtoken")
    let { title, category, content } = ctx.params;

    if (title && category && content) {
        let obj = {
            title,
            category,
            content,
            creator: ctx.email
        };

        postData("data", "langArticles", obj, authToken)
            .then(() => {
                ctx.redirect("#/home");
            })
            .catch(err => alert(err));
    }

}

export function loadDetailsPage(ctx) {
    let id = ctx.params.id;
    let authToken = localStorage.getItem("authtoken");

    getData("data", `langArticles/${id}`, authToken)
        .then(currentArticle => {
            ctx.title = currentArticle.title;
            ctx.category = currentArticle.category;
            ctx.content = currentArticle.content;
            ctx.creator = currentArticle.creator;
            ctx._id = currentArticle.objectId;
            ctx.isAuthor = localStorage.getItem("userId") === currentArticle.ownerId;

            showUser(ctx);
            ctx.loadPartials(partials).partial("./templates/detailsPage.hbs");
        });
}

export function deleteArticle(ctx) {
    let id = ctx.params.id;
    let authToken = localStorage.getItem("authtoken");

    deleteData("data", `langArticles/${id}`, authToken)
        .then(() => ctx.redirect("#/home"))
        .catch(err => alert(err));

}

export async function editEvent(ctx) {
    showUser(ctx);
    let authToken = localStorage.getItem("authtoken");

    let currentArticle = await getData("data", `langArticles/${ctx.params.id}`, authToken);
    ctx.title = currentArticle.title;
    ctx.category = currentArticle.category;
    ctx.content = currentArticle.content;
    ctx.creator = currentArticle.creator;
    ctx._id = currentArticle.objectId;
    ctx.isAuthor = localStorage.getItem("userId") === currentArticle.ownerId;

    await ctx.loadPartials(partials).partial("./templates/editPage.hbs");
}

export function editEventProceed(ctx) {
    showUser(ctx);
    let authToken = localStorage.getItem("authtoken");
    let id = ctx.params.id;
    let { title, category, content } = ctx.params;

    getData("data", `langArticles/${id}`, authToken).then(allInfo => {
        if (title && category && content) {
            allInfo.title = title;
            allInfo.category = category;
            allInfo.content = content;

            return allInfo;
        } else {
            alert("Something is wrong! Please try again!")
        }
    })
        .then(allInfo => {
            putData("data", `langArticles/${id}`, allInfo, authToken)
                .then(() => {
                    ctx.redirect("#/home");
                })
                .catch(err => alert(err));
        })
        .catch(err => alert(err));
}



