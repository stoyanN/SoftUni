describe("SkiResort", function () {
    describe("constructor test", function () {
        it("new class", function () {
            let hotel = new SkiResort("hotel");
            let test = JSON.stringify(hotel);
            assert.equal(test, `{"name":"hotel","voters":0,"hotels":[]}`, "[message]");
        });
    });

    it("besthotel getter", function () {
        let hotel = new SkiResort("hotel");
        let test = hotel.bestHotel;

        assert.equal(test, `No votes yet`, "[message]");
    });

    it("besthotel getter with a couple votes", function () {
        let hotel = new SkiResort("hotel");
        hotel.build('Avenue', 5);
        hotel.book('Avenue', 5);
        hotel.leave('Avenue', 3, 3);
        hotel.book('Avenue', 3);
        hotel.leave('Avenue', 3, 0.5);
        let test = hotel.bestHotel;

        assert.equal(test, `Best hotel is Avenue with grade 10.5. Available beds: 3`, "[message]");


    });

    it("build method", function () {
        let hotel = new SkiResort("hotel");

        assert.throws(() => hotel.build('', 2), `Invalid input`, "[message]");
    });

    it("build method test 2", function () {
        let hotel = new SkiResort("hotel");

        assert.throws(() => hotel.build('test', -1), `Invalid input`, "[message]");
    });

    it("build method test 3", function () {
        let hotel = new SkiResort("hotel");
        let test = JSON.stringify(hotel.build("Aqua", 10));

        assert.equal(test, `"Successfully built new hotel - Aqua"`, "[message]");
    });

    it("book method test 1", function () {
        let hotel = new SkiResort("hotel");

        assert.throws(() => hotel.book('', 2), `Invalid input`, "[message]");
    });

    it("book method test 2", function () {
        let hotel = new SkiResort("hotel");

        assert.throws(() => hotel.book('Aqua', -1), `Invalid input`, "[message]");
    });

    it("book method test 3", function () {
        let hotel = new SkiResort("hotel");

        assert.throws(() => hotel.book('Aqua', 1), `There is no such hotel`, "[message]");
    });

    it("book method test 4", function () {
        let hotel = new SkiResort("hotel");
        hotel.build("Aqua", 1);

        assert.throws(() => hotel.book('Aqua', 2), `There is no free space`, "[message]");
    });

    it("book method test 5", function () {
        let hotel = new SkiResort("hotel");
        hotel.build("Aqua", 1);
        let test = hotel.book("Aqua", 1);

        assert.equal(test, `Successfully booked`, "[message]");
    });

    it("leave method test 1", function () {
        let hotel = new SkiResort("hotel");

        assert.throws(() => hotel.leave('', 2), `Invalid input`, "[message]");
    });

    it("leave method test 2", function () {
        let hotel = new SkiResort("hotel");

        assert.throws(() => hotel.leave('', -1), `Invalid input`, "[message]");
    });

    it("leave method test 3", function () {
        let hotel = new SkiResort("hotel");

        assert.throws(() => hotel.leave('Aqua', 1), `There is no such hotel`, "[message]");
    });

    it("leave method test 4", function () {
        let hotel = new SkiResort("hotel");
        hotel.build("Aqua", 3);
        hotel.book("Aqua", 3);
        let test = hotel.leave("Aqua", 3, 3);

        assert.equal(test, `3 people left Aqua hotel`, "[message]");
    });

    it("average grade test 1", function () {
        let hotel = new SkiResort("hotel");
        let test = hotel.averageGrade();

        assert.equal(test, `No votes yet`, "[message]");

    });

    it("average grade test 2", function () {
        let hotel = new SkiResort("hotel");
        hotel.build("Aqua", 3);
        hotel.book("Aqua", 3);
        hotel.leave("Aqua", 3, 3)
        let test = hotel.averageGrade();

        assert.equal(test, `Average grade: 3.00`, "[message]");

    });


});