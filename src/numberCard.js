import validator from './lib/aplication.js';
import IMask from 'imask';
import { el } from 'redom';

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

export function templateCVC(input) {
  const maskCVC = {
    mask: '000',
  };
  const maskCardCVC = IMask(input, maskCVC);
  return maskCardCVC;
}

export class CustomInput {
  constructor(placeholder) {
    this.el = el(`input`, {
      placeholder,
    });
  }
}
