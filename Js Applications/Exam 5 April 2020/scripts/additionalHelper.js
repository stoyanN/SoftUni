export function showUser(ctx) {
    ctx.isAuth = localStorage.getItem("authtoken") !== null;
    ctx.email = localStorage.getItem("email");
    ctx.id = localStorage.getItem("userId");
}

export function saveSession(userInfo) {
    localStorage.setItem("userId", userInfo._id);
    localStorage.setItem("authtoken", userInfo._kmd.authtoken);
    localStorage.setItem("email", userInfo.username);
}

export function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function successMsg(textContent) {
    let successBox = document.querySelector("#successBox");
    successBox.style.display = "block";
    successBox.textContent = textContent;
    setTimeout(() => {
        successBox.style.display = "none";
    }, 2000);
}

export function errorMsg(textContent) {
    let errorBox = document.querySelector("#errorBox");
    errorBox.style.display = "block";
    errorBox.textContent = textContent;

    setTimeout(() => {
        errorBox.style.display = "none";
    }, 2000);
}