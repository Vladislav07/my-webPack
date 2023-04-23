import { el, mount } from "redom";
import './style.css';
import aexp from './assets/images/amex.svg';
import diners from './assets/images/diners.svg';
import maestro from './assets/images/maestro.svg';
import mastercard from './assets/images/mastercard.svg';
import mir from './assets/images/mir.svg';
import visa from './assets/images/visa.svg';
import discover from './assets/images/discover.svg';
import jsb from './assets/images/jcb.svg';
import UnionPay from './assets/images/unionpay.svg';


class FormLabel {
  constructor(text) {
    this.el = el("label.form-label", text);
  }
}

class FormErrorMessage {
  constructor(classMessage) {
    this.el = el(`.invalid-feedback.${classMessage}`);
  }
}

class CustomInput {
  constructor(type, name, customClass) {
    this.el = el(`input.form-control.${customClass}`, {
      type: type,
      name: name,
      required: 'true'
    });
  }
}

class FormGroup {
  constructor(text, classMessage, input) {
    this.el = el(".col-auto.card__group", [
      new FormLabel(text),
      input,
      new FormErrorMessage(classMessage),
    ]);
  }
}
const title = el("h1.title", "онлайн-оплата");
const inputNumber = new CustomInput("text", "numberCard", "card__number");
const inputDate = new CustomInput("text", "date", "card__date");
const inputCVC = new CustomInput("text", "CVC", "card__cvc");
const inputEmail = new CustomInput("text", "email", "card__email");

const container = el(".container.d-flex.flex-column.align-items-center.mt-3");
const form = el("form.card.needs-validation");
const formGroupEmail = new FormGroup("email", "message__email", inputEmail);
const formGroupDate = new FormGroup(
  "Дата окончания действия карты (ММ/ГГ)",
  "message__date", inputDate
);

const formGroupCode = new FormGroup(
  "CVC/CVV (3 цифры на обороте карты)",
  "message__cvc", inputCVC
);
const formGroupNumber = new FormGroup("номер карты", "message__number", inputNumber);
const btn = new el("button.btn.btn-primary.card__btn", "Оплатить", {
  type: "submit",
  disabled: "true",
});
//<img src="/upload/myicon.svg" width="128" height="128" alt="моя svg иконка" />

class ImageIcon {
  constructor(alt, pathIcon) {
    this.el = el("img.card__chipset", {
      width: "50",
      height: '50',
      alt: alt,
      src: pathIcon
    })
  }
}

mount(form, formGroupNumber);
mount(form, formGroupDate);
mount(form, formGroupCode);
mount(form, formGroupEmail);
mount(form, btn);
mount(container, title);

mount(container, form);

mount(document.body, container);


form.addEventListener('submit', event => {
  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  }
  form.classList.add('was-validated')
}, false)

let validNumber = false;
let validCVC = false;
let validDate = false;
let validEmail = false;


form.addEventListener('validInput', (e) => {
  switch (e.target.name) {
    case 'email':
      validEmail = true;
      break;
    case 'CVC':
      validCVC = true;
      break;
    case 'numberCard':
      validNumber = true;
      break;
    case 'date':
      validDate = true;
      break;

    default:
      break;
  }
  validForm();

})

function validForm() {
  if (validEmail && validDate && validCVC && validNumber) {
    btn.removeAttribute("disabled");
  }
  else {
    btn.setAttribute("disabled", "true");
  }
}

form.addEventListener('chipset', (e) => {

  const imageName = e.detail.name;
  let pathImg = '';
  switch (imageName) {
    case 'MIR':
      pathImg = mir
      break;
    case 'JCB':
      pathImg = jsb
      break;
    case 'DINERS CLUB':
      pathImg = diners;
      break;
    case 'AMERICAN EXPRESS':
      pathImg = aexp
      break;
    case 'MASTERCARD':
      pathImg = mastercard;
      break;
    case 'Discover':
      pathImg = discover;
      break;
    case 'Maestro':
      pathImg = maestro;
      break;
    case 'China UnionPay':
      pathImg = UnionPay;
      break;
    case 'УЭК':
      pathImg = 'УЭК'
      break;
      case 'VISA':
        pathImg = visa;
        break;

    default:
      break;
  }
  const img = new ImageIcon(imageName, pathImg)
  mount(form, img)
})

