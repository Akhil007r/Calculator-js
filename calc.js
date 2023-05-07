class Calculator {
    constructor(previousValAndTxt, currentValAndTxt) {
        this.previousValAndTxt = previousValAndTxt
        this.currentValAndTxt = currentValAndTxt
        this.clear()
    }
    clear() {
        this.currentVal = ''
        this.previousVal = ''
        this.operationVal = ''
    }
    delete() {
        this.currentVal = this.currentVal.toString().slice(0, -1)
    }
    appendNum(number) {
        if (number === '.' && this.currentVal.includes('.')) return
        this.currentVal = this.currentVal.toString() + number.toString()
    }
    chooseOpr(operationVal) {
        if (this.currentVal === '') return
        if (this.previousVal !== '') {
            this.compute()
        }
        this.operationVal = operationVal
        this.previousVal = this.currentVal
        this.currentVal = ''
    }
    compute() {
        let computation
        const prev = parseFloat(this.previousVal)
        const current = parseFloat(this.currentVal)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operationVal) {
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case '/':
                computation = prev / current
                break;
            case '*':
                computation = prev * current
                break;

            default:
                break;
        }
        this.currentVal=computation
        this.operationVal = undefined
        this.previousVal=''
    }
    getDisplayNum(num){
        const StrNum = num.toString()
        const intNum = parseFloat(StrNum.split('.')[0])
        const decimalNum = StrNum.split('.')[1]
        let intDisplay
        if(isNaN(intNum)){
            intDisplay =''
        }else{
            intDisplay = intNum.toLocaleString('en',{maximumFractionDigits:0})
             console.log(intDisplay);

            }
        if(decimalNum != null){
            return `${intDisplay}.${decimalNum}` 
            console.log(`${intDisplay} . ${decimalNum}`);
            
        } else {
            return intDisplay
        }
    }
    updateDisplay(){
        this.currentValAndTxt.innerText = 
        this.getDisplayNum(this.currentVal)
        if(this.operationVal != null){
            this.previousValAndTxt.innerText = 
            `${this.getDisplayNum(this.previousVal)} ${this.operationVal}`
        } else {
            this.previousVal.innerText = ''
        }
    }
}

const numbtns = document.querySelectorAll(".bttn")
const operationbtn = document.querySelectorAll(".opr")
const eql = document.querySelector('.equal')
const del = document.querySelector('.del')
const clear = document.querySelector('.clear')
const previousValAndTxt = document.querySelector('.previous-operand')
const currentValAndTxt = document.querySelector('.current-operand')

const calculator = new Calculator(previousValAndTxt,currentValAndTxt)

numbtns.forEach(button =>{
 button.addEventListener('click',()=>{
    // console.log(button.innerText);
    calculator.appendNum(button.innerText);
    calculator.updateDisplay();
     })
})

operationbtn.forEach( button =>{
    button.addEventListener('click',()=>{
        calculator.chooseOpr(button.innerText);
        calculator.updateDisplay();
    })
})

eql.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay();
})
del.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay();
})
clear.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplay();
})