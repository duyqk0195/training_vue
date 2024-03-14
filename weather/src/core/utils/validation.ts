function account(
  username: string,
  password: string,
  error: (message: string) => void,
  susscess: () => void
): void {
  if (!username || !password) {
    error("Email and password are required");
    return;
  }

  if (password.length < 5 || username.length < 5) {
    error("Username and password must be at least 5 characters");
    return;
  }

  susscess();
  return;
}

const validate = {
  account,
};

var emailRegex =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function isEmailValid(email: string) {
  if (!email) return false;

  if (email.length > 254) return false;

  var valid = emailRegex.test(email);
  if (!valid) return false;

  // Further checking of some things regex can't handle
  var parts = email.split("@");
  if (parts[0].length > 64) return false;

  var domainParts = parts[1].split(".");
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  )
    return false;

  return true;
}

export default validate;
