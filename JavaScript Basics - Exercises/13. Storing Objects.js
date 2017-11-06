function solve(args) {

    for (let i = 0; i < args.length; i++) {
        let data = args[i].split(" -> ");
        let object = {name: data[0], age: data[1], grade: data[2]};

        console.log(`Name: ${object.name}`);
        console.log(`Age: ${object.age}`);
        console.log(`Grade: ${object.grade}`);
    }
}