const redirectAnonymousUserToLoginRoute = (router) => {
    if (!localStorage.getItem("token")) {
        router.push("/admin/login/");
    }
}

export { redirectAnonymousUserToLoginRoute };