import validator from './lib/aplication.js';
import IMask from 'imask';
//const {IMask} = require('imask');
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

export function numberCardValidate(number) {
  let valid_card = new validator(number).validate();
  return valid_card;
}

export function symbolIsNumber(symbol) {
  if (symbol.keyCode < 48 || symbol.keyCode > 57) {
    return false;
  } else {
    return true;
  }
}

export function templateCardNumber(input) {
  const maskNumber = {
    mask: '0000 0000 0000 0000',
  };
  const maskCardNumber = IMask(input, maskNumber);
  return maskCardNumber;
}
