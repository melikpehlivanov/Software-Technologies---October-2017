function solve(args){
    let firstNumber = Number(args[0]);
    let secondNumber = Number(args[1]);

    if (secondNumber >= firstNumber){
        let result = firstNumber * secondNumber;
        console.log(result);
    } else {
        let result = firstNumber / secondNumber;
        console.log(result);
    }
}