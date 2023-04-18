import validator from "./lib/aplication.js";
//import validator from "validator-bank-card";
//let valid_card = new validator("5425233430109903").validate();
//let invalid_card = new validator("4554738890994555").validate();
/**
 * output:
 *
 * {
 *   "chipset": "MASTERCARD",
 *   "card_number": "5425233430109903",
 *   "is_valid": true
 * }
 */


export default function numberCardValidate (number){
    let valid_card = new validator(number).validate();
    return valid_card;
}
