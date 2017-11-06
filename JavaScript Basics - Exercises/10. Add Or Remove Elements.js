function solve(args) {
    let array = [];

    for(let i = 0; i < args.length; i++)
    {

        let data = args[i].split(' ');

        let command = data[0];

        let element = Number(data[1]);

        if(command === "add"){
            array.push(element);

        } else if(command === "remove" && element in array){
            array.splice(element, 1);
        }
    }
    console.log(array.join("\n"));

}