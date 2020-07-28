function task(input) {
    let arr = input.slice();
    let leftD = 0;
    let rigthD = 0;

    for (let i = 0; i < arr.length; i++) {
        let current = arr[i].split(' ').map(Number);
        leftD += current[i];
        rigthD += current[arr.length - 1 - i];
    }

    if (leftD !== rigthD) {
        console.log(arr.join('\n'));
    } else {
        let arrToPrint = arr.map(a => a.split(' ').map(Number))

        for (let j = 0; j < arr.length; j++) {
            let current = arr[j].split(' ').map(Number);

            for (let k = 0; k < current.length; k++) {
                if (j === k) {
                    arrToPrint[j][k] = current[j];
                } else if (k === current.length - 1 - j) {
                    arrToPrint[j][current.length - 1 - j] = current[current.length - 1 - j];
                } else if (j !== k) {
                    arrToPrint[j][k] = leftD;
                }

            }

        }

        arrToPrint.forEach(a => {
            return console.log(a.join(' '));
        });
    }

}