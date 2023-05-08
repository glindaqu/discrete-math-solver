// регулярное выражение, для вычленения выражения из скобок
// вложенность скобок так же учитывается
let reg = /\(([^()]*)\)/g;

// создание ассоциативного массива, для хранения результатов работы функций
let arr = new Map();

// количество простых выражений внутри сложного
let count = null;

// функция, для генерации случайной строки заданной длинны
function makeRandStr(length) {
    // переменная с результатом генерации
    let result = '';

    // перечень всех возможных символов в строке
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // длинна перечня всех символов
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        // выбор случайного символа из перечня и добавление его в строку с результатом
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    // вызврат результата
    return result;
}


// функция для получения всех возможных комбинаций "0" и "1" для неопределенного кол-ва переменных
function getArrOfValues(exp, variables) {

    // variables - массив, со всеми переменными исходного выражения
    // exp - само исходное выражение 

    // массив с результатом
    let res = [];

    // цикл, в котором выражение конвертируется в таблицу истинности необходимого размера
    // для получения всех возможных расстоновок 0 и 1 n раз, необходимо возвести 2 в n степень
    for (let i = 0; i < Math.pow(2, variables.length); i++) {

        // добавляем в массив с результатом двоичное представление каждого числа от 0 до 2 в степени n
        // если же длинна получившегося числа меньше количества перемнных
        // то необходимо дополнить строку нулями
        res.push(i.toString(2).length === variables.length
            ? i.toString(2)
            : "0".repeat(variables.length - i.toString(2).length) + i.toString(2));
    }

    // возврат результата
    return res;
}


// функция для получения значения данного выражения
function getValue(exp, firstExp) {

    // получение массива всех еременных выражения, путем вычлинения их из исходного выражения
    // вычленяются все символы английского алфавита от a до u, при это повторения игнорируются 
    let variables = Array.from(new Set(firstExp.match(/[a-u]/g))).sort();

    // получение исходной таблицы истинности для определенных переменных
    let combinations = getArrOfValues(firstExp, variables);

    // пустой массив с результатом
    let res = [];

    // цикл, заменяющий простые выражения в исходном на сгенерированные случайные строки
    // такая конструкция необходима для того, чтобы избежать путаницы при вычислении итогового значения
    // так как переменные могут входить в строку несколько раз
    // после данной процедуры полученные строки записываются ключами в массив arr,
    // а значениями же становятся замещенные выражения
    for (let j = 0; j<combinations.length; j++) {
        let finalExp = exp;
        for (let i = 0; i < variables.length; i++) {
            finalExp = finalExp.replaceAll(variables[i], combinations[j][i]);
            for (let item of arr.keys()) {
                finalExp = finalExp.replaceAll(item, arr.get(item)[j]);
            }
        }
        // добавление в массив с результатом числового значения вычисленного выражения
        res.push(Number(eval(finalExp)));
    }

    // возврат результата
    return res;
}


// функция для получения значения импликации
function implication(arrOfValues) {

    // массив с результатом
    let middleRes = [];

    // цикл, осуществляющий действие импликации над входным массивом
    // в массив с результатом попадают булевые значения вычисленных выражений
    for (let i = 1; i < arrOfValues.length; i++) {
        for (let j = 0; j < arrOfValues[0].length; j++) {
            if (i === 1) {

                // если массив пуст, то необходимо добавить в него значение
                // действие будет выполнено с 0-ым и 1-ым элементами входного массива
                middleRes.push(Number(Boolean(!arrOfValues[0][j] || arrOfValues[1][j])));

            } else {

                // если же в массиве есть значение, то происходит импликация между 
                // новым значением, взятым из цикла и значением, находящимся в массиве с результатом
                middleRes[j] = Number(Boolean(!middleRes[j] || arrOfValues[i][j]));
                
            }
        }
    }

    // возврат результата
    return middleRes;
}


// функция для получения значения эквиваленции
// реализация сходна с функцией ипликации
function equals(arrOfValues) {
    let middleRes = [];
    for (let i = 1; i < arrOfValues.length; i++) {
        for (let j = 0; j < arrOfValues[0].length; j++) {
            if (i === 1) {
                middleRes.push(Number(Boolean(arrOfValues[0][j] === arrOfValues[1][j])));
            } else {
                middleRes[j] = Number(Boolean(middleRes[j] === arrOfValues[i][j]));
            }
        }
    }
    return middleRes;
}


// основная функция
function main(exp) {
    // замена во входном выражении символов и удаление лишних пробелов
    exp = exp.replaceAll(" ", "");
    exp = exp.replaceAll("∨", "||").replaceAll("∧", "&&");
    exp = exp.replaceAll("+", "||").replaceAll("*", "&&");
    exp = exp.replaceAll("→", "->").replaceAll("↔", "<=>");
    exp = exp.replaceAll("¬", "!");

    // пока существует некая вложенность, программа будет раскладывать выражени, путем
    // вычленения из выражения вложенных скобок
    while(exp.match(reg)) {
        let current = exp.match(reg)[0].replace("(", "").replace(")", "");
        let name = makeRandStr(4);
        arr.set(name, main(current));
        exp = exp.replace("(" + current + ")", name);
    }

    // если есть и эквиваленция и импликация

    // разделяем входное выражение по искомому знаку и выполняем простые действия (конъюнкция, дизъюнкция)
    if (exp.includes("<=>") && exp.includes("->")) {
        let withoutEqual = exp.split("<=>");
        let res = [], withoutImplication = [], resWithoutImplication = [],
            resWithoutEqual = [], newWithoutEqual = [];

        for (let item of withoutEqual) {
            if (item.includes("->")) {
                for (let i of item.split("->")) {
                    withoutImplication.push(i);
                }
            } else {
                newWithoutEqual.push(item);
            }
        }

        for (let item of withoutImplication) {
            resWithoutImplication.push(getValue(item, count?count:exp));
        }

        for (let item of newWithoutEqual) {
            resWithoutEqual = getValue(item, count?count:exp);
        }

        let resI = implication(resWithoutImplication);
        res.push(resI, resWithoutEqual);
        return equals(res);

    }

    // только эквиваленция
    else if (exp.includes("<=>")) {
        let withoutEqual = exp.split("<=>");
        let resWithoutEqual = [];

        for (let item of withoutEqual) {
            resWithoutEqual.push(getValue(item, count?count:exp));
        }
        return equals(resWithoutEqual);

    }

    // только импликация
    else if (exp.includes("->")) {
        let withoutImplication = exp.split("->");
        let resWithoutImplication = [];

        for (let item of withoutImplication) {
            resWithoutImplication.push(getValue(item, count?count:exp));
        }

        return implication(resWithoutImplication);

    }

    // нет ни эквиваленции, ни импликации
    else {
        return getValue(exp, count?count:exp);
    }
}

// функция, вызываемая по нажатию на кнопку "вычислить"
function final(exp) {
    arr = new Map();
    count = exp;
    return main(exp);
}

// вешаем обработчки события на соответствующие кнопки на странице
$('.calc, .enter').on('click', () => {

    // если выражение не соответствует паттерну, то сообщаем пользователю об ошибке
    if (document.querySelector(".expression").classList.contains("error")) {
        alert("fix all errors in expression before calculate it");
        return;
    }

    // получение выражения из поля для ввода
    let exp = $('.expression').val();
    let res = final(exp);
    $('.res__data').empty();

    // вывод результата функции
    for (let item of res) {
        $('.res__data').append(`<tr><td><p class="res__item">${item}</p></td></tr>`);
    }
});

