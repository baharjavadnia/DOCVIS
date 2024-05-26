
// Get the submit button element
const submitButton = document.getElementById('submit-button');

// Get all the tel input elements
const telInputs = document.querySelectorAll('input[type="tel"]');

// Create the countdown timer element
const countdownTimer = document.createElement('div');
countdownTimer.classList.add('countdownTimer');

// Add the countdown timer to the DOM
submitButton.parentNode.insertBefore(countdownTimer, submitButton.nextSibling);

// Set the initial input length for mobile number
let inputLength = 11;

// Add an event listener to the submit button
submitButton.addEventListener('click', function() {
  // Loop through all the tel input elements
  for (let i = 0; i < telInputs.length; i++) {
    // Check if the input value is less than 11 digits long
    if (telInputs[i].value.length < inputLength) {
      // Show an error message
      Swal.fire({
        title: "!هشدار",
        text: "!لطفا شماره موبایل رو درست وارد کن",
        icon: "warning"
      });

      // Break out of the loop
      break;
    } 
    else {
      // Change the submit button text to "Enter"
      submitButton.innerHTML = 'ورود';

      // Change the placeholder text to "Enter the verification code"
      telInputs[i].placeholder = 'کد تایید را وارد کنید';

      // Clear the input value
      telInputs[i].value = '';

      // Start the countdown timer
      let timeLeft = 5;
      const interval = setInterval(function() {
        if (timeLeft <= 0) {
          // Stop the countdown timer
          clearInterval(interval);

          // Show the "Didn't get the code? Resend" text
          countdownTimer.innerHTML = 'کد تایید را دریافت نکردید؟ <a href="#">ارسال مجدد</a>';
          interval = window.setInterval(interval, 4000);

        } 
        else {
          // Update the countdown timer
          countdownTimer.innerHTML = 'زمان باقی مانده : ' + timeLeft;
          timeLeft -= 1;
        }
      }, 1000);
      

      // Break out of the countdownTimer loop
      break;
    }
  }
});

// Add an event listener to the tel input elements
telInputs.forEach(input => {
  input.addEventListener('keypress', function(e) {
    // Check if the key pressed is a digit
    if (/\d/.test(e.key)) {
      // Check if the input value is less than 11 characters long
      if (input.value.length < 11) {
        // Allow the key to be entered
        return true;
      } else {
        // Prevent the key from being entered
        e.preventDefault();
      }
    } else {
      // Prevent the key from being entered
      e.preventDefault();
    }
    // Check if the input value is less than 5 characters long
    if (input.value.length < 5) {
      // Allow the key to be entered
      return true;
    } else {
      // Prevent the key from being entered
      e.preventDefault();
    }
  });
});
