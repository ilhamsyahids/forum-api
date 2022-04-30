exports.up = (pgm) => {
  pgm.createTable('thread_comment_likes', {
    thread_comment_id: {
      type: 'TEXT',
      notNull: true,
      primaryKey: true,
    },
    user_id: {
      type: 'TEXT',
      notNull: true,
      primaryKey: true,
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: 'NOW()',
    },
  });

  pgm.addConstraint('thread_comment_likes', 'fk_threads_comments_likes.comments.id', {
    foreignKeys: {
      columns: 'thread_comment_id',
      references: 'thread_comments(id)',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
  });

  pgm.addConstraint('thread_comment_likes', 'threads_comments_likes.users.id', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint('thread_comment_likes', 'fk_threads_comments_likes.comments.id');
  pgm.dropConstraint('thread_comment_likes', 'threads_comments_likes.users.id');
  pgm.dropTable('thread_comment_likes');
};
