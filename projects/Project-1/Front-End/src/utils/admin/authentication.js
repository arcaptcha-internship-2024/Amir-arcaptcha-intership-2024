const isUserAuthenticated = () => {
    return localStorage.getItem("token") ? true : false;
}
export { isUserAuthenticated };