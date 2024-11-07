// Test Credit Card numbers examined from PayPal's list
// http://www.paypalobjects.com/en_US/vhelp/paypalmanager_help/credit_card_numbers.htm

import should from "should";
import validate from "../dist/luhn.js";
import validateOptimized from "../dist/luhnOptimized.js";

const _VALID_TEST_NUMBER = "4012111111111111";

function runTests(validator, validatorName) {
    describe(`Luhn Validation - ${validatorName}`, function(){

        describe("Basic Requirements", function(){

            it("should trim the number", function(){
                validator(_VALID_TEST_NUMBER + "       ").should.be.true;
            });

            it("should only allow numeric number strings", function(){
                validator(_VALID_TEST_NUMBER + "A").should.be.false;
            });
        });

        describe("Happy Path", function(){
            it("should return true for valid number.", function(){
                validator(_VALID_TEST_NUMBER).should.be.true;
            });
        });

        describe("Test Credit Card Numbers", function(){
            it("should pass America Express - 378282246310005", function(){
                const number = "378282246310005";
                validator(number).should.be.true;
            });

            it("should pass America Express - 371449635398431", function(){
                const number = "371449635398431";
                validator(number).should.be.true;
            });

            it("should pass America Express Corporate- 378734493671000", function(){
                const number = "378734493671000";
                validator(number).should.be.true;
            });

            it("should pass Australian BankCard - 5610591081018250", function(){
                const number = "5610591081018250";
                validator(number).should.be.true;
            });

            it("should pass Diners Club - 30569309025904", function(){
                const number = "30569309025904";
                validator(number).should.be.true;
            });

            it("should pass Diners Club - 38520000023237", function(){
                const number = "38520000023237";
                validator(number).should.be.true;
            });

            it("should pass Discover - 6011111111111117", function(){
                const number = "6011111111111117";
                validator(number).should.be.true;
            });

            it("should pass Discover - 6011000990139424", function(){
                const number = "6011000990139424";
                validator(number).should.be.true;
            });

            it("should pass JCB - 3530111333300000", function(){
                const number = "3530111333300000";
                validator(number).should.be.true;
            });

            it("should pass JCB - 3566002020360505", function(){
                const number = "3566002020360505";
                validator(number).should.be.true;
            });

            it("should pass MasterCard - 5555555555554444", function(){
                const number = "5555555555554444";
                validator(number).should.be.true
            });

            it("should pass MasterCard - 5105105105105100", function(){
                const number = "5105105105105100";
                validator(number).should.be.true;
            });

            it("should pass Visa - 4111111111111111", function(){
                const number = "4111111111111111";
                validator(number).should.be.true;
            });

            it("should pass Visa - 4012888888881881", function(){
                const number = "4012888888881881";
                validator(number).should.be.true;
            });

            it("should pass Visa - 4222222222222", function(){
                const number = "4222222222222";
                validator(number).should.be.true;
            });

        });

        describe("Test Credit Card Numbers with Spaces", function() {
            it("should pass Visa - 4111 1111 1111 1111", function(){
                const number = "4111 1111 1111 1111";
                validator(number).should.be.true;
            });

            it("should pass Visa - 4012 8888 8888 1881", function(){
                const number = "4012 8888 8888 1881";
                validator(number).should.be.true;
            });

            it("should pass American Express - 3782 822463 10005", function(){
                const number = "378282246310005";
                validator(number).should.be.true;
            });
        });

        describe("Random large number examples", function() {
            const randomExamples = [];
            const possible = "0123456789";
            // generate random examples
            for (let i = 0; i < 10; i++) {
                // length is between 17 and 21
                const length = Math.floor(Math.random() * 4 + 17);
                let example = "";
                for (let j = 0; j < length; j++) {
                    example += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                randomExamples.push(example);
            }

            randomExamples.forEach(function(example) {
                it("should have exactly one valid checksum digit after " + example, function() {
                    let validCount = 0;
                    for (let i = 0; i < 10; i++) {
                        const number = example + '' + i;
                        if (validator(number)) {
                            validCount++;
                        }
                    }
                    validCount.should.equal(1);
                });
            });
        });

        describe("User Submitted Issues", function(){
            it("should return false for number of zero.", function(){
                const number = "0";
                validator(number).should.be.false;
            });

            it("should return false for number of 4 zeroes.", function(){
                const number = "0000";
                validator(number).should.be.false;
            });

            it("should return false for number of 16 zeroes.", function(){
                const number = "0000000000000000";
                validator(number).should.be.false;
            });

            it("should return false if digits add to 0.", function(){
                const number = "00000000000000";
                validator(number).should.be.false;
            });

            it("should return false if passed an empty string", function(){
                const number = "";
                validator(number).should.be.false;
            });
        });
    });
}

describe("Luhn Validation Suite", function(){
    runTests(validate, "Original");
    runTests(validateOptimized, "Optimized");
});
