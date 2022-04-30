const ThreadCommentRepository = require('../ThreadCommentRepository');

describe('ThreadCommentRepository', () => {
    it('should throw error when its abstract method is called', async () => {
        const threadCommentRepo = new ThreadCommentRepository();

        await expect(threadCommentRepo.addComment('user-123', 'thread-123', 'content'),
        ).rejects.toThrowError('THREAD_COMMENT_REPOSITORY.ADD_COMMENT_NOT_IMPLEMENTED');

        await expect(threadCommentRepo.deleteComment('comment-123')).rejects.toThrowError(
            'THREAD_COMMENT_REPOSITORY.DELETE_COMMENT_NOT_IMPLEMENTED',
        );

        await expect(threadCommentRepo.verifyComment('comment-123')).rejects.toThrowError(
            'THREAD_COMMENT_REPOSITORY.VERIFY_COMMENT_NOT_IMPLEMENTED',
        );

        await expect(threadCommentRepo.verifyCommentOwner('comment-123', 'user-123'),
        ).rejects.toThrowError('THREAD_COMMENT_REPOSITORY.VERIFY_COMMENT_OWNER_NOT_IMPLEMENTED');

        await expect(threadCommentRepo.getCommentsByThread('thread-123')).rejects.toThrowError(
            'THREAD_COMMENT_REPOSITORY.GET_COMMENT_BY_THREAD_NOT_IMPLEMENTED',
        );
    });
});
