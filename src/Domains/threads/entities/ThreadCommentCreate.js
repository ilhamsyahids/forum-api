class ThreadCommentCreate {
  constructor(payload) {
    this._validate(payload);

    const { userId, threadId, content } = payload;
    this.content = content;
    this.userId = userId;
    this.threadId = threadId;
  }

  _validate({ userId, threadId, content }) {
    if (!content || !userId || !threadId) {
      throw new Error('THREAD_COMMENT_CREATE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof content !== 'string' || typeof userId !== 'string' || typeof threadId !== 'string') {
      throw new Error('THREAD_COMMENT_CREATE.WRONG_DATA_TYPE');
    }
  }
}

module.exports = ThreadCommentCreate;
