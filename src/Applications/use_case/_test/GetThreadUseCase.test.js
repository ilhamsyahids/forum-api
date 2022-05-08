const Thread = require('../../../Domains/threads/entities/Thread');
const ThreadComment = require('../../../Domains/threads/entities/ThreadComment');
const ThreadCommentReply = require('../../../Domains/threads/entities/ThreadCommentReply');
const ThreadCommentReplyRepository = require('../../../Domains/threads/ThreadCommentReplyRepository');
const ThreadCommentRepository = require('../../../Domains/threads/ThreadCommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const GetThreadUseCase = require('../GetThreadUseCase');

describe('GetThreadUseCase', () => {
  it('should get thread', async () => {
    const nowDate = new Date();

    const expectedFirstComment = {
      id: 'comment-123',
      username: 'ilham',
      date: nowDate.toISOString(),
      likeCount: 1,
      replies: [
        {
          id: 'reply-123',
          content: '**balasan telah dihapus**',
          date: nowDate.toISOString(),
          threadCommentId: 'comment-123',
          username: 'ilham',
        },
        {
          id: 'reply-1234',
          content: 'thread comment reply 1234',
          date: nowDate.toISOString(),
          threadCommentId: 'comment-123',
          username: 'ilham',
        },
      ],
      content: 'thread comment content',
    };

    const expectedSecondComment = {
      id: 'comment-1234',
      username: 'ilham',
      date: nowDate.toISOString(),
      likeCount: 0,
      replies: [
        {
          id: 'reply-12345',
          content: '**balasan telah dihapus**',
          date: nowDate.toISOString(),
          threadCommentId: 'comment-1234',
          username: 'ilham',
        },
        {
          id: 'reply-123456',
          content: 'thread comment reply 123456',
          date: nowDate.toISOString(),
          threadCommentId: 'comment-1234',
          username: 'ilham',
        },
      ],
      content: '**komentar telah dihapus**',
    };

    const expectedComments = [
      expectedFirstComment,
      expectedSecondComment,
    ];

    const expectedThread = {
      id: 'thread-123',
      title: 'Thread Title',
      body: 'Thread Body',
      date: nowDate.toISOString(),
      username: 'ilham',
      comments: expectedComments,
    };

    const mockThreadRepo = new ThreadRepository();
    mockThreadRepo.verifyThread = jest.fn().mockImplementation(() => Promise.resolve);
    mockThreadRepo.getThread = jest.fn().mockImplementation(() =>
      Promise.resolve(
        new Thread({
          id: 'thread-123',
          title: 'Thread Title',
          body: 'Thread Body',
          date: nowDate.toISOString(),
          username: 'ilham',
          comments: [],
        }),
      ),
    );

    const mockCommentRepo = new ThreadCommentRepository();
    mockCommentRepo.getCommentsByThread = jest.fn().mockImplementation(() =>
      Promise.resolve([
        new ThreadComment({
          id: 'comment-123',
          username: 'ilham',
          date: nowDate.toISOString(),
          content: 'thread comment content',
          isDeleted: false,
          likeCount: 1,
          replies: [],
        }),
        new ThreadComment({
          id: 'comment-1234',
          username: 'ilham',
          date: nowDate.toISOString(),
          content: 'thread comment content kasar',
          isDeleted: true,
          likeCount: 0,
          replies: [],
        }),
      ]),
    );

    const mockReplyRepo = new ThreadCommentReplyRepository();
    mockReplyRepo.getRepliesByComment = jest.fn().mockImplementation(() =>
      Promise.resolve([
        new ThreadCommentReply({
          id: 'reply-123',
          content: 'thread comment reply kasar',
          date: nowDate.toISOString(),
          username: 'ilham',
          threadCommentId: 'comment-123',
          isDeleted: true,
        }),
        new ThreadCommentReply({
          id: 'reply-1234',
          content: 'thread comment reply 1234',
          date: nowDate.toISOString(),
          username: 'ilham',
          threadCommentId: 'comment-123',
          isDeleted: false,
        }),
        new ThreadCommentReply({
          id: 'reply-12345',
          content: 'thread comment reply kasar lagi',
          date: nowDate.toISOString(),
          username: 'ilham',
          threadCommentId: 'comment-1234',
          isDeleted: true,
        }),
        new ThreadCommentReply({
          id: 'reply-123456',
          content: 'thread comment reply 123456',
          date: nowDate.toISOString(),
          username: 'ilham',
          threadCommentId: 'comment-1234',
          isDeleted: false,
        }),
      ]),
    );

    const useCase = new GetThreadUseCase({
      threadRepository: mockThreadRepo,
      commentRepository: mockCommentRepo,
      replyRepository: mockReplyRepo,
    });
    const result = await useCase.execute('thread-123');

    expect(mockThreadRepo.verifyThread).toBeCalledWith('thread-123');
    expect(mockThreadRepo.getThread).toBeCalledWith('thread-123');
    expect(mockCommentRepo.getCommentsByThread).toBeCalledWith('thread-123');
    expect(mockReplyRepo.getRepliesByComment).toBeCalledWith(['comment-123', 'comment-1234']);
    expect(result).toEqual(expectedThread);
  });
});
