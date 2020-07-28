function solution(a) {
    let test = {
        upvote: () => this.upvotes++,
        downvote: () => this.downvotes++,
        score: () => {
            let totalVotes = this.upvotes + this.downvotes;
            let totalScore = this.upvotes - this.downvotes;
            let eventualSum = 0;
            let rating = '';

            if (totalVotes > 50) {
                eventualSum = Math.ceil(0.25 * Math.max(this.upvotes, this.downvotes));
            }

            if ((this.upvotes > 0.66 * totalVotes) && totalVotes > 10) {
                rating = 'hot';
            }
            else if (totalVotes > 100 && totalScore >= 0) {
                rating = 'controversial';
            }
            else if (totalScore < 0 && totalVotes >= 10) {
                rating = 'unpopular';
            }

            if (rating === '' || totalVotes < 10) {
                rating = 'new';
            }

            let arrToPrint = [];
            let positive = this.upvotes + eventualSum;
            let negative = this.downvotes + eventualSum;
            let status = this.upvotes - this.downvotes;
            arrToPrint.push(positive);
            arrToPrint.push(negative);
            arrToPrint.push(status);
            arrToPrint.push(rating);


            return arrToPrint;
        }
    }


    return test[a]();
}