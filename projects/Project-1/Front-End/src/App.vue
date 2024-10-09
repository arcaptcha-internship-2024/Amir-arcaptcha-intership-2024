<script setup>
import Header from './components/header.vue';
import { ref } from 'vue';
const submitButtonClass = ref("col-4 btn btn-light fs-bold");
const first_name = ref('');
const last_name = ref('');
const company_name = ref('');
const job_position = ref('');
const phone_number = ref('');
const description = ref('');
const inputsErrorStatus = ref({
  first_name: false,
  last_name: false,
  company_name: false,
  job_position: false,
  phone_number: false,
  description: false,
});
const inputClasses = ref({
  first_name: "form-control",
  last_name: "form-control",
  company_name: "form-control",
  job_position: "form-control",
  phone_number: "form-control",
  description: "form-control",
})

const getArcaptchaTokenValue = () => {
  try {
    let arcaptchaToken = document.getElementById("arcaptcha-token");
    return arcaptchaToken.value;
  } catch (e) {
    console.log("Error: Cannot get captcha value");
  }
  return false;
}

const createObjectFromInputsData = () => {
  let arcaptchaToken = getArcaptchaTokenValue();
  if (!arcaptchaToken) return null;
  return {
    "first_name": first_name.value,
    "last_name": last_name.value,
    "company_name": company_name.value,
    "job_position": job_position.value,
    "phone_number": phone_number.value,
    "description": description.value,
    "arcaptcha_token": arcaptchaToken
  };
}

const sendFieldsDataToServer = (fieldsData) => {
  let sendDataRequest = new XMLHttpRequest();
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
  sendDataRequest.send(JSON.stringify(fieldsData));
}

const validateFormInputsAreFilled = () => {
  inputsErrorStatus.value = {
    first_name: !first_name.value,
    last_name: !last_name.value,
    company_name: !company_name.value,
    job_position: !job_position.value,
    phone_number: !phone_number.value,
    description: !description.value,
  }
  return Object.values(inputsErrorStatus.value).some(error => error);
}

const setErrorClassForInputs = () => {
  Object.keys(inputsErrorStatus.value).forEach(errorStatusInputKey => {
    if (inputsErrorStatus.value[errorStatusInputKey]) {
      inputClasses.value[errorStatusInputKey] = "form-control border border-danger";
    } else {
      inputClasses.value[errorStatusInputKey] = "form-control"
    }
  })
}

const removeErrorFromInput = (e) => {
  if (e.target.value && e.target.classList.contains("border-danger")) {
    inputsErrorStatus.value[e.target.name] = false;
    e.target.className = "form-control";
  }
}

const addErrorToInputOnBlur = (e) => {
  if (!e.target.value) {
    inputsErrorStatus.value[e.target.name] = true;
    e.target.className = "form-control border border-danger";
  }
}

const formSubmitHandler = (e) => {
  if (validateFormInputsAreFilled()) { setErrorClassForInputs(); return; }
  const fieldsData = createObjectFromInputsData();
  if (!getArcaptchaTokenValue) {
    alert("Captcha is required");
    return;
  }
  sendFieldsDataToServer(fieldsData);
}
</script>

<template>
  <Header></Header>
  <div class="container d-flex align-items-center justify-content-center my-3">
    <div class="row bg-dark rounded rounded-2 p-2">
      <div class="col-12 my-3">
        <h2 class="text-light">
          Information Form:
        </h2>
      </div>
      <form class="col-12" method="post" id="form-data" @submit.prevent="formSubmitHandler">
        <div class="form-floating mb-2">
          <input type="text" :class="inputClasses.first_name" @input="removeErrorFromInput"
            @blur="addErrorToInputOnBlur" name="first_name" id="first_name" placeholder="First Name"
            v-model="first_name">
          <label for="first_name">First Name</label>
          <span class="text-danger" v-if="inputsErrorStatus.first_name">This Field is required</span>
        </div>
        <div class="form-floating mb-2">
          <input type="text" :class="inputClasses.last_name" @input="removeErrorFromInput" @blur="addErrorToInputOnBlur"
            name="last_name" id="last_name" placeholder="Last Name" v-model="last_name">
          <label for="last_name">Last Name</label>
          <span class="text-danger" v-if="inputsErrorStatus.last_name">This Field is required</span>
        </div>
        <div class="form-floating mb-2">
          <input type="text" :class="inputClasses.company_name" @input="removeErrorFromInput"
            @blur="addErrorToInputOnBlur" name="company_name" id="company_name" v-model="company_name"
            placeholder="Company Name">
          <label for="company_name">Company Name</label>
          <span class="text-danger" v-if="inputsErrorStatus.company_name">This Field is required</span>
        </div>
        <div class="form-floating mb-2">
          <input type="text" :class="inputClasses.job_position" @input="removeErrorFromInput"
            @blur="addErrorToInputOnBlur" name="job_position" id="job_position" v-model="job_position"
            placeholder="Job Position">
          <label for="job_position">Job Position</label>
          <span class="text-danger" v-if="inputsErrorStatus.job_position">This Field is required</span>
        </div>
        <div class="form-floating mb-2">
          <input type="text" :class="inputClasses.phone_number" @input="removeErrorFromInput"
            @blur="addErrorToInputOnBlur" name="phone_number" id="phone_number" v-model="phone_number"
            placeholder="Phone Number">
          <label for="phone_number">Phone Number</label>
          <span class="text-danger" v-if="inputsErrorStatus.phone_number">This Field is required</span>
        </div>
        <div class="form-floating mb-2">
          <textarea :class="inputClasses.description" @input="removeErrorFromInput" name="description"
            @blur="addErrorToInputOnBlur" id="description" v-model="description" placeholder="Description"></textarea>
          <label for="description">Description</label>
          <span class="text-danger" v-if="inputsErrorStatus.description">This Field is required</span>
        </div>
        <div class="arcaptcha" data-site-key="rvr5q8ovqn"></div>
        <div class="row justify-content-center my-2">
          <button :class="submitButtonClass" id="form-submit-button">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>