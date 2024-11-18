function checkLogin() {
  var login = document.getElementById("login").value;

  if (login.length < 3) {
    createLoginError("Login must be at least 3 characters long.");
  } else if (login.length > 20) {
    createLoginError("Login must be at most 20 characters long.");
  } else if (login.includes(" ")) {
    createLoginError("Login cannot contain spaces.");
  } else if (login.includes("@")) {
    if (!validateEmail(login)) {
      createLoginError("Invalid email address.");
    }
  } else {
    var errorElement = document.getElementById("loginError");
    if (errorElement) {
      errorElement.remove();
    }
  }
}

function checkPassword() {
  var password = document.getElementById("pswd").value;

  if (password.length < 6) {
    createPswdError("Password must be at least 6 characters long.");
  } else if (password.length > 20) {
    createPswdError("Password must be at most 20 characters long.");
  } else if (password.includes(" ")) {
    createPswdError("Password cannot contain spaces.");
  } else {
    var errorElement = document.getElementById("pswdError");
    if (errorElement) {
      errorElement.remove();
    }
  }
}

function checkPasswordConfirmation() {
  var pswd = document.getElementById("pswd").value;
  var pswdConfirmation = document.getElementById("pswdConfirmation").value;

  if (pswd !== pswdConfirmation) {
    console.log("Passwords are not the same");
    createPswdsMatchError("Passwords must be the same.");
  } else {
    var errorElement = document.getElementById("pswdMatchError");
    if (errorElement) {
      errorElement.remove();
    }
  }
}

function createLoginError(message) {
  var errorElement = document.getElementById("loginError");
  if (errorElement) {
    errorElement.innerHTML = message;
    return;
  }

  var loginElement = document.getElementById("login");
  var errorElement = document.createElement("p");
  errorElement.innerHTML = message;
  errorElement.style.color = "red";
  errorElement.style.fontSize = "0.8em";
  errorElement.style.marginBottom = "1em";
  errorElement.id = "loginError";
  loginElement.parentNode.insertBefore(errorElement, loginElement.nextSibling);
}

function createPswdError(message) {
  var errorElement = document.getElementById("pswdError");
  if (errorElement) {
    errorElement.innerHTML = message;
    return;
  }

  var pswdElement = document.getElementById("pswd");
  var errorElement = document.createElement("p");
  errorElement.innerHTML = message;
  errorElement.style.color = "red";
  errorElement.style.fontSize = "0.8em";
  errorElement.style.marginBottom = "1em";
  errorElement.id = "pswdError";
  pswdElement.parentNode.insertBefore(errorElement, pswdElement.nextSibling);
}

function createPswdsMatchError() {
  var errorElement = document.getElementById("pswdMatchError");
  if (errorElement) {
    return;
  }

  var pswdElement = document.getElementById("pswdConfirmation");
  var errorElement = document.createElement("p");
  errorElement.innerHTML = "Passwords must be the same.";
  errorElement.style.color = "red";
  errorElement.style.fontSize = "0.8em";
  errorElement.style.marginBottom = "1em";
  errorElement.id = "pswdMatchError";
  pswdElement.parentNode.insertBefore(errorElement, pswdElement.nextSibling);
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
