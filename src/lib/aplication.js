export default class BankCardValidator {
    constructor(card_number) {
        if ((card_number) == (undefined)) return ('Card number is not specified.');
        this.card_number = card_number;
    }
    /*
    2-Мир
    3- American Express, JCB International, Diners Club
    ____30,36,38-Diners Club
    ____31,35-JCB International
    ____34,37-American Express
    4- VISA
    5- MasterCard, Maestro
    ____50,56,57,58-Maestro
    ____51,52,53,54,55-MasterCard
    6- Maestro, China UnionPay, Discover
    ____60-Discover
    ____62 - China UnionPay
    ____63, 67 - Maestro
    7-УЭК
    */
    get_chipset() {
        switch (this.card_number.substring(0, 1)) {
            case '2':
                return ('MIR');
            case '3':
                if (this.card_number.substring(0, 2) == ('35')) {
                    return ('JCB');
                } else if (this.card_number.substring(0, 2) == ('30') || this.card_number.substring(0, 2) == ('36')) {
                    return ('DINERS CLUB');
                } else if (this.card_number.substring(0, 2) == ('37')) {
                    return ('AMERICAN EXPRESS');
                } else {
                    return ('UNKNOWN');
                }
            case '4':
                return ('VISA');
            case '5':
                return ('MASTERCARD');
            case '6':
                if (this.card_number.substring(0, 2) == ('60')) {
                    return ('Discover');
                } else if (this.card_number.substring(0, 2) == ('63') || this.card_number.substring(0, 2) == ('67')) {
                    return ('Maestro');
                } else if (this.card_number.substring(0, 2) == ('62')) {
                    return ('China UnionPay');
                } else {
                    return ('UNKNOWN');
                }
            case '7':
                return ('УЭК');
        }
    }


    validate() {
        let arr = (this.card_number + '').split('').reverse().map((x) => parseInt(x));
        let last_digits = arr.splice(0, 1)[0];
        let sum = arr.reduce((account, value, interval) => (interval % 2 !== 0 ? account + value : account + ((value * 2) % 9) || 9), 0);

        sum += last_digits;

        if ((sum) % 10 === 0) {
            return JSON.stringify({
                chipset: (this.get_chipset()),
                card_number: (this.card_number),
                is_valid: (true),
            }, null, 2);
        } else {
            return JSON.stringify({
                chipset: (this.get_chipset()),
                card_number: (this.card_number),
                is_valid: (false),
            }, null, 2);
        }
    }
}