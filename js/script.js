let change = eval(localStorage.getItem("isChange"));

const pasteFromBuffer = document.querySelector(".copy_paste__btn");
const textareaPaste = document.querySelector(".res__data");

let condition = true;

if (localStorage.getItem("bg-color")) {
    $('body').css('background-color', localStorage.getItem("bg-color"));
    $('body, .variables, .dificult, .subtitle, .calc').css('color', localStorage.getItem("text-color"));
    change = localStorage.getItem("isChange");
}

const playScale = selector => {
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
};

const switchTheme = () => {
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
};

const CopyText = () => {
    let area = document.querySelector('.res__data');
    area.select();
    document.execCommand("copy");
};

const PasteText = async event => {
    textareaPaste.value = await navigator.clipboard.readText();
    $(".expression").val(textareaPaste.value);
};

const openClose = condition => {
    anime({
        targets: '.menu',
        translateX: condition ? ['-100%', '0'] : ['0', '-100%'],
        easing: 'easeInOutQuad',
        direction: 'alternate',
        duration: 750,
        loop: false
    });

    anime({
        targets: '.open_btn',
        rotate: condition ? ['0', '450'] : ['450', '0'],
        opacity: ['1', '0.2', '1'],
        easing: 'easeInOutQuad',
        direction: 'alternate',
        duration: 900,
        loop: false
    });

    $('.stick').css("background", condition
        ? "rgba(0,0,0, 0.6)"
        : "linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.37))");
}

try {
    pasteFromBuffer.addEventListener("click", PasteText, false);
}

catch {

}

$('.owl').on('click', () => {
    playScale("owl");
    //switchTheme();
});

$('.open_btn').click(() => {
    openClose(condition);
    condition = !condition;
});

$('.menu').click(() => {
    if (window.matchMedia('(max-width: 768px)').matches) {
        openClose(condition);
        condition = !condition;
    }
});

if (window.matchMedia('(max-width: 423px)').matches) {
    $('.res').html('<p class="subtitle__res">Результат:<br><img class="copy_paste__btn" src="images/copy.png" onClick="CopyText()"></p>');
}