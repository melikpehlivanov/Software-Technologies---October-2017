function solve(args) {
    let firstNum = Number(args[0]);
    let secondNum = Number(args[1]);
    let thirdNum = Number(args[2]);

    let result = firstNum * secondNum * thirdNum;
    if (result>=0){
        console.log("Positive")
    } else{
        console.log("Negative")
    }
}