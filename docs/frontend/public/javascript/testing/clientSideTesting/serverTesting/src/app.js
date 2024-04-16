import { expect } from "chai";
import { isValidEmail } from "../../../../validation.mjs";

describe ("isValidEmail", () => {
    it("should validate the email correctly", () => {
        expect(isValidEmail("Nircadmitrii@icloud.com")).to.equal(true);
    })
})