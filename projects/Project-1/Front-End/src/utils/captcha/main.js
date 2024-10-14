const getArcaptchaTokenValue = () => {
    try {
        let arcaptchaToken = document.getElementById("arcaptcha-token");
        return arcaptchaToken.value;
    } catch (e) {
        console.log("Error: Cannot get captcha value");
    }
    return false;
}

const getCaptchaToken = () => {
    return getArcaptchaTokenValue();
}

export default getCaptchaToken;