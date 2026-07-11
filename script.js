const CORRECT_CODE = "1234"; // Правильный код доступа

const inputs = document.querySelectorAll('.code-input');
const checkBtn = document.getElementById('check-btn');
const message = document.getElementById('message');

const hintButtons = document.querySelectorAll('.hint-btn');
const hintTexts = document.querySelectorAll('.hint-text');
const hintDisplay = document.getElementById('hint-display');

// 1. Логика работы кнопок подсказок (исправленная ошибка с classList)
hintButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const isCurrentActive = btn.classList.contains('active');

        // Сбрасываем активный статус у всех кнопок и текстов
        hintButtons.forEach(b => b.classList.remove('active'));
        hintTexts.forEach(t => t.classList.remove('active'));

        if (!isCurrentActive) {
            // Если кнопка не была активна, активируем её и её текст
            btn.classList.add('active');
            hintTexts[index].classList.add('active'); // Ошибка была здесь (исправлено на classList.add)
            hintDisplay.classList.add('show');
        } else {
            // Если кнопка уже была открыта — просто закрываем панель
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
        message.textContent = "Доступ разрешен! Код верный.";
        message.classList.add('success-text');
    } else {
        inputs.forEach(input => input.classList.add('error'));
        message.textContent = "Ошибка! Неверный код доступа.";
        message.classList.add('error-text');
    }
}

checkBtn.addEventListener('click', checkCode);

inputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkCode();
    });
});
