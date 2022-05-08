class ThreadComment {
  constructor(payload) {
    this._validate(payload);

    const {
      id, content, date, username, replies, isDeleted, likeCount,
    } = payload;
    this.id = id;
    this.content = content;
    this.username = username;
    this.date = date;
    this.replies = replies;
    this.isDeleted = isDeleted;
    this.likeCount = likeCount;
  }

  _validate({
    id, content, username, date, replies, isDeleted, likeCount,
  }) {
    if (
      !id || !content
      || !username || !date
      || !replies || isDeleted === undefined
      || likeCount === undefined
    ) {
      throw new Error('THREAD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' || typeof content !== 'string'
      || typeof date !== 'string' || typeof username !== 'string'
      || typeof isDeleted !== 'boolean' || typeof likeCount !== 'number'
      || !Array.isArray(replies)
    ) {
      throw new Error('THREAD_COMMENT.WRONG_DATA_TYPE');
    }
  }
}

module.exports = ThreadComment;
