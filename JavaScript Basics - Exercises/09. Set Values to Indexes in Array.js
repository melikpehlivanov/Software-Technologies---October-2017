function solve(args) {
    let len = Number(args[0]);
    let array = [];

    for(let i = 0; i < len; i++){
        array.push(0);
    }

    for(let i = 1; i < args.length; i++) {
        let data = args[i].split(' ');
        let index = Number(data[0]);

        if(index in array){
            array[index] = Number(data[2]);
        }
    }
    console.log(array.join("\n"));
}