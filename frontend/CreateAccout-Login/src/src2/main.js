//followed video below to complete tutorial 
//https://www.youtube.com/watch?v=3GsKEtBcGTk

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}


function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

//clear error message
function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

//switch between forms
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createProfileForm = document.querySelector("#createProfile");
    const forgotPasswordForm = document.querySelector("#forgotPassword");

    document.querySelector("#linkCreateProfile").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createProfileForm.classList.remove("form--hidden");
        //forgotPasswordForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createProfileForm.classList.add("form--hidden");
        //forgotPasswordForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkForgotPassword").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        //createProfileForm.classList.remove("form--hidden");
        forgotPasswordForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

     
        //peform login and send error if failed
        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    //Username invlaid message
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupPassword" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Password must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });

});
