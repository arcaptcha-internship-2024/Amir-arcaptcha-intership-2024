require("dotenv").config();
const axios = require("axios");

let { ARCAPTCHA_SITEKEY, ARCAPTCHA_SECRETKEY } = process.env;

const isArcaptchaTokenValid = async (arcaptcha_token) => {
    if(process.env.NODE_ENV === "test"){
        ARCAPTCHA_SITEKEY = "0000000000"
        ARCAPTCHA_SECRETKEY = "00000000000000000000"
    }
    try {
        const result = await axios.post("https://api.arcaptcha.co/arcaptcha/api/verify", {
            challenge_id: arcaptcha_token,
            site_key: ARCAPTCHA_SITEKEY,
            secret_key: ARCAPTCHA_SECRETKEY
        })
        const { success } = result.data;
        return success;
    } catch (e) {
        return false;
    }
}

const isCaptchaTokenValid = async (arcaptcha_token) => {
    return await isArcaptchaTokenValid(arcaptcha_token);
}

module.exports = {
    isArcaptchaTokenValid,
    isCaptchaTokenValid
}