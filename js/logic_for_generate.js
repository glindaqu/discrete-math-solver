// все возможные операции
let operations = ['∧', '∨', '→', '↔'];

// функция, возвращающая случайное значение из массива
const getRandomElement = (arr, len) => arr[Math.floor(Math.random() * len)];

// случайное дополнение отрицанием
const getInversion = () => Math.random() * 2 > 1 ? '¬' : ``;

// функция, определяющая необходимость наличия скобок
const isExpression = () => Math.random() * 2 > 1;

// основная функция
const main = (dificult, variables) => {
    let res = '';
    for (i = 0; i < dificult; i++) {
        // если строка - выражение, то генерирем выражение по паттерну
        // переменная + действие + переменная
        if (isExpression()) {
            res += `(${getInversion() + getRandomElement(variables, variables.length)}`;
            res += ` ${getRandomElement(operations, operations.length)} `;
            res += `${getInversion() + getRandomElement(variables, variables.length)})`;

        }
        // иначе просто вставляем в переменную
        else {
            res += getInversion() + getRandomElement(variables, variables.length);
        }

        // неободимость наличия скобок
        if (i > 0 && i < dificult - 1 && isExpression()) {
            res = `(${res})`;
        }

        if (i !== dificult - 1) {
            res += ' ' + getRandomElement(operations, operations.length) + ' ';
        }
    }
    return res;
};


// вешаем обработчик события на соответствующие элеменьты
$('.calc').on('click', () => {
    let dificult = Number($('.dificult').val());
    let variables = $('.variables').val().replaceAll(" ", "").split(",");

    // вывод результата
    $('.res__data').val(main(dificult, variables));
});

