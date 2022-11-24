const inputs = document.querySelectorAll('input');

const patterns = {
    username: /^[a-zA-Z\d]{5,12}$/,
    email: /([a-z\d-\.]+)@([a-z\d-]+)\.([a-z]+)(\.[a-z]+)*$/,
    telephone: /^\d{11}$/,
    password: /^[\w!@#$%^&*()]{8,20}$/
}

function validate(field, regex) {
    if (regex.test(field.value)) {
        field.setAttribute('id', 'valid');
    } else {
        field.setAttribute('id', 'invalid');
    }
}

inputs.forEach(input => {
    input.addEventListener('keyup', (e) => {
        validate(e.target, patterns[e.target.attributes.name.value]);
    })
})