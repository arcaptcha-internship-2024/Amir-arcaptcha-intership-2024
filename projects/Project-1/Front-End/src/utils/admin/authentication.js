const redirectAnonymousUserToLoginRoute = (router) => {
    if (!localStorage.getItem("token")) {
        router.push("/admin/login/");
    }
}

const isUserAuthenticated = () => {
    return localStorage.getItem("token") ? true : false;
}

export { redirectAnonymousUserToLoginRoute, isUserAuthenticated };