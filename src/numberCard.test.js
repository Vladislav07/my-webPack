const {
  symbolIsNumber,
  numberCardValidate,
  templateCardNumber,
  templateCVC,
  CustomInput,
} = require('./numberCard.js');

import { el, mount } from 'redom';
//cardNumber

test('Валидация номера карты не пропускает некорректный номер карты', () => {
  const str = '0000000000000000';
  const result = numberCardValidate(str);
  expect(result.is_valid).toBeFalsy;
});

test('Валидация номера карты  пропускает корректный номер карты', () => {
  const str = '4569872213133159';
  const result = numberCardValidate(str);
  expect(result.is_valid).toBeTruthy;
});

test('Валидация номера карты не пропускает произвольную строку, содержащую любые нецифровые символы', () => {
  const str = '12345h56е564_236';
  const result = str.split('').filter(symbolIsNumber).join('');
  expect(result).toMatch(new RegExp(/[0-9]*/));
});

test('Валидация номера карты не пропускает строку с недостаточным количеством цифр', () => {
  const str = '12345565';
  const inputMock = document.createElement('input');
  inputMock.value = str;
  const matches = templateCardNumber(inputMock);
  expect(matches.value.length).toBeLessThan(16);
});

test('Валидация номера карты не пропускает строку со слишком большим количеством цифр', () => {
  const str = '1234556589695944445840';
  const inputMock = document.createElement('input');
  inputMock.value = str;
  const matches = templateCardNumber(inputMock);
  expect(matches.value.length).toBeGreaterThan(16);
});

//cardCVC

test('Валидация CVV/CVC пропускает строку с тремя цифровыми символами.', () => {
  const str = '123';
  const inputMock = document.createElement('input');
  inputMock.value = str;
  const matches = templateCVC(inputMock);
  expect(matches.value).toMatch(new RegExp(/[0-9]/));
  expect(matches.value.length).toBe(3);
});

test('Валидация CVV/CVC не пропускает строки с 4+ цифровыми символами.', () => {
  const str = '12358999';
  const inputMock = document.createElement('input');
  inputMock.value = str;
  const matches = templateCVC(inputMock);
  expect(matches.value.length).not.toBeGreaterThan(3);
});

test('Валидация CVV/CVC не пропускает строки с тремя нецифровыми символами (латиница, кириллица и знаки препинания).', () => {
  const str = '123';
  const result = str.split('').filter(symbolIsNumber).join('');
  expect(result).toMatch(new RegExp(/[0-9]/));
});

//RenderInput

test('Функция создания DOM-дерева должна вернуть DOM-элемент, в котором содержится строго четыре поля для ввода с плейсхолдерами «Номер карты», «ММ/ГГ», CVV/CVC, Email).', () => {
  const ExpectedStrDom =
    '<div><input placeholder="Номер карты"><input placeholder="ММ/ГГ"><input placeholder="CVV/CVC"><input placeholder="Email"></div>';
  const argNumberField = 'Номер карты';
  const argDateField = 'ММ/ГГ';
  const argCVCField = 'CVV/CVC';
  const argEmailField = 'Email';
  let ReceivedStrDom = [
    argNumberField,
    argDateField,
    argCVCField,
    argEmailField,
  ];
  const wrapper = el('div');
  ReceivedStrDom.map((el) => {
    mount(wrapper, new CustomInput(el));
  });
  expect(wrapper.outerHTML).toBe(ExpectedStrDom);
});
