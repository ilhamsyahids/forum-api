const DeleteReplyUseCase = require('../DeleteReplyUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const ThreadCommentRepository = require('../../../Domains/threads/ThreadCommentRepository');
const ThreadCommentReplyRepository = require('../../../Domains/threads/ThreadCommentReplyRepository');

describe('DeleteReplyUseCase', () => {
  it('should delete reply', async () => {
    const userId = 'user-123';
    const threadId = 'thread-123';
    const commentId = 'comment-123';
    const replyId = 'reply-123';

    const mockThreadRepo = new ThreadRepository();
    mockThreadRepo.verifyThread = jest.fn().mockImplementation(() => Promise.resolve);

    const mockCommentRepo = new ThreadCommentRepository();
    mockCommentRepo.verifyComment = jest.fn().mockImplementation(() => Promise.resolve);

    const mockReplyRepo = new ThreadCommentReplyRepository();
    mockReplyRepo.verifyReply = jest.fn().mockImplementation(() => Promise.resolve);
    mockReplyRepo.verifyReplyOwner = jest.fn().mockImplementation(() => Promise.resolve);
    mockReplyRepo.deleteReply = jest.fn().mockImplementation(() => Promise.resolve(true));

    const deleteReplyUseCase = new DeleteReplyUseCase({
      threadRepository: mockThreadRepo,
      commentRepository: mockCommentRepo,
      replyRepository: mockReplyRepo,
    });
    const status = await deleteReplyUseCase.execute(userId, threadId, commentId, replyId);

    expect(mockThreadRepo.verifyThread).toBeCalledWith(threadId);
    expect(mockCommentRepo.verifyComment).toBeCalledWith(commentId);
    expect(mockReplyRepo.verifyReply).toBeCalledWith(replyId);
    expect(mockReplyRepo.verifyReplyOwner).toBeCalledWith(replyId, userId);
    expect(mockReplyRepo.deleteReply).toBeCalledWith(replyId);
    expect(status).toEqual(true);
  });
});
