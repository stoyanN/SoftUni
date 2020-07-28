function gladiator(input) {
    let inventory = input.shift().split(' ');
    let commands = input.slice();


    for (let i = 0; i < commands.length; i++) {
        let current = commands[i].split(' ');
        let action = current[0];
        let equipment = current[1];

        if (action === 'Buy') {
            if (!ifExist(equipment)) {
                inventory.push(equipment);
            }
        }
        else if (action === 'Trash') {
            if (ifExist(equipment)) {
                inventory.splice(getIndex(equipment), 1);
            }
        }
        else if (action === 'Repair') {
            if (ifExist(equipment)) {
                let n = String(inventory.splice(getIndex(equipment), 1));
                inventory.push(n);
            }
        }
        else if (action === 'Upgrade') {
            let weapons = equipment.split('-');
            equipment = weapons[0];
            let eqUpgrade = weapons[1];

            if (ifExist(equipment)) {
                let elemToInclude = `${equipment}:${eqUpgrade}`;
                let indexNew = getIndex(equipment) + 1;

                inventory.splice(indexNew, 0, elemToInclude);
            }
        }

    }

    function ifExist(item) {
        return inventory.includes(item);
    }

    function getIndex(item) {
        return inventory.indexOf(item);
    }

    console.log(inventory.join(' '));

}