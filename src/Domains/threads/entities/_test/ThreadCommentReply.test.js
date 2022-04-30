const ThreadCommentReply = require('../ThreadCommentReply');

describe('ThreadCommentReply', () => {
    it('should throw error when payload didn`t contain needed property', () => {
        const payload = {
            id: 'reply-123',
            content: 'content',
            username: 'ilham',
        };

        expect(() => new ThreadCommentReply(payload)).toThrowError(
            'THREAD_COMMENT_REPLY.NOT_CONTAIN_NEEDED_PROPERTY',
        );
    });

    it('should throw error when payload data type is not correct', () => {
        const payload = {
            id: 123,
            content: 'content',
            username: 'ilham',
            date: 123,
            isDeleted: false,
            threadCommentId: {},
        };

        expect(() => new ThreadCommentReply(payload)).toThrowError(
            'THREAD_COMMENT_REPLY.WRONG_DATA_TYPE',
        );
    });

    it('should create ThreadCommentReply object correctly when given correct payload', () => {
        const payload = {
            id: 'reply-123',
            content: 'content',
            username: 'ilham',
            date: new Date().toISOString(),
            isDeleted: true,
            threadCommentId: 'comment-123',
        };

        const reply = new ThreadCommentReply(payload);

        expect(reply.id).toEqual(payload.id);
        expect(reply.content).toEqual(payload.content);
        expect(reply.username).toEqual(payload.username);
        expect(reply.date).toEqual(payload.date);
        expect(reply.isDeleted).toEqual(payload.isDeleted);
    });
});
