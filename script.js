class Calculator {

    constructor(previousNumber, currentNumber) {
        this.previousNumber = previousNumber;
        this.currentNumber = currentNumber;
        this.clear();
    }

    clear() {
        this.currentTempNumber = '';
        this.previousTempNumber = '';
        this.tempOperator = '';
    }

    append(number) {
        if (number == '.' && this.currentTempNumber.toString().includes('.')) return
        this.currentTempNumber = this.currentTempNumber.toString() + number.toString();

    }
    delete() {
        this.currentTempNumber = this.currentTempNumber.toString().slice(0, -1);
    }

    chooseOperator(o) {
        if (this.currentTempNumber == '') return;
        if (this.tempOperator != '') {
            this.equals();
        }
        this.tempOperator = o;
        this.previousTempNumber = this.currentTempNumber;
        this.currentTempNumber = '';
    }

    beforeDisplay(number){
        const stringNumber = number.toString();
        let integerNumber = parseFloat(stringNumber.split('.')[0])
        let decimalNumber = stringNumber.split('.')[1]
        if(isNaN(integerNumber)){
            integerNumber = '';
        }
        else{
            integerNumber = integerNumber.toLocaleString();
        }
        if (decimalNumber != null) {
            return `${integerNumber}.${decimalNumber}`
          } else {
            return integerNumber
          }
    }

    display() {
        this.currentNumber.innerText = this.beforeDisplay(this.currentTempNumber)
        if (this.tempOperator != null) {
            this.previousNumber.innerText = (this.beforeDisplay(this.previousTempNumber) + " " + this.tempOperator)
        } else {
            this.previousNumber.innerText = '';
        }
    }

    equals() {
        let computation
        const prev = parseFloat(this.previousTempNumber)
        const current = parseFloat(this.currentTempNumber)
        if (isNaN(prev) || isNaN(current)) return

        switch (this.tempOperator) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '??':
                if(current == 0){
                    computation = 0; 
                }else{
                    computation = prev / current;
                }
                break;
            default:
                return;
        }
        this.currentTempNumber = computation;
        this.tempOperator = '';
        this.previousTempNumber = '';
    }

}
const numbersButtons = Array.from(document.getElementsByClassName("number"));
const operatorsButtons = Array.from(document.getElementsByClassName("operator"));
const previousNumber = document.getElementsByClassName("previous-number")[0];
const currentNumber = document.getElementsByClassName("current-number")[0];
const del = document.getElementById("delete");
const clear = document.getElementById("clear");
const equals = document.getElementById("equals");


const calculator = new Calculator(previousNumber, currentNumber);


numbersButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.append(button.innerText)
        calculator.display();
    })

})
operatorsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText)
        calculator.display();
    })
})
equals.addEventListener('click', () => {
    calculator.equals();
    calculator.display();
})

del.addEventListener('click', () => {
    calculator.delete();
    calculator.display();
})

clear.addEventListener('click', () => {
    calculator.clear();
    calculator.display();
})