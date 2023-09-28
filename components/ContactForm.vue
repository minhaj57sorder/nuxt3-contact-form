<template>
  <div
    class="px-6 py-6 lg:px-8 border border-cyan-700 shadow-xl bg-cyan-800/10 rounded-lg backdrop-blur-[10px]"
  >
    <div
      v-if="errorresponse"
      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
      role="alert"
    >
      <span class="font-medium">Error!</span> {{ errorresponse }}
    </div>
    <div
      v-if="successresponseMessage"
      class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
      role="alert"
    >
      <span class="font-medium">Success !</span> {{ successresponseMessage }}
    </div>
    <form @submit="submitHandler">
      <div class="mb-6">
        <label
          for="name"
          :class="[name_el_error ? 'text-red-600' : 'text-gray-900']"
          class="block mb-2 text-sm font-medium"
          >Your name*</label
        >
        <input
          type="name"
          id="name"
          ref="name_el"
          v-model="formInputs.name"
          @input="removeNameError"
          :class="[name_el_error ? 'border-red-600' : 'border-gray-300']"
          class="bg-gray-50 border input-focus text-gray-900 text-sm rounded-lg focus-visible:ring-cyan-500 focus-visible:border-cyan-500 focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
          placeholder="jon doe"
        />
        <p v-if="name_el_error" class="mt-2 text-sm text-red-600">
          <span class="font-medium">Oops!</span> Username could not be empty!
        </p>
      </div>
      <div class="mb-6">
        <label
          for="email"
          :class="[
            email_el_error || email_el_required_error
              ? 'text-red-600'
              : 'text-gray-900',
          ]"
          class="block mb-2 text-sm font-medium"
          >Your email*</label
        >
        <input
          type="email"
          ref="email_el"
          id="email"
          v-model="formInputs.email"
          @input="removeEmailError"
          :class="[
            email_el_error || email_el_required_error
              ? 'border-red-600'
              : 'border-gray-300',
          ]"
          class="bg-gray-50 border input-focus text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
          placeholder="name@flowbite.com"
        />
        <p v-if="email_el_required_error" class="mt-2 text-sm text-red-600">
          <span class="font-medium">Oops!</span> Enter your email address, this
          is required feild!
        </p>
        <p v-if="email_el_error" class="mt-2 text-sm text-red-600">
          <span class="font-medium">Oops!</span> Dose not seem like email
          address, email address should looks like this 'username@company.com'!
        </p>
      </div>
      <div class="mb-6">
        <label
          for="phone"
          :class="[phone_el_error ? 'text-red-600' : 'text-gray-900']"
          class="block mb-2 text-sm font-medium"
          >Your phone*</label
        >
        <!-- <input
            type="phone"
            ref="phone_el"
            id="phone"
            v-model="formInputs.phone"
            @input="removePhoneError"
            :class="[phone_el_error ? 'border-red-600' : 'border-gray-300']"
            class="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
            placeholder="+8801823456712"
          /> -->
        <div
          :class="[
            phone_el_error ? 'border-red-600' : '',
            telephone_input_focused
              ? 'border-cyan-500 telephone-focus'
              : 'border-gray-300',
          ]"
          class="bg-gray-50 border input-focus transition-all text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-1"
        >
          <vue-tel-input
            v-model="formInputs.phone"
            @input="removePhoneError"
            @focus="focusTelephoneInput"
            @blur="focusRemoveTelephoneInput"
            @validate="validatePHoneNumber"
            mode="international"
            class="w-full bg-transparent"
          ></vue-tel-input>
        </div>
        <p v-if="phone_el_error" class="mt-2 text-sm text-red-600">
          <span class="font-medium">Oops!</span> Please enter phone number this
          is required feild!
        </p>
        <p v-else-if="is_valid_phone_error" class="mt-2 text-sm text-red-600">
          <span class="font-medium">Oops!</span> Your entered number dose not
          looks like phone number!
        </p>
      </div>
      <div class="mb-6">
        <label
          for="subject"
          :class="[subject_el_error ? 'text-red-600' : 'text-gray-900']"
          class="block mb-2 text-sm font-medium"
          >Message subject*</label
        >
        <input
          type="subject"
          ref="subject_el"
          id="subject"
          v-model="formInputs.subject"
          @input="removeSubjectError"
          :class="[subject_el_error ? 'border-red-600' : 'border-gray-300']"
          class="bg-gray-50 border input-focus text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
          placeholder="message subject"
        />
        <p v-if="subject_el_error" class="mt-2 text-sm text-red-600">
          <span class="font-medium">Oops!</span> Subject could not be empty!
        </p>
      </div>
      <div class="mb-6">
        <label
          for="message"
          :class="[message_el_error ? 'text-red-600' : 'text-gray-900']"
          class="block mb-2 text-sm font-medium"
          >Your message*</label
        >

        <textarea
          id="message"
          ref="message_el"
          v-model="formInputs.message"
          @input="removeMessageError"
          rows="4"
          :class="[message_el_error ? 'border-red-600' : 'border-gray-300']"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border input-focus focus:ring-cyan-500 focus:border-cyan-500"
          placeholder="Leave a comment..."
        ></textarea>
        <p v-if="message_el_error" class="mt-2 text-sm text-red-600">
          <span class="font-medium">Oops!</span> Message could not be empty!
        </p>
      </div>
      <button
        type="submit"
        :disabled="loading"
        class="text-white text-center flex justify-center bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        formnovalidate="formnovalidate"
      >
        <span v-if="!loading">Submit</span>
        <!-- add loading icon -->
        <svg
          v-else
          aria-hidden="true"
          class="w-5 h-5 mr-2 text-white animate-spin fill-cyan-700"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </button>
    </form>
  </div>
