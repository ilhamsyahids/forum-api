class ThreadCommentLikeRepositoryPostgres {
  constructor(pool) {
    this._pool = pool;
  }

  async addLike(userId, commentId) {
    const query = {
      text: `
            INSERT INTO thread_comment_likes
            VALUES ($1, $2)
            `,
      values: [commentId, userId],
    };

    await this._pool.query(query);
  }

  async removeLike(userId, commentId) {
    const query = {
      text: `
            DELETE FROM thread_comment_likes
            WHERE user_id = $1 AND thread_comment_id = $2
            `,
      values: [userId, commentId],
    };

    await this._pool.query(query);
  }

  async checkLikeExist(userId, commentId) {
    const query = {
      text: `
            SELECT * FROM thread_comment_likes
            WHERE user_id = $1 AND thread_comment_id = $2
            `,
      values: [userId, commentId],
    };

    const result = await this._pool.query(query);
    return result.rows.length > 0;
  }

  async getLikesCount(commentId) {
    const query = {
      text: `
            SELECT COUNT(*) as count
            FROM thread_comment_likes
            WHERE thread_comment_id = $1
            `,
      values: [commentId],
    };

    const result = await this._pool.query(query);
    return parseInt(result.rows[0].count, 10);
  }
}

module.exports = ThreadCommentLikeRepositoryPostgres;
