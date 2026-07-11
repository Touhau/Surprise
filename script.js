const CORRECT_CODE = "1234"; // Правильный код доступа

const inputs = document.querySelectorAll('.code-input');
const checkBtn = document.getElementById('check-btn');
const message = document.getElementById('message');

// 1. Управление фокусом при вводе
inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        input.classList.remove('error');

        if (e.target.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    // Шаг назад при нажатии Backspace
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

// 2. Функция проверки кода
function checkCode() {
    let enteredCode = "";
    inputs.forEach(input => enteredCode += input.value);

    // Сброс предыдущих стилей
    document.body.classList.remove('success-bg');
    inputs.forEach(input => input.classList.remove('error'));
    message.className = "";

    if (enteredCode === CORRECT_CODE) {
        document.body.classList.add('success-bg');
        message.textContent = "Доступ разрешен! Код верный.";
        message.classList.add('success-text');
    } else {
        inputs.forEach(input => input.classList.add('error'));
        message.textContent = "Ошибка! Неверный код доступа.";
        message.classList.add('error-text');
    }
}

// Слушатели событий для отправки формы
checkBtn.addEventListener('click', checkCode);

inputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkCode();
    });
});
