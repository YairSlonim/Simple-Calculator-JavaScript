class Calculator {
    constructor(previousNumber, currentNumber) {
        this.previousNumber = previousNumber;
        this.currentNumber = currentNumber;
        this.clear()
    }

    clear() {
        this.currentTempNumber = '';
        this.previousTempNumber = '';
        this.tempOperator = '';
    }

    append(number) {
        if (number == '.' && this.currentTempNumber.includes('.')) return
        this.currentTempNumber = this.currentTempNumber.toString() + number.toString();

    }
    delete() {
        this.currentTempNumber = this.currentTempNumber.toString().slice(0, -1);
    }

    chooseOperator(o) {
        if (this.currentTempNumber == '') return;
        this.tempOperator = o;
        this.previousTempNumber = this.currentTempNumber;
        this.currentTempNumber = '';
    }
    display() {
        this.currentNumber.innerText = this.currentTempNumber;
        if (this.tempOperator != null) {
            this.previousNumber.innerText = (this.previousTempNumber + " " + this.tempOperator)
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
            case '÷':
                computation = prev / current;
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