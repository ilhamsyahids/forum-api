/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadCommentLikesTableTestHelper = {
  async addLike({ userId = 'user-123', commentId = 'comment-123' }) {
    const query = {
      text: `
            INSERT INTO thread_comment_likes
            VALUES ($1, $2)
            `,
      values: [commentId, userId],
    };

    await pool.query(query);
  },

  async removeLike({ userId = 'user-123', commentId = 'comment-123' }) {
    const query = {
      text: `
            DELETE FROM thread_comment_likes
            WHERE user_id = $1 AND thread_comment_id = $2
            `,
      values: [userId, commentId],
    };

    await pool.query(query);
  },

  async getLike({ userId = 'user-123', commentId = 'comment-123' }) {
    const query = {
      text: `
            SELECT
                tcl.*,
                tcl.user_id as "userId",
                tcl.thread_comment_id as "threadCommentId"
            FROM thread_comment_likes tcl
            WHERE user_id = $1 AND thread_comment_id = $2
            `,
      values: [userId, commentId],
    };

    const result = await pool.query(query);
    return result.rows.length > 0 ? result.rows[0] : null;
  },

  async cleanTable() {
    const query = {
      text: `
            DELETE FROM thread_comment_likes
            WHERE 1 = 1
            `,
    };

    await pool.query(query);
  },
};

module.exports = ThreadCommentLikesTableTestHelper;
