class Thread {
    constructor(payload) {
        this._validate(payload);

        const { id, title, body, date, username, comments } = payload;
        this.id = id;
        this.title = title;
        this.body = body;
        this.username = username;
        this.date = date;
        this.comments = comments;
    }

    _validate({ id, title, body, date, username, comments }) {

        if (!id || !title || !body || !username || !date || !comments) {
            throw new Error('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (
            typeof id !== 'string' || typeof title !== 'string' ||
            typeof body !== 'string' || typeof date !== 'string' ||
            typeof username !== 'string' || !Array.isArray(comments)
        ) {
            throw new Error('THREAD.WRONG_DATA_TYPE');
        }
    }
}

module.exports = Thread;
