export const logoutUser = () => {
    localStorage.setItem("isAuthenticated", false);
    localStorage.setItem("user", '{}');
}