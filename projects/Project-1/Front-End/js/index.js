const form = document.getElementById("form-data");
const submitBtn = document.getElementById("form-submit-button");

function arcaptchaCallback() {
    submitBtn.classList.remove("disabled");
}

const checkEveryInputIsFilled = () => {
    let requiredInputs = [...document.getElementsByClassName("form-input")];
    return requiredInputs.every(input => input.value !== "")
}

const getInputsDataInObject = () => {
    let requiredInputs = [...document.getElementsByClassName("form-input")];
    let data = {};
    requiredInputs.forEach(input => {
        data[input.name] = input.value;
    })
    return data
}

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!checkEveryInputIsFilled()) {
        alert("Please fill all inputs");
        return;
    }
    let sendDataRequest = new XMLHttpRequest();
    let arcaptchaToken = document.getElementById("arcaptcha-token");
    sendDataRequest.open("POST", "http://localhost:8000/api/contact/create/", true);
    sendDataRequest.setRequestHeader("Content-Type", "application/json");
    sendDataRequest.onload = () => {
        if (sendDataRequest.status === 201) {
            alert("Data Saved successfully!");
        } else {
            const { error } = JSON.parse(sendDataRequest.response);
            alert(error);
        }
    }
    let JSONData = getInputsDataInObject();
    JSONData['arcaptcha_token'] = arcaptchaToken.value;
    sendDataRequest.send(JSON.stringify(JSONData));
})