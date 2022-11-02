let change = eval(localStorage.getItem("isChange"));
if (localStorage.getItem("bg-color")) {
    $('body').css('background-color', localStorage.getItem("bg-color"));
    $('body, .variables, .dificult, .subtitle, .calc').css('color', localStorage.getItem("text-color"));
    change = localStorage.getItem("isChange");
}

function playScale(selector) {
    anime({
        targets: `.${selector}`,
        scale: 1.3,
        duration: 350,
        scaleX: [1, 0.8, 1],
        easing: "easeOutCubic",
        loop: false,
        complete: () => {
            anime({
                targets: `.${selector}`,
                scale: 1,
                scaleY: [1, 0.8, 1],
                duration: 350,
                easing: "easeOutCubic",
                loop: false
            });
        }
    });
}

function switchTheme() {
    change = !eval(localStorage.getItem("isChange"));
    if (change) {
        localStorage.setItem("bg-color", "#3812aa98");
        localStorage.setItem("text-color", "rgb(255,255,170)");
    }
    else {
        localStorage.setItem("bg-color", "#e1d9ce");
        localStorage.setItem("text-color", "black");
    }
    
    localStorage.setItem("isChange", change);

    $('body').css('background-color', localStorage.getItem("bg-color"));
    $('body, .variables, .dificult, .subtitle, .calc').css('color', localStorage.getItem("text-color"));
    $('body, .variables, .dificult, .subtitle, .calc').css('transition', '1.5s ease');
    //$('.calc').css('background-color', change ? "" : "rgba(79,69,103, .55)");
}

$('.owl').on('click', () => {
    playScale("owl");
    switchTheme();
});

