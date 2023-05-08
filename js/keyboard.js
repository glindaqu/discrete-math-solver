// находим элемент поля ввода в иерархии
const exp = document.querySelector(".expression");

// находим элемент клавиатуры в иерархии
const keyboard = document.querySelector(".keyboard");

// создаем обработчик события клика
const onClickEvent = event => {

    // если список классов элемента клавиатуры не содержит класса HIDE
    // то продолжаем выполнение функции
    if (!keyboard.classList.contains("hide")) {

        // если значение кнопки - "очистить", тоочищаем поле для ввода
        if (event.target.innerText === "clean") {
            exp.value = "";
        }

        // если значение кнопки - "удалить последний", то удаляем соответствующий элемент
        else if (event.target.innerText === "del") {
            // обрезаем значение в поле для ввода до последнего символа не включительно, и помещаем обратно
            exp.value = exp.value.substring(0, exp.value.length - 1);
        }

        // если значение нажатой кнопки - "посчитать", то в данной файле ничего не делаем
        else if (event.target.innerText === "enter") {

        }

        // во всех других случаях добавляем значение нажатой кнопки в поле для ввода с помощью конкатенации
        else {
            exp.value += event.target.innerText;
        }
    }
};

// вешаем обработчки события нажатия на все кнопки клавиатуры
document.querySelectorAll(".mini_btn").forEach(element => {
    element.addEventListener("click", onClickEvent);
});

// вешаем обработчик события сокрытия клавиатуры на повторное нажатие по полю для ввода
exp.addEventListener("click", () => {
    keyboard.classList.toggle("hide");
})

// вешаем обработчик события сокрытия клавиатуры на всесоответствующие классу элементы контроля
document.querySelectorAll(".dis_class").forEach(el => {
    el.addEventListener("click", () => {
        keyboard.classList.add("hide");
    })
})