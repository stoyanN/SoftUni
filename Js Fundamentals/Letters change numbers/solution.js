function game(input) {
    let commands = input.split(' ').filter(a => a !== '');
    let total = 0;

    function isUpperCase(symbol) {
        return symbol.toUpperCase() === symbol;
    }

    for (let parts of commands) {
        let currentSum = 0;
        let firstLetter = parts[0];
        let lastLetter = parts[parts.length - 1];
        let num = Number(parts.substring(1, parts.length - 1));

        if (isUpperCase(firstLetter)) {
            let divider = (firstLetter).charCodeAt() % 65 + 1;

            currentSum = num / divider;
        } else {
            let multiplier = (firstLetter).charCodeAt() % 97 + 1;

            currentSum = num * multiplier;
        }

        if (isUpperCase(lastLetter)) {
            let subtractor = (lastLetter).charCodeAt() % 65 + 1;

            currentSum -= subtractor;
        } else {
            let adder = (lastLetter).charCodeAt() % 97 + 1;

            currentSum += adder;
        }

        total += currentSum;
    }

    console.log(total.toFixed(2));
}