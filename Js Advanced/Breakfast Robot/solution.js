function solution() {
    let stock = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    }

    return (input => {
        let [command, type, quantity] = input.split(' ');
        quantity = Number(quantity);



        if (command === 'restock') {
            stock[type] += quantity;
            return 'Success';

        }
        else if (command === 'report') {
            return `protein=${stock.protein} carbohydrate=${stock.carbohydrate} fat=${stock.fat} flavour=${stock.flavour}`;
        }
        else if (command === 'prepare') {
            let recipes = {
                apple: [['carbohydrate', 1], ['flavour', 2]],
                lemonade: [['carbohydrate', 10], ['flavour', 20]],
                burger: [['carbohydrate', 5], ['fat', 7], ['flavour', 3]],
                eggs: [['protein', 5], ['fat', 1], ['flavour', 1]],
                turkey: [['protein', 10], ['carbohydrate', 10], ['fat', 10], ['flavour', 10]]
            }

            function isInStock(arr, multiplier) {
                let isEnough = true;
                multiplier = Number(multiplier);

                for (let i = 0; i < arr.length; i++) {
                    let [product, pieces] = arr[i];
                    pieces *= multiplier;

                    if (stock[product] < pieces) {
                        isEnough = false;
                        return `Error: not enough ${product} in stock`;
                    }

                }

                if (isEnough) {
                    for (let i = 0; i < arr.length; i++) {
                        let [product, pieces] = arr[i];
                        pieces *= multiplier;
                        stock[product] -= pieces;
                    }
                    return 'Success';
                }

            }

            return isInStock(recipes[type], quantity);

        }
    })

}