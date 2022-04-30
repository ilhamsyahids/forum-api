/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadCommentRepliesTableTestHelper = {
  async addReply({
    id = 'reply-123',
    commentId = 'comment-123',
    userId = 'user-123',
    content = 'content',
  }) {
    const query = {
      text: `
            INSERT INTO thread_comment_replies
            VALUES ($1, $2, $3, $4, $5)
            `,
      values: [id, content, commentId, userId, false],
    };

    await pool.query(query);
  },

  async getReply(id) {
    const query = {
      text: `
            SELECT
                tcr.*,
                tcr.thread_comment_id as "threadCommentId",
                tcr.user_id as "userId"
            FROM thread_comment_replies tcr
            WHERE id = $1
            `,
      values: [id],
    };

    const result = await pool.query(query);
    return result.rowCount > 0 ? result.rows[0] : null;
  },

  async deleteReply(id) {
    const query = {
      text: `
            UPDATE thread_comment_replies
            SET is_deleted = true
            WHERE id = $1
            `,
      values: [id],
    };

    await pool.query(query);
  },

  async cleanTable() {
    const query = {
      text: `
            DELETE FROM thread_comment_replies
            WHERE 1 = 1
            `,
    };

    await pool.query(query);
  },
};

module.exports = ThreadCommentRepliesTableTestHelper;
