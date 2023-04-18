import { el, mount } from "redom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './validateCard.js';
import './style.css';

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
    this.el = el("image.card__chipset", {
      width: "50",
      height: '50',
      alt:alt,
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
    case 'cvc':
      validEmail = true;
      break;
    case 'number':
      validEmail = true;
      break;
    case 'date':
      validEmail = true;
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
  alert(imageName)
  let pathImg = '';
  switch (imageName) {
    case 'MIR':
      pathImg = './assets/images/mir.svg'
      break;
    case 'JCB':

      break;
    case 'DINERS CLUB':

      break;
    case 'AMERICAN EXPRESS':

      break;
    case 'MASTERCARD':

      break;
    case 'Discover':

      break;
    case 'Maestro':

      break;
    case 'China UnionPay':

      break;
    case 'УЭК':

      break;

    default:
      break;
  }
  const img = new ImageIcon(imageName,pathImg)
  mount(form,img)
})

