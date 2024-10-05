require("dotenv").config();
const axios = require("axios");

const { ARCAPTCHA_SITEKEY, ARCAPTCHA_SECRETKEY } = process.env;

const arcaptchaValidation = async (arcaptcha_token) => {
    const result = await axios.post("https://api.arcaptcha.co/arcaptcha/api/verify", {
        challenge_id: arcaptcha_token,
        site_key: ARCAPTCHA_SITEKEY,
        secret_key: ARCAPTCHA_SECRETKEY
    })
    const { success } = result.data;
    return success;
}

module.exports = {
    arcaptchaValidation
}