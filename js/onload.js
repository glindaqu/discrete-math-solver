function whatsNew() {
    alert("Добавлена возможность вычисления только что сгенерированных выражений \nДобавлены кнопки 'копировать' и 'вставить'");
}

$.getJSON("../data.json", data => {
    if (localStorage.getItem("version") != data.version) {
        whatsNew();
        localStorage.setItem("version", data.version);
    } 
});

document.addEventListener("DOMContentLoaded", () => {
    $('body, .variables, .dificult, .subtitle, .calc, .expression, input.res__data').css('color', localStorage.getItem("text-color"));
});