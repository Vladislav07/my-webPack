const {
  symbolIsNumber,
  numberCardValidate,
  templateCardNumber,
  OutNumberLessThanCard,
} = require('./numberCard.js');

const cardNumber = document.querySelector('.card__number');
const cardDate = document.querySelector('.card__date');
const cardCVC = document.querySelector('.card__cvc');
const cardEmail = document.querySelector('.card__email');
const messageNumber = document.querySelector('.message__number');
const messageDate = document.querySelector('.message__date');
const messageCVC = document.querySelector('.message__cvc');
const messageEmail = document.querySelector('.message__email');

const eventValid = new Event('validInput', {
  bubbles: true,
  cancelable: true,
});

cardNumber.addEventListener('keypress', function (evt) {
  if (symbolIsNumber(evt)) evt.preventDefault();
});

cardCVC.addEventListener('keypress', function (evt) {
  if (symbolIsNumber(evt)) evt.preventDefault();
});

const maskCardNumber = templateCardNumber(cardNumber);

cardNumber.addEventListener('blur', function () {
  if (maskCardNumber.value.length === 0) {
    cardNumber.classList.add('is-invalid');
    messageNumber.textContent = 'Поле обязательно для заполнения';
    return;
  }

  if (maskCardNumber.value.length > 16) {
    cardNumber.classList.add('is-invalid');
    messageNumber.textContent = 'Внесите полностью номер карты';
    return;
  }

  const res = JSON.parse(numberCardValidate(cardNumber.value));
  if ('chipset' in res === true) {
    const chipset = res.chipset;
    const chipsetEvent = new CustomEvent('chipset', {
      detail: { name: chipset },
      bubbles: true,
      cancelable: true,
    });

    cardNumber.dispatchEvent(chipsetEvent);
  }
  if (res.is_valid) {
    cardNumber.classList.add('is-invalid');
    messageNumber.textContent = 'Некорентный номер банковской карты';
    console.log(res);
    return;
  }

  cardNumber.dispatchEvent(eventValid);
});

cardNumber.addEventListener('focus', function () {
  cardNumber.classList.remove('is-invalid');
  messageNumber.textContent = '';
});

const maskCVC = {
  mask: '000',
};

const maskCardCVC = IMask(cardCVC, maskCVC);

cardCVC.addEventListener('blur', function () {
  const cvcValue = maskCardCVC.value;
  if (cvcValue.length === 0) {
    messageCVC.textContent = 'Поле обязательно для заполнения';
    cardCVC.classList.add('is-invalid');
    return;
  }
  if (cvcValue.length < 3) {
    messageCVC.textContent = 'Нужно ввести 3 цифры';
    cardCVC.classList.add('is-invalid');
    return;
  }

  cardCVC.dispatchEvent(eventValid);
});

cardCVC.addEventListener('focus', function () {
  cardCVC.classList.remove('is-invalid');
  messageCVC.textContent = '';
});

var maskCardDate = IMask(cardDate, {
  mask: 'MM/YY',
  lazy: false,

  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: 23,
      to: 30,
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
});

cardDate.addEventListener('blur', function () {
  const today = new Date();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();
  const inDate = maskCardDate.value;
  const monday = parseInt(inDate.substring(0, 2));
  const year = parseInt(inDate.substring(3));
  if (!monday && !year) {
    cardDate.classList.add('is-invalid');
    messageDate.textContent = 'Поле обязательно для заполнения';
    return;
  }
  if (!year || year < 23) {
    cardDate.classList.add('is-invalid');
    messageDate.textContent = 'Введите дату полностью в формате MM/YY';
    return;
  }
  const yearTodayFormat = todayYear - 2000;
  if (year === yearTodayFormat && monday < todayMonth + 2) {
    cardDate.classList.add('is-invalid');
    messageDate.textContent = 'Карта просрочена!';
    return;
  }
  cardDate.dispatchEvent(eventValid);
});

var regExpMask = new IMask(cardEmail, {
  mask: function (value) {
    if (/^[a-z0-9_\.-]+$/.test(value)) return true;
    if (/^[a-z0-9_\.-]+@$/.test(value)) return true;
    if (/^[a-z0-9_\.-]+@[a-z0-9-]+$/.test(value)) return true;
    if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.$/.test(value)) return true;
    if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(value)) return true;
    if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.$/.test(value)) return true;
    if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.[a-z]{1,4}$/.test(value))
      return true;
    return false;
  },
});

cardDate.addEventListener('focus', function () {
  cardDate.classList.remove('is-invalid');
  messageDate.textContent = '';
});

cardEmail.addEventListener('blur', function () {
  const emailValue = regExpMask.value;
  if (emailValue.length === 0) {
    cardEmail.classList.add('is-invalid');
    messageEmail.textContent = 'Поле обязательно для заполнения';
    return;
  }
  if (!emailValue.includes('@')) {
    messageEmail.textContent = 'Должен присутствовать символ @';
    cardEmail.classList.add('is-invalid');
    return;
  }
  if (emailValue[emailValue.length - 1] === '@') {
    messageEmail.textContent =
      'После символа @ должно быть указано доменное имя сервера';
    cardEmail.classList.add('is-invalid');
    return;
  }
  const pozDog = emailValue.search('@');
  const strAfterDog = emailValue.slice(pozDog);
  if (!strAfterDog.includes('.')) {
    cardEmail.classList.add('is-invalid');
    messageEmail.textContent = "В доменном имени должен быть символ '.'";
    return;
  }
  if (
    strAfterDog[strAfterDog.length - 1] === '.' ||
    strAfterDog[strAfterDog.length - 2] === '.'
  ) {
    cardEmail.classList.add('is-invalid');
    messageEmail.textContent =
      "В доменном имени после '.' должно быть имя зоны, от двух до четырех символов";
    return;
  }
  cardEmail.dispatchEvent(eventValid);
});

cardEmail.addEventListener('focus', function () {
  cardEmail.classList.remove('is-invalid');
  messageEmail.textContent = '';
});
