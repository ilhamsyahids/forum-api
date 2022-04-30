class ThreadCommentReplyCreated {
  constructor(payload) {
    this._validate(payload);

    const {
      userId, threadId, commentId, content,
    } = payload;
    this.userId = userId;
    this.threadId = threadId;
    this.commentId = commentId;
    this.content = content;
  }

  _validate({
    userId, threadId, commentId, content,
  }) {
    if (!userId || !threadId || !commentId || !content) {
      throw new Error('THREAD_COMMENT_REPLY_CREATE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof userId !== 'string' || typeof threadId !== 'string'
            || typeof commentId !== 'string' || typeof content !== 'string'
    ) {
      throw new Error('THREAD_COMMENT_REPLY_CREATE.WRONG_DATA_TYPE');
    }
  }
}

module.exports = ThreadCommentReplyCreated;
