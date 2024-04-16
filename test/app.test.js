import { expect } from "../node_modules/chai/chai.js";

function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}

function validateUsername(username) {
  if (username.trim() === "") {
    return false;
  } else {
    return true;
  }
}

function validatePassword(password) {
  if (password.trim() === "") {
    return false;
  } else {
    return true;
  }
}

function validateConfirmPassowrd(password, confirmPassword) {
  if (confirmPassword.trim() === "") {
    return false;
  }
  if (password.trim() !== confirmPassword) {
    return false;
  } else {
    return true;
  }
}

function isStrongPassword(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  // Check if the password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  // Check if the password contains at least one digit
  if (!/\d/.test(password)) {
    return "Password must contain at least one digit.";
  }

  // Check if the password contains at least one special character
  if (!/[!@#$%^&*]/.test(password)) {
    return "Password must contain at least one special character.";
  }

  // If all complexity criteria are met
  return "Password is strong.";
}

describe("testValidateEmail", () => {
  it("should return true if email format is correct", (done) => {
    //Create some valid and invalid test emails
    const badEmails = ["d", " ", "d@", ".com"];
    const goodEmails = ["d@d.com", "angus@fred.net"];

    //Check the bad emails
    for (let email of badEmails) {
      expect(isValidEmail(email)).to.equal(false);
    }

    //Check the good emails
    for (let email of goodEmails) {
      expect(isValidEmail(email)).to.equal(true);
    }
    done();
  });
});

describe("testValidateUsername", () => {
  it("should return true if username field is non-empty", (done) => {
    expect(validateUsername("Dumitru")).to.equal(true);
    expect(isValidEmail("")).to.equal(false);
    done();
  });
});

describe("testValidatePassword", () => {
  it("should return true if testValidatePassword field is non-empty", (done) => {
    expect(validatePassword("Dumitru123")).to.equal(true);
    expect(validatePassword("")).to.equal(false);
    done();
  });
});

describe("testConfirmPassword", () => {
  it("should return true if both passwords are equal", (done) => {
    expect(validateConfirmPassowrd("Dumitru123", "Dumitru123")).to.equal(true);
    expect(validateConfirmPassowrd("Dumitru", "Dumitru123")).to.equal(false);
    done();
  });
});

describe("isStrongPassword", () => {
  it("should return true if both passwords are equal", (done) => {
    expect(isStrongPassword("Dumitru")).to.equal("Password must be at least 8 characters long.");
    expect(isStrongPassword("DUMITRUDADAAD")).to.equal("Password must contain at least one lowercase letter.");
    expect(isStrongPassword("dumitruuuuuuuuuuu")).to.equal("Password must contain at least one uppercase letter.");
    expect(isStrongPassword("DumitrasDumitras")).to.equal("Password must contain at least one digit.");
    expect(isStrongPassword("DumitrasDumitras1")).to.equal("Password must contain at least one special character.");
    expect(isStrongPassword("Dumitras123@")).to.equal("Password is strong.");
    done();
  });
});

