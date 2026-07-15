const CORRECT_CODE = "22016960"; // Изменено на 8-значный код

const inputs = document.querySelectorAll('.code-input');
const checkBtn = document.getElementById('check-btn');
const message = document.getElementById('message');

const hintButtons = document.querySelectorAll('.hint-btn');
const hintTexts = document.querySelectorAll('.hint-text');
const hintDisplay = document.getElementById('hint-display');

// 1. Логика работы кнопок подсказок
hintButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const isCurrentActive = btn.classList.contains('active');

        hintButtons.forEach(b => b.classList.remove('active'));
        hintTexts.forEach(t => t.classList.remove('active'));

        if (!isCurrentActive) {
            btn.classList.add('active');
            hintTexts[index].classList.add('active');
            hintDisplay.classList.add('show');
        } else {
            hintDisplay.classList.remove('show');
        }
    });
});

// 2. Управление фокусом при вводе в поля
inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        input.classList.remove('error');

        if (e.target.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

// 3. Функция проверки кода
function checkCode() {
    let enteredCode = "";
    inputs.forEach(input => enteredCode += input.value);

    document.body.classList.remove('success-bg');
    inputs.forEach(input => input.classList.remove('error'));
    message.className = "";

    if (enteredCode === CORRECT_CODE) {
        document.body.classList.add('success-bg');
        message.textContent = "Поздравляем) Открывай ларец, там подарок лежит";
        message.classList.add('success-text');
    } else {
        inputs.forEach(input => input.classList.add('error'));
        message.textContent = "Не нихуя, такими темпами подарок не получишь";
        message.classList.add('error-text');
    }
}

checkBtn.addEventListener('click', checkCode);

inputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkCode();
    });
});
