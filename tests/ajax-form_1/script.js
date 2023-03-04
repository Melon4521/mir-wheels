"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#form');
    form.addEventListener('submit', sendForm);

    async function sendForm(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        console.log(error);

        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                form.reset();
                form.classList.remove('_sending');
                console.log('Данные отправлены');
            } else {
                alert('Ошибка')
                form.classList.remove('_sending');
            }
        } else {
            alert('Заполните обязательные поля')
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let i = 0; i<formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);
    
            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.classList.contains('_phone')) {
                if (phoneTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function emailTest(input) { 
        let reg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
        return !reg.test(input.value)
    }   

    function phoneTest(input) {
        let reg = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/;
        return !reg.test(String(input.value));
    }
});