const logInBtn = document.querySelector('.btn-log-in-js');
const logInInp = document.querySelector('.login__input-js');
const logInPass = document.querySelector('.login__input-pass-js');
const notifiWelc = document.querySelector('.notifi_welcome-js');
const btnDiv = document.querySelector('.div-btn');

logInBtn.addEventListener('click', logIn);

function logIn(e) {
  e.preventDefault();
  logInInp.classList.add('is-hidden');
  logInPass.classList.add('is-hidden');
  logInBtn.classList.add('is-hidden');
  notifiWelc.classList.remove('is-hidden');
  btnDiv.classList.add('is-hidden');

  setTimeout(() => {
    logInInp.classList.remove('is-hidden');
    logInPass.classList.remove('is-hidden');
    logInBtn.classList.add('is-hidden');
    notifiWelc.classList.add('is-hidden');
    btnDiv.classList.remove('is-hidden');
  }, 2000);
}
