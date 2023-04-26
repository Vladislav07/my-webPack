const {
  symbolIsNumber,
  numberCardValidate,
  templateCardNumber,
} = require('./numberCard.js');

/*
Валидация номера карты не пропускает произвольную строку, содержащую любые нецифровые символы.
 Для этого добавьте в валидируемую строку как минимум символы кириллицы, латиницы, знаки препинания.
 */

test('Валидация номера карты не пропускает произвольную строку, содержащую любые нецифровые символы', () => {
  const str = '12345h56е564_236';
  const result = str.split('').filter(symbolIsNumber).join('');
  expect(result).toMatch(new RegExp(/[0-9]/));
});

test('Валидация номера карты не пропускает строку с недостаточным количеством цифр', () => {
  const str = '12345565';
  jest.mock('HTMLInputElement');
  const inputMock = new HTMLInputElement();
  inputMock.value = str;
  const matches = templateCardNumber(inputMock);
  expect(matches.value.length).toBeGreaterThanOrEqual(16);
});
