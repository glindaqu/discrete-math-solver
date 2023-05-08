
// вывод оповещения об обновлении, если версия пользователя и сервера не совпадают
function whatsNew() {
    alert("Добавлена экранная клавиатура для удобства ввода\nДобавлена проверка ввода при решении задач");
}

// загрузка файла с версией
$.getJSON("../data.json", data => {
    if (localStorage.getItem("version") != data.version) {
        whatsNew();
        localStorage.clear();
        localStorage.setItem("version", data.version);
    } 
});

// вешаем обработчик события загрузки страницы
document.addEventListener("DOMContentLoaded", () => {
    $('body, .variables, .dificult, .subtitle, .calc, .expression, input.res__data').css('color', localStorage.getItem("text-color"));
});