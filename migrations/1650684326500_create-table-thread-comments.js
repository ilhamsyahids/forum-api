exports.up = (pgm) => {
    pgm.createTable('thread_comments', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        content: {
            type: 'TEXT',
            notNull: true,
        },
        thread_id: {
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

    pgm.addConstraint('thread_comments', 'fk_threads_comments.threads.id', {
        foreignKeys: {
            columns: 'thread_id',
            references: 'threads(id)',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
    });

    pgm.addConstraint('thread_comments', 'fk_threads_comments.user.id', {
        foreignKeys: {
            columns: 'user_id',
            references: 'users(id)',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
    });
};

exports.down = (pgm) => {
    pgm.dropConstraint('thread_comments', 'fk_threads_comments.threads.id');
    pgm.dropConstraint('thread_comments', 'fk_threads_comments.user.id');
    pgm.dropTable('thread_comments');
};
