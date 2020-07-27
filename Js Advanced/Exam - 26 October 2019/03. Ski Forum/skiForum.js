class Forum {
    constructor() {
        this._users = [];
        this._questions = [];
        this._id = 1;
    }

    register(username, password, repeatPassword, email) {
        if (!username || !password || !repeatPassword || !email) {
            throw new Error(`Input can not be empty`);
        }

        if (password !== repeatPassword) {
            throw new Error(`Passwords do not match`);
        }

        if (this._users.find(a => a.username === username) || this._users.find(a => a.email === email)) {
            throw new Error(`This user already exists!`);
        }

        this._users.push({ username, email, password });

        return `${username} with ${email} was registered successfully!`;
    }

    login(username, password) {
        let findUser = this._users.find(a => a.username === username);

        if (!findUser) {
            throw new Error(`There is no such user`);
        }

        if (findUser.username === username && findUser.password === password) {
            findUser["loggedIn"] = true;

            return `Hello! You have logged in successfully`;
        }
    }

    logout(username, password) {
        let findUser = this._users.find(a => a.username === username);

        if (!findUser) {
            throw new Error(`There is no such user`);
        }

        if (findUser.username === username && findUser.password === password && findUser.loggedIn === true) {
            findUser.loggedIn = false;

            return `You have logged out successfully`;
        }
    }

    postQuestion(username, question) {
        let findUser = this._users.find(a => a.username === username);

        if (!findUser || findUser.loggedIn !== true) {
            throw new Error(`You should be logged in to post questions`);
        }

        if (!question) {
            throw new Error(`Invalid question`);
        }

        this._questions.push({ id: this._id, question: question, username: username, answers: [] });
        this._id++;

        return `Your question has been posted successfully`;
    }

    postAnswer(username, questionId, answer) {
        let findUser = this._users.find(a => a.username === username);

        if (!findUser || findUser.loggedIn !== true) {
            throw new Error(`You should be logged in to post answers`);
        }

        if (!answer) {
            throw new Error(`Invalid answer`);
        }



        let findQuestion = this._questions.find(a => a.id === questionId);

        if (!findQuestion) {
            throw new Error(`There is no such question`);
        }

        findQuestion.answers.push({ username, answer });

        return `Your answer has been posted successfully`;

    }

    showQuestions() {
        let output = '';

        Object.values(this._questions).forEach(a => {
            let [id, question, username, answers] = Object.values(a);

            output += `Question ${id} by ${username}: ${question}\n`;

            answers.forEach(b => {
                output += `---${b.username}: ${b.answer}\n`;
            });
        });

        return output.trim();
    }
}