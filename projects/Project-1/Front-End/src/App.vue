<script setup>
import { ref } from 'vue';
const submitButtonClass = ref("col-4 btn btn-light fs-bold");
const first_name = ref('');
const last_name = ref('');
const company_name = ref('');
const job_position = ref('');
const phone_number = ref('');
const description = ref('');

const checkEveryInputIsFilled = () => {
  let requiredInputs = [...document.getElementsByClassName("form-input")];
  return requiredInputs.every(input => input.value !== "")
}

const formSubmitHandler = (e) => {
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
  let JSONData = {
    "first_name": first_name.value,
    "last_name": last_name.value,
    "company_name": company_name.value,
    "job_position": job_position.value,
    "phone_number": phone_number.value,
    "description": description.value,
    "arcaptcha_token": arcaptchaToken.value
  };
  sendDataRequest.send(JSON.stringify(JSONData));
}
</script>

<template>
  <div class="container body-center d-flex align-items-center justify-content-center">
    <div class="row bg-dark rounded rounded-2 p-2">
      <div class="col-12 my-3">
        <h2 class="text-light">
          Information Form:
        </h2>
      </div>
      <form class="col-12" method="post" id="form-data" @submit.prevent="formSubmitHandler">
        <div class="form-floating mb-2">
          <input type="text" class="form-control form-input" name="first_name" id="first_name" placeholder="First Name"
            v-model="first_name">
          <label for="first_name">First Name</label>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control form-input" name="last_name" id="last_name" placeholder="Last Name"
            v-model="last_name">
          <label for="last_name">Last Name</label>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control form-input" name="company_name" id="company_name"
            v-model="company_name" placeholder="Company Name">
          <label for="company_name">Company Name</label>
        </div>

        <div class="form-floating mb-2">
          <input type="text" class="form-control form-input" name="job_position" id="job_position"
            v-model="job_position" placeholder="Job Position">
          <label for="job_position">Job Position</label>
        </div>

        <div class="form-floating mb-2">
          <input type="text" class="form-control form-input" name="phone_number" id="phone_number"
            v-model="phone_number" placeholder="Phone Number">
          <label for="phone_number">Phone Number</label>
        </div>
        <div class="form-floating mb-2">
          <textarea class="form-control form-input" name="description" id="description" v-model="description"
            placeholder="Description"></textarea>
          <label for="description">Description</label>
        </div>
        <div class="arcaptcha" data-site-key="rvr5q8ovqn"></div>
        <div class="row justify-content-center my-2">
          <button :class="submitButtonClass" id="form-submit-button">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="css" scoped>
.body-center {
  min-height: 100vh;
}
</style>