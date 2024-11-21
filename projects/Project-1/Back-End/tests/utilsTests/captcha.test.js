const tap = require("tap");
const { isCaptchaTokenValid } = require(process.cwd() + "/utils/captcha/main.js");

const validCaptchaToken = "000000000000000000000000000000", invalidCaptchaToken = "invalid captcha token";

tap.test("Test Captcha validation utility with valid token", async (t) => {
    const responseValidCaptcha = await isCaptchaTokenValid(validCaptchaToken);
    t.equal(responseValidCaptcha, true);
    t.ok(responseValidCaptcha);
})

tap.test("Test Captcha validation utility with invalid token", async (t) => {
    const responseInvalidCaptcha = await isCaptchaTokenValid(invalidCaptchaToken);
    t.equal(responseInvalidCaptcha, false);
    t.notOk(responseInvalidCaptcha);
})