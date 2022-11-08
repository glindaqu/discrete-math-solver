let reg = /\(([^()]*)\)/g;
let arr = new Map();
let count = null;

function makeRandStr(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


// функция для получения всех возможных комбинаций "0" и "1" для неопределенного кол-ва переменных
function getArrOfValues(exp, variables) {
    let res = [];

    for (let i = 0; i < Math.pow(2, variables.length); i++) {
        res.push(i.toString(2).length === variables.length
            ? i.toString(2)
            : "0".repeat(variables.length - i.toString(2).length) + i.toString(2));
    }
    return res;
}


// функция для получения значения данного выражения
function getValue(exp, firstExp) {
    exp = exp.replaceAll("v", "||").replaceAll("∧", "&&");

    let variables = Array.from(new Set(firstExp.match(/[a-u]/g))).sort();
    let combinations = getArrOfValues(firstExp, variables);
    let res = [];

    for (let j = 0; j<combinations.length; j++) {
        let finalExp = exp;
        for (let i = 0; i < variables.length; i++) {
            finalExp = finalExp.replaceAll(variables[i], combinations[j][i]);
            for (let item of arr.keys()) {
                finalExp = finalExp.replaceAll(item, arr.get(item)[j]);
            }
        }
        res.push(Number(eval(finalExp)));
    }
    return res;
}


// функция для получения значения импликации
function implication(arrOfValues) {
    let middleRes = [];
    for (let i = 1; i < arrOfValues.length; i++) {
        for (let j = 0; j < arrOfValues[0].length; j++) {
            if (i === 1) {
                middleRes.push(Number(Boolean(!arrOfValues[0][j] || arrOfValues[1][j])));
            } else {
                middleRes[j] = Number(Boolean(!middleRes[j] || arrOfValues[i][j]));
            }
        }
    }
    return middleRes;
}


// функция для получения значения эквиваленции
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
    exp = exp.replaceAll(" ", "");

    while(exp.match(reg)) {
        let current = exp.match(reg)[0].replace("(", "").replace(")", "");
        let name = makeRandStr(4);
        arr.set(name, main(current));
        exp = exp.replace("(" + current + ")", name);
    }

    // если есть и эквиваленция и импликация
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

function final(exp) {
    arr = new Map();
    count = exp;
    return main(exp);
}

$('.calc').on('click', () => {
    let exp = $('.expression').val();
    let res = final(exp);
    $('.res__data').empty();
    for (let item of res) {
        $('.res__data').append(`<tr><td>${item}</td></tr>`);
    }
});

