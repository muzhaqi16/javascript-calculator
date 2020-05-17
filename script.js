$(document).ready(function () {
    const display = $("#display");
    let output = '';
    let operator = '';
    let previousInput = '';
    let firstNumber = '';
    let secondNumber = '';
    let negative = false;
    let decimal = false;
    const re = /[/+=\\*]/;

    //clear the display output on click and all the variables
    $('#clear').on('click', () => {
        display.val('0');
        firstNumber = '';
        secondNumber = '';
        operator = '';
        previousInput = '';
        output = '';
        negative = false;
        decimal = false;
    });
    $('#delete').on('click', () => {
        if (output !== '') {
            output = output.slice(0, -1);
            display.val(output);
        }
    });
    $("#decimal").on('click', () => {
        //add the decimal only once for input
        if (!decimal) {
            output += '.';
            decimal = true;
        }
        display.val(output);
    })
    $('#equals').on('click', () => {
        // console.log('State when entering equal', firstNumber, secondNumber, operator);
        if (firstNumber !== '' && secondNumber !== '') {
            firstNumber = calculate(firstNumber, secondNumber, operator);
            secondNumber = display.val();
        }
        if (secondNumber === '') {
            secondNumber = display.val();
        }
        display.val(calculate(firstNumber, secondNumber, operator));
    });
    $(".operator").on('click', function () {
        //when an operator is clicked 
        //check if the content of output is valid
        //and assign it to number 1
        const currentOperator = $(this).val();

        negative = false;
        //get the value from input and assign it to the appropriate number value
        const number = display.val();

        if (firstNumber === '') {
            firstNumber = number;
        } else if (secondNumber === '' && re.test(number) === false) {
            // if the input from the diplay is not an operator assign it to the second number
            secondNumber = number;
        }
        //if both numbers have been set do a calculation and reset the second number
        if (firstNumber !== '' && secondNumber !== '') {
            firstNumber = calculate(firstNumber, secondNumber, operator);
            secondNumber = '';
        }

        //if the second input is a minus sign don't update the operator
        if (re.test(previousInput) && currentOperator === '-') {
            negative = true;
        } else {
            operator = currentOperator;
        }
        //keep track of the previous imput as well
        previousInput = currentOperator;

        //prepare the display by empting it
        output = '';
        decimal = false;
        // display the operator
        display.val(operator);
    })
    //display the numbers as they are being clicked on the display
    $('.number').on('click', function () {
        //get the value of the number button clicked
        let temp = $(this).val();
        //keep track of the previous input as well
        if (negative) {
            output += '-';
            negative = false;
        }
        if (previousInput === '0' && temp === '0' && decimal === false) {
            previousInput = temp;
            return false
        }
        previousInput = temp;
        //assign that to the number string
        output += temp;
        //display the number
        display.val(output);
    });
});
calculate = (num1, num2, operator) => {
    return eval(`${parseFloat(num1)} ${operator} ${parseFloat(num2)}`)
}