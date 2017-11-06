function solve(args) {

    let key = args[args.length - 1];
    let keyValues = [];

    for (let i = 0; i < args.length - 1; i++)
    {
        let data = args[i].split(' ');

        if(key === data[0]){
            keyValues.push(data[1]);
        }
    }

    if(keyValues.length > 0)
        console.log(keyValues.join("\n"));

     else
     console.log("None");
}


