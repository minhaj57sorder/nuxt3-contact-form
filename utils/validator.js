

  export const required = (val) => {
    return !(val && val.length > 0) ;
  };
  export const mobileNoBd = (val) => {
    return !(val && val.length > 10 && val.length < 12);
  };
  export const phoneValidator = (val) => {
    // Regex pattern for a valid phone number.
 const phoneNumberRegex = /^[\+\d]{10,12}$/;

 // Match the phone number against the regex pattern.
 const match = phoneNumberRegex.match(phoneNumber);
 return match
 };
  export const short = (val) => {
    return !(val && val.length > 5);
  };
  export const min8Char = (val) => {
    return !(val && val.length > 7);
  };

  export const speachialUername = (val) => {
    const strength = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return !strength.test(val)
  };
  export const isEmail = (val) => {
    const emailPattern =
      /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return !emailPattern.test(val)
  };
  
  export const customLoader = () => {
    function showLoader() {
      //
      let body = document.getElementsByTagName('body')
      let div = document.createElement('div')
      div.innerHTML = `<div id="q-loading" data-v-app=""><div class="q-loading fullscreen flex flex-center z-max"><div class="q-loading__backdrop"></div><div class="q-loading__box column items-center bg-grey-2 text-grey-9"><svg class="loaderlogo" version="1.1"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 80 80" style="enable-background:new 0 0 80 80;" xml:space="preserve">
     <g>
         <path fill="#4F005E" d="M37.2,33.5l16.3-12.3c0.1,1.8-0.5,3.5-1.6,4.8L37.2,37.4V33.5z"/>
         <polygon fill="#0DC8C4" points="37.2,40.2 42.8,35.9 42.8,40.2 37.2,44.2 	"/>
         <path fill="#4F005E" d="M42.8,42.5v4.1L26.5,58.8c0,0-0.4-3.3,2-5.5L42.8,42.5z"/>
     </g>
     </svg><svg class="q-spinner text-primary q-spinner-mat q-loading__spinner" width="80" height="80" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-miterlimit="10"></circle></svg><div class="q-loading__message">Requesting To Server. Please Wait...</div></div></div><!----></div>`
      div.id = 'customLoader'
      div.className = 'fullscreen text-capitalize'
      body[0].appendChild(div)
      body[0].classList.add('q-body--force-scrollbar-y')
      body[0].classList.add('q-body--prevent-scroll')
    }
    function hideLoader() {
      //
      let div = document.getElementById('customLoader')
      if (div) {
  
        div.remove()
        document.body.classList.remove('q-body--prevent-scroll')
        document.body.classList.remove('q-body--force-scrollbar-y')
      }
    }
    return {
      showLoader, hideLoader
    }
  };
  
    