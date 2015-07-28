class Person {
    constructor() {

    }

    private doesLike(it)
    {
        return ['apple', 'banana'].indexOf(it) !== -1;
    }

    public eat(it)
    {
        if (doesLike(it)) {
            console.log('Om nom nom');
            return;
        }

        console.log("Yuck! I won't eat this!");
    }
}

var john = new Person();
john.eat('banana');
john.eat('apple');
john.eat('potato');