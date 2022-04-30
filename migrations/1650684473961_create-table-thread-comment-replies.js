exports.up = (pgm) => {
  pgm.createTable('thread_comment_replies', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    content: {
      type: 'TEXT',
      notNull: true,
    },
    thread_comment_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    is_deleted: {
      type: 'BOOLEAN',
      default: false,
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.addConstraint('thread_comment_replies', 'fk_threads_comments_replies.thread_comments.id', {
    foreignKeys: {
      columns: 'thread_comment_id',
      references: 'thread_comments(id)',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
  });

  pgm.addConstraint('thread_comment_replies', 'fk_threads_comments_replies.users.id', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint('thread_comment_replies', 'fk_threads_comments_replies.thread_comments.id');
  pgm.dropConstraint('thread_comment_replies', 'fk_threads_comments_replies.users.id');
  pgm.dropTable('thread_comment_replies');
};
