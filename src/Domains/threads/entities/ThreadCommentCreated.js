class ThreadCommentCreated {
  constructor(payload) {
    this._validate(payload);

    const { id, content, owner } = payload;
    this.content = content;
    this.owner = owner;
    this.id = id;
  }

  _validate({ id, content, owner }) {
    if (!content || !owner || !id) {
      throw new Error('THREAD_COMMENT_CREATED.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof content !== 'string' || typeof owner !== 'string' || typeof id !== 'string') {
      throw new Error('THREAD_COMMENT_CREATED.WRONG_DATA_TYPE');
    }
  }
}

module.exports = ThreadCommentCreated;
