const db = require("./conn");

class magic {
    constructor(id, question, answer, question_type) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.question_type = question_type;
    }

    static async addData(question, answer, question_type) {
        try {
            const response = await db.one(
                `INSERT INTO magic (question, answer, question_type) VALUES($1, $2, $3);`,
                [question, answer, question_type]
            );
            return response;
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = magic;
