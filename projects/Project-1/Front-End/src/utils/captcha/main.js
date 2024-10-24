const getArcaptchaTokenValue = () => {
    try {
        let arcaptchaToken = document.getElementById("arcaptcha-token");
        return arcaptchaToken.value;
    } catch (e) {
        console.log("Error: Cannot get captcha value");
    }
    return false;
}

export const renderArcaptcha = () => {
    arcaptcha.render("#arcaptcha", {
        site_key: "rvr5q8ovqn"
    })
}

const getCaptchaToken = () => {
    return getArcaptchaTokenValue();
}

export default getCaptchaToken;