function whatsNew() {
    alert("Меню адаптировано под мобильные устройства \nДобавлена страница 'Контакты' \nВременно удалена возможность смены темы");
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