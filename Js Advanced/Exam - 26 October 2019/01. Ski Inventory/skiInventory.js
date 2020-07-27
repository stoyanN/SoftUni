function solve() {
    let availableProducField = document.querySelector("#products > ul");
    let name = document.querySelector("#add-new > input[type=text]:nth-child(2)");
    let quantity = document.querySelector("#add-new > input[type=text]:nth-child(3)");
    let price = document.querySelector("#add-new > input[type=text]:nth-child(4)");
    let addBtn = document.querySelector("#add-new > button");
    let total = 0;
    let buyBtn = document.querySelector("#myProducts > button");

    buyBtn.addEventListener("click", function () {
        Array.from(document.querySelector("#myProducts > ul").children).forEach(a => document.querySelector("#myProducts > ul").removeChild(a));
        total = 0;
        document.querySelector("body > h1:nth-child(4)").textContent = `Total Price: ${total.toFixed(2)}`;

    })

    let filterBtn = document.querySelector("#products > div > button");

    addBtn.addEventListener("click", function (a) {
        let qty = quantity.value;
        let prc = price.value;
        let nm = name.value;

        a.preventDefault();
        if (nm !== '' && (!isNaN(Number(qty))) && (!isNaN(Number(prc)))) {
            let li = document.createElement("li");
            let span = document.createElement("span");
            span.textContent = nm;

            let strong = document.createElement("strong");
            strong.textContent = `Available: ${Number(qty)}`;

            let div = document.createElement("div");


            let priceStrong = document.createElement("strong");
            priceStrong.textContent = `${Number(prc).toFixed(2)}`;
            div.appendChild(priceStrong);


            let addToChartBtn = document.createElement("button");
            addToChartBtn.textContent = `Add to Client's List`;

            addToChartBtn.addEventListener("click", function () {
                let nLI = document.createElement("li");
                nLI.textContent = `${nm}`;
                let nStrong = document.createElement("strong");
                nStrong.textContent = `${Number(prc).toFixed(2)}`;

                total += Number(prc);
                strong.textContent = `Available: ${Number(--qty)}`;

                if (qty <= 0) {
                    availableProducField.removeChild(li);
                }

                document.querySelector("body > h1:nth-child(4)").textContent = `Total Price: ${total.toFixed(2)}`;


                nLI.appendChild(nStrong);

                document.querySelector("#myProducts > ul").appendChild(nLI);
            });


            div.appendChild(addToChartBtn);

            li.appendChild(span);
            li.appendChild(strong);
            li.appendChild(div);

            availableProducField.appendChild(li);

            name.value = '';
            quantity.value = '';
            price.value = '';
        }
    })

    filterBtn.addEventListener("click", function () {
        let products = Array.from(document.getElementsByTagName("li"));
        let filterCriteria = document.getElementById("filter").value;
        let regEx = new RegExp(filterCriteria, "gim");

        products.forEach(a => {
            if (!a.children[0].textContent.match(regEx)) {
                a.style.display = 'none';
            }
        });
    });

}