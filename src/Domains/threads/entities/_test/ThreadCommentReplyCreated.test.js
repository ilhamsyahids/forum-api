const ThreadCommentReplyCreated = require('../ThreadCommentReplyCreated');

describe('ThreadCommentReplyCreated', () => {
    it('should throw error when payload didn`t contain needed property', () => {
        const payload = {
            id: 'comment-123',
            owner: 'user-123',
        };

        expect(() => new ThreadCommentReplyCreated(payload)).toThrowError(
            'THREAD_COMMENT_REPLY_CREATED.NOT_CONTAIN_NEEDED_PROPERTY',
        );
    });

    it('should throw error when payload data type is not correct', () => {
        const payload = {
            id: 123,
            content: {},
            owner: 123,
        };

        expect(() => new ThreadCommentReplyCreated(payload)).toThrowError(
            'THREAD_COMMENT_REPLY_CREATED.WRONG_DATA_TYPE',
        );
    });

    it('should create ThreadCommentReplyCreated object correctly when given correct payload', () => {
        const payload = {
            id: 'reply-123',
            content: 'Thread Comment Reply Body',
            owner: 'user-123',
        };

        const comment = new ThreadCommentReplyCreated(payload);

        expect(comment.id).toEqual(payload.id);
        expect(comment.content).toEqual(payload.content);
        expect(comment.owner).toEqual(payload.owner);
    });
});
