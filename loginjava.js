// Get the submit button element
const submitButton = document.getElementById('submit-button');
const telInput = document.querySelector('input[type=tel]');
const nameInput = document.querySelector('input[type=text')

// Create the countdown timer element
const countdownTimer = document.createElement('div');
countdownTimer.classList.add('countdownTimer');

// Add CSS styles to the countdown timer element
countdownTimer.style.color = 'gray';
countdownTimer.style.textAlign = 'center';

// Add the countdown timer to the DOM
submitButton.parentNode.insertBefore(countdownTimer, submitButton.nextSibling);

// Set the initial input length for mobile number
let inputLength = 11;

let isSmsSend = false


// Add an event listener to the tel input elements
// telInputs.forEach(input => {
//   input.addEventListener('keypress', function(e) {
//     // Check if the key pressed is a digit
//     if (/\d/.test(e.key)) {
//       // Check if the input value is less than 11 characters long
//       if (input.value.length < 11) {
//         // Allow the key to be entered
//         return true;
//       } else {
//         // Prevent the key from being entered
//         e.preventDefault();
//       }
//     } else {
//       // Prevent the key from being entered
//       e.preventDefault();
//     }
//   });
// });


// Add an event listener to the submit button
submitButton.addEventListener('click', function() {

  if(isSmsSend) {
    if (telInput.value.length === 5) {
      Swal.fire({
        title: "خوش آمدید",
        text: "",
        icon: "success"
      });
    }
    else {
      Swal.fire({
        title: "!هشدار",
        text: "کد تایید رو به درستی وارد کن!",
        icon: "warning"
      });
    }
  }
  else {
        const nameCheckRegex = /^[A-Za-z\u0600-\u06FF\s]+$/

        if(!nameCheckRegex.test(nameInput.value)) {
          Swal.fire({
            title: "!هشدار",
            text: "فرمت نام و نام خانوادگی اشتباه است!",
            icon: "warning"
          });
        }
        // Check if the input value is less than 11 digits long
        else if (telInput.value.length < inputLength) {
          // Show an error message
          Swal.fire({
            title: "!هشدار",
            text: "!لطفا شماره موبایل رو درست وارد کن",
            icon: "warning"
          });
        } 
        else {
          // Change the submit button text to "Enter"
          submitButton.innerHTML = 'ورود';
    
          // Change the placeholder text to "Enter the verification code"
          telInput.placeholder = 'کد تایید را وارد کنید';
    
          // Clear the input value
          telInput.value = '';
    
          sendSMS();
        }
  }
});

function sendSMS() {
  isSmsSend = true;

  // Start the countdown timer
  let timeLeft = 5;
  const interval = setInterval(function() {
    if (timeLeft <= 0) {
      // Stop the countdown timer
      clearInterval(interval);

      // Show the "Didn't get the code? Resend" text
      countdownTimer.innerHTML = 'کد تایید را دریافت نکردید؟ <a href="#">ارسال مجدد</a>';

      countdownTimer.querySelector('a').addEventListener('click', () => {
        sendSMS();
      })

      interval = window.setInterval(interval, 4000);

    } else {
      // Update the countdown timer
      countdownTimer.innerHTML = 'زمان باقی مانده : ' + timeLeft;
      timeLeft -= 1;
    }
  }, 1000);
}

// Define the interval variable outside of the event listeners
let interval;

// Add an event listener to the "ارسال مجدد" link so that it recognizes it
document.querySelector('a[href="#"]').addEventListener('click', function(e) {
  e.preventDefault();

  // Clear the previous interval to prevent multiple timers running simultaneously
  clearInterval(interval);

  // Reset the countdown timer
  countdownTimer.innerHTML = 'ارسال مجدد کد در راه است...';

  // Start a new countdown timer
  let timeLeft = 5;
  interval = setInterval(function() {
    if (timeLeft <= 0) {
      // Stop the countdown timer
      clearInterval(interval);

      // Show the "Didn't get the code? Resend" text
      countdownTimer.innerHTML = 'کد تایید را دریافت نکردید؟ <a href="#">ارسال مجدد</a>';
      interval = window.setInterval(interval, 4000);

    } else {
      // Update the countdown timer
      countdownTimer.innerHTML = 'زمان باقی مانده : ' + timeLeft;
      timeLeft -= 1;
    }
  }, 1000);
});