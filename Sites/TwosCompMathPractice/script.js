"use strict"
const { floor, random, round, abs } = Math;
const question = document.getElementById('question')
const generateBtn = document.getElementById('generateBtn')
const solveBtn = document.getElementById('solveBtn')
const table = document.getElementById('table')
const maths = document.getElementById('maths')
let num1, num2, op;

const generateQuestion = () => {

    num1 = -64 + floor(128 * random());
    num2 = floor(64 * random());
    op = ['+', '-'][round(random())]

    question.textContent = `${num1}${op}${num2}`
    table.innerHTML = "";
    maths.innerHTML = "";
    solveBtn.style.display = 'inline-block'

}

const solveQuestion = () => {
    let b1 = addToTable(num1);
    table.innerHTML += "<tr><td colspan='4' style='text-align:left;'>And,</td></tr>"
    let b2 = addToTable(parseInt(`${op}${num2}`));
    table.innerHTML += "<tr><td colspan='4'><hr/></td></tr>"
    table.innerHTML += "<tr><td colspan='4' style='text-align:left;'>Doing the addition, we get:</td></tr>"
    finalize(b1, b2);
    solveBtn.style.display = 'none'
}

const finalize = (b1, b2) => {
    let B = addBinary(b1, b2);
    table.innerHTML += `<tr><td colspan='4'>${b1}<sub>2</sub></td></tr>
     <tr><td colspan='4'>+ ${b2}<sub>2</sub></td></tr>
     <tr><td colspan='4'><hr/></td></tr>`
    if(B.length > 8){
        B = B.substring(1)
        table.innerHTML += `<tr><td colspan='4'> = <del>1</del> ${B}<sub>2</sub></td></tr>`
        maths.innerHTML += `Discarding the carry, we get sum = <b>${B}</b><sub>2</sub>`
    }
    else{
        B = make8bits(B);
        table.innerHTML += `<tr><td colspan='4'> = ${B}<sub>2</sub></td></tr>`
        maths.innerHTML += `We get sum = <b>${B}</b><sub>2</sub>`
    }
    maths.innerHTML += '<br/>'
    if(B[0] == '1'){
        maths.innerHTML += `Since the MSB is 1, the number is <b>negative</b>. So, we do 2's complement to find the value.<br/>${B}<sub>2</sub> &rarr; ${invert(B)}<sub>2</sub> (1's comp.).<br/> Adding 1, we get ${make8bits(addBinary(invert(B), 1))}<sub>2</sub> &rarr; ${parseInt(addBinary(invert(B), 1), 2)} <br/>&there4; The answer is <b>-${parseInt(addBinary(invert(B), 1), 2)}</b>`;
    }
    else{
         maths.innerHTML += `Since the MSB is 0, the number is <b>positive</b>. So, we get ${B}<sub>2</sub> = ${parseInt(B, 2)}<br/>&there4; The answer is <b>${parseInt(B, 2)}</b>`;
    }
}

const make8bits = (bin) => {
    while (bin.length != 8) {
        bin = '0' + bin;
    }
    return bin;
}

const invert = (bin) => {
    bin = bin.replaceAll('1', '*');
    bin = bin.replaceAll('0', '1');
    bin = bin.replaceAll('*', '0');
    return bin;
}

const addBinary = (b1, b2) => {
    let n1 = parseInt(b1, 2);
    let n2 = parseInt(b2, 2);
    return (n1 + n2).toString(2);
}

const addToTable = (num) => {
    if (num >= 0) {
        let bin = num.toString(2);
        bin = make8bits(bin);
        table.innerHTML += `<tr><td>${num}</td><td>=</td><td>${bin}<sub>2</sub></td><td></td></tr>`
        table.innerHTML += `<tr><td></td><td>=</td><td>${bin}<sub>2</sub></td><td>(1's comp.)</td></tr>`
        table.innerHTML += `<tr><td></td><td>=</td><td>${bin}<sub>2</sub></td><td>(2's comp.)</td></tr>`
        return bin;
    }
    else {
        let bin = abs(num).toString(2);
        bin = make8bits(bin);
        table.innerHTML += `<tr><td>${abs(num)}</td><td>=</td><td>${bin}<sub>2</sub></td><td></td></tr>`
        table.innerHTML += `<tr><td>${num}</td><td>=</td><td>${invert(bin)}<sub>2</sub></td><td>(1's comp.)</td></tr>`
        table.innerHTML += `<tr><td></td><td></td><td>+1<sub>2</sub></td><td></td></tr>`
        table.innerHTML += `<tr><td></td><td>=</td><td>${addBinary(invert(bin), `1`)}<sub>2</sub></td><td>(2's comp.)</td></tr>`
        return addBinary(invert(bin), `1`);
    }
}

generateBtn.addEventListener("click", generateQuestion);
solveBtn.addEventListener("click", solveQuestion);