function generator(input) {
    let text = input[0].concat(input[1]).split('');
    let keyword = input[2].split('');

    for (let i = 0; i < text.length; i++) {
        let word = text[i].toUpperCase();

        if (word.charCodeAt() === 65 || word.charCodeAt() === 69
            || word.charCodeAt() === 73 || word.charCodeAt() === 79 ||
            word.charCodeAt() === 85) {
            let key = keyword.shift();
            text[i] = key.toUpperCase();
            keyword.push(key);
        }
    }

    console.log(`Your generated password is ${text.reverse().join('')}`);
}