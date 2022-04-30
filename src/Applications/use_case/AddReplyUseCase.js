const ThreadCommentReplyCreate = require('../../Domains/threads/entities/ThreadCommentReplyCreate');

class AddReplyUseCase {
  constructor({ threadRepository, commentRepository, replyRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }

  async execute(userId, threadId, commentId, content) {
    const reply = new ThreadCommentReplyCreate({
      userId, threadId, commentId, content,
    });

    await this._threadRepository.verifyThread(reply.threadId);
    await this._commentRepository.verifyComment(reply.commentId);

    return this._replyRepository.addReply(reply.userId, reply.commentId, reply.content);
  }
}

module.exports = AddReplyUseCase;
