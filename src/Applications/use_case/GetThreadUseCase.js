class GetThreadUseCase {
    constructor({ threadRepository, commentRepository, replyRepository }) {
        this._threadRepository = threadRepository;
        this._commentRepository = commentRepository;
        this._replyRepository = replyRepository;
    }

    async execute(threadId) {
        await this._threadRepository.verifyThread(threadId);

        const thread = await this._threadRepository.getThread(threadId);
        const comments = await this._commentRepository.getCommentsByThread(threadId);

        const commentIds = comments.map((comment) => comment.id);
        const replies = await this._replyRepository.getRepliesByComment(commentIds);

        for (const comment of comments) {
            const filteredReplies = replies.filter((reply) => reply.threadCommentId === comment.id);

            const sensoredReplies = filteredReplies.map((reply) => {
                const { isDeleted, ...rest } = reply;
                if (isDeleted) {
                    rest.content = '**balasan telah dihapus**';
                };
                return rest;
            });

            comment.replies = sensoredReplies;
        }

        const sensoredComments = comments.map((c) => {
            const { isDeleted, ...rest } = c;
            if (isDeleted) {
                rest.content = '**komentar telah dihapus**';
            }

            return rest;
        });

        thread.comments = sensoredComments;

        return thread;
    }
}

module.exports = GetThreadUseCase;
