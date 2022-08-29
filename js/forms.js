function checkForm(phone, mail) {
    if (!checkFormValidity(phone, mail)) {
        return false;
    } else {
        alert('Заказ отправлен!')
        return true;
    }
};

function checkFormValidity(phone, mail) {
    let phoneVal, mailVal;

    if (phone !== null) {
        phoneVal = phone.value

        if (phoneVal.length < 11 || !validatePhone(phoneVal)) {
            alert('Неправильный формат ввода телефона!');
            return false;
        } else {
            return true;
        }

    } else if (mail !== null) {
        mailVal = mail.value

        if (!validateEmail(mailVal)) {
            alert('Неправильный формат ввода электронного адреса!');
            return false;
        } else {
            return true;
        }
    } 

    function validatePhone(phone) {
        let reg = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/;
        return reg.test(String(phone));
    }

    function validateEmail(email) {
        let reg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
        return reg.test(String(email));
    }
};