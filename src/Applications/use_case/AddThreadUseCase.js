const ThreadCreate = require('../../Domains/threads/entities/ThreadCreate');

class AddThreadUseCase {
    constructor({ threadRepository }) {
        this._threadRepository = threadRepository;
    }

    async execute(userId, payload) {
        const thread = new ThreadCreate(payload);
        const addedThread = await this._threadRepository.addThread(userId, thread);

        return addedThread;
    }
}

module.exports = AddThreadUseCase;