</template>
<script setup>
import { required, isEmail, mobileNoBd } from "./../utils/validator.js";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";

const phoneNumber = ref("");
const loading = ref(false);
const errorresponse = ref(null);
const successresponseMessage = ref(null);
const name_el = ref(null);
const name_el_error = ref(false);
const email_el = ref(null);
const email_el_error = ref(false);
const email_el_required_error = ref(false);
const phone_el = ref(null);
const phone_el_error = ref(false);
const subject_el = ref(null);
const subject_el_error = ref(false);
const message_el = ref(null);
const message_el_error = ref(false);
const telephone_input_focused = ref(false);
const is_valid_phone_error = ref(false);

const is_valid_phone = ref(false);

const formInputs = reactive({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});
const submitHandler = async (e) => {
  e.preventDefault();
  if (required(formInputs.name)) {
    // set error true if feild is empty
    name_el_error.value = true;
  }

  if (required(formInputs.email)) {
    // set error true if feild value is not email
    email_el_required_error.value = true;
  } else if (isEmail(formInputs.email)) {
    // set error true if feild value is not email
    email_el_error.value = true;
  }

  if (required(formInputs.phone)) {
    // set error true if feild is empty
    phone_el_error.value = true;
  } else {
    is_valid_phone_error.value = !is_valid_phone.value;
  }
  if (required(formInputs.subject)) {
    // set error true if feild is empty
    subject_el_error.value = true;
  }
  if (required(formInputs.message)) {
    // set error true if feild is empty
    message_el_error.value = true;
  }

  if (
    name_el_error.value ||
    email_el_required_error.value ||
    email_el_error.value ||
    phone_el_error.value ||
    is_valid_phone_error.value ||
    subject_el_error.value ||
    message_el_error.value
  ) {
    console.log("validation failed");
    return;
  }
  // set form submission loading state
  loading.value = true;
  const { data, pending, error, refresh, status } = await useFetch(
    "/api/contact",
    {
      method: "post",
      body: { ...formInputs },
    }
  );
  console.log("from error", error.value, data.value, "status: ", status.value);
  if (status.value == "success") {
    console.log(data.value.message);
    successresponseMessage.value = data.value.message;

    formInputs.name = "";
    formInputs.email = "";
    formInputs.phone = "";
    formInputs.subject = "";
    formInputs.message = "";
    loading.value = false;
  } else {
    loading.value = false;
    console.log("from error", error);
    console.log(error.value.statusCode);
    errorresponse.value =
      error.value.statusCode + " " + error.value.statusMessage;
  }
};

const removeNameError = () => {
  name_el_error.value = false;
};
const removeEmailError = () => {
  email_el_error.value = false;
  email_el_required_error.value = false;
};
const removePhoneError = () => {
  phone_el_error.value = false;
  is_valid_phone_error.value = false;
};
const removeSubjectError = () => {
  subject_el_error.value = false;
};
const removeMessageError = () => {
  message_el_error.value = false;
};
const focusTelephoneInput = () => {
  console.log("telephone focus");
  telephone_input_focused.value = true;
};
const focusRemoveTelephoneInput = () => {
  telephone_input_focused.value = false;
};
const validatePHoneNumber = (status) => {
  is_valid_phone.value = status.valid;
  console.log(status.valid);
};
</script>
<style>
.vue-tel-input {
  border: none !important;
}
.vti__input,
.vti__input:focus,
.vti__dropdown,
.vti__dropdown:focus {
  background-color: transparent !important;
  background: transparent !important;
}
.vue-tel-input:focus-within {
  box-shadow: none;
  border-color: transparent;
}
.input-focus:focus {
  box-shadow: 0px 0px 0px 5px rgb(14, 116, 114, 0.1);
  animation: focusInputAnimation 0.3s ease-out 0s 1 forwards;
}
.telephone-focus {
  box-shadow: 0px 0px 0px 5px rgb(14, 116, 114, 0.1);
  animation: focusInputAnimation 0.3s ease-out 0s 1 forwards;
}
@keyframes focusInputAnimation {
  form {
    box-shadow: 0px 0px 0px 5px rgb(14, 116, 114, 0.1);
  }
  to {
    box-shadow: 0px 0px 0px 1px rgb(14, 116, 114, 0.1);
  }
}
</style>
