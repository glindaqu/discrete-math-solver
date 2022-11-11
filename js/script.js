let change = eval(localStorage.getItem("isChange"));

const pasteFromBuffer = document.querySelector(".copy_paste__btn");
const textareaPaste = document.querySelector(".res__data");

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
    } else {
        localStorage.setItem("bg-color", "#e1d9ce");
        localStorage.setItem("text-color", "black");
    }

    localStorage.setItem("isChange", change);

    $('body').css('background-color', localStorage.getItem("bg-color"));
    $('body, .variables, .dificult, .subtitle, .calc, .expression, input.res__data').css('color', localStorage.getItem("text-color"));
    $('body, .variables, .dificult, .subtitle, .calc, .expression, input.res__data').css('transition', '1.5s ease');
}

function CopyText() {
    let area = document.querySelector('.res__data');
    area.select();
    document.execCommand("copy");
}

const PasteText = async event => {
    const clipboardData = await navigator.clipboard.readText();
    textareaPaste.value = clipboardData;
    $(".expression").val(textareaPaste.value);
};

pasteFromBuffer.addEventListener("click", PasteText, false);

$('.owl').on('click', () => {
    playScale("owl");
    switchTheme();
});