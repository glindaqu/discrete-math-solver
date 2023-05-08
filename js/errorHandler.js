// массив, сдержащий возможные переменные 
const ABC = ["a", "b", "c"];

// массив, сдержащий возможные действия 
const cannotToReplyAct = ["∨", "∧", "↔", "→"]

// функция, проверяющая возможность решения выражения
const checkForValid = v => {
    for (let i = 0; i < v.length - 1; i++) {
        // если оба символа строки, идущие подряд, являются действиями, то возвращаем false
        if (cannotToReplyAct.includes(v[i]) && cannotToReplyAct.includes(v[i+1])) {
            return false;
        }

        // если оба символа строки, идущие подряд, являются переменными, то возвращаем false
        else if (ABC.includes(v[i]) && ABC.includes(v[i+1])) {
            return false;
        }
    }
    // иначе возвращаем true
    return true;
}

// обработчик события нажатия на кнопку клавиатуры
const clickHandler = () => {
    
    let v = exp.value;

    // проверяем наличие скобок в выражении
    if (v.includes("(") || v.includes(")")) {
        
        // распаковываем строку и смотрим на количество скобок
        // количество каждого вида скобок должно быть одинаковым
        // так как существует как зыкрывающая так и открывающая
        if ([...v].filter(x => x === "(").length % 2 !== [...v].filter(x => x === ")").length % 2) {
            exp.classList.add("error");
            exp.classList.remove("focus")
            return;
        }
    }

    // убираем все лишние символы, не играющие роль в последовательности
    v = v.replaceAll("(", " ");
    v = v.replaceAll(")", " ");
    v = v.replaceAll("¬", " ");
    v = v.replaceAll(" ", "");

    // если первый символ получившейся строки - переменная
    // и последний символ строки - переменная
    // и выражение валидно, то удаляем красную обводкуполя ввода
    if (ABC.includes(v[0]) && checkForValid(v) && ABC.includes(v[v.length - 1])) {
        exp.classList.remove("error");
        exp.classList.add("focus");
    }
    // иначе - выражение некорректно. Подсвечиванием поле красным
    else {
        exp.classList.add("error");
        exp.classList.remove("focus")
    }
}

// вешаем обработчик события нажатия на каждую кнопку клавиатуры
document.querySelectorAll(".mini_btn").forEach(el => {
    el.addEventListener("click", clickHandler);
})