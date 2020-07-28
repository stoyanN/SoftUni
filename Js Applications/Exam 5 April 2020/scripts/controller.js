import { getData, putData, deleteData, postData } from "./requester.js";
import { showUser, saveSession, emailIsValid } from "./additionalHelper.js";

let partials = {
    header: "./templates/common/header.hbs",
    footer: "./templates/common/footer.hbs"
};

export async function loadHomePage(ctx) {
    showUser(ctx);
    if (ctx.isAuth) {
        let articlesRecords = await getData("Kinvey", "appdata", "articles");
        let jsArticles = articlesRecords.filter(a => a.category === "JavaScript").sort((a, b) => a.title.localeCompare(b.title));
        let cSharpArticles = articlesRecords.filter(a => a.category === "C#").sort((a, b) => a.title.localeCompare(b.title));
        let javaArticles = articlesRecords.filter(a => a.category === "Java").sort((a, b) => a.title.localeCompare(b.title));
        let pytonArticles = articlesRecords.filter(a => a.category === "Pyton").sort((a, b) => a.title.localeCompare(b.title));

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
        postData("Basic", "user", "", { username, password })
            .then(userInfo => {
                saveSession(userInfo);
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

    postData("Basic", "user", "login", { username, password })
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
    postData("Kinvey", "user", "_logout")
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
    let { title, category, content } = ctx.params;
    // console.log(ctx.params);

    if (title && category && content) {
        let obj = {
            title,
            category,
            content,
            creator: ctx.email
        };

        postData("Kinvey", "appdata", "articles", obj)
            .then(() => {
                ctx.redirect("#/home");
            })
            .catch(err => alert(err));
    }

}

export function loadDetailsPage(ctx) {
    let id = ctx.params.id;

    getData("Kinvey", "appdata", `articles/${id}`)
        .then(currentArticle => {
            ctx.title = currentArticle.title;
            ctx.category = currentArticle.category;
            ctx.content = currentArticle.content;
            ctx.creator = currentArticle.creator;
            ctx._id = currentArticle._id;
            ctx.isAuthor = localStorage.getItem("userId") === currentArticle._acl.creator;

            showUser(ctx);
            ctx.loadPartials(partials).partial("./templates/detailsPage.hbs");
        });
}

export function deleteArticle(ctx) {
    let id = ctx.params.id;

    deleteData("Kinvey", "appdata", `articles/${id}`)
        .then(() => ctx.redirect("#/home"))
        .catch(err => alert(err));

}

export async function editEvent(ctx) {
    showUser(ctx);
    // console.log(ctx.params.id);

    let currentArticle = await getData("Kinvey", "appdata", `articles/${ctx.params.id}`);
    ctx.title = currentArticle.title;
    ctx.category = currentArticle.category;
    ctx.content = currentArticle.content;
    ctx.creator = currentArticle.creator;
    ctx._id = currentArticle._id;
    ctx.isAuthor = localStorage.getItem("userId") === currentArticle._acl.creator;

    await ctx.loadPartials(partials).partial("./templates/editPage.hbs");
}

export function editEventProceed(ctx) {
    showUser(ctx);
    let id = ctx.params.id;
    let { title, category, content } = ctx.params;

    getData("Kinvey", "appdata", `articles/${id}`).then(allInfo => {
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
            putData("Kinvey", "appdata", `articles/${id}`, allInfo)
                .then(() => {
                    ctx.redirect("#/home");
                })
                .catch(err => alert(err));
        })
        .catch(err => alert(err));





}



