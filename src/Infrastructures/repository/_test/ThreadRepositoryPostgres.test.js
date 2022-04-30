const ThreadsTableTesthelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const ThreadCreate = require('../../../Domains/threads/entities/ThreadCreate');
const ThreadCreated = require('../../../Domains/threads/entities/ThreadCreated');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const Thread = require('../../../Domains/threads/entities/Thread');

describe('ThreadRepositoryPostgres', () => {
    afterEach(async () => {
        await ThreadsTableTesthelper.cleanTable();
        await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    beforeEach(async () => {
        await UsersTableTestHelper.addUser({
            id: 'user-123',
            username: 'ilham'
        });
    });

    describe('addThread function', () => {
        it('should add thread', async () => {
            const user = await UsersTableTestHelper.findUsersById('user-123');

            const threadCreate = new ThreadCreate({
                title: 'Thread Title',
                body: 'Thread Body',
            });

            const idGenerator = () => '123';
            const threadRepo = new ThreadRepositoryPostgres(pool, idGenerator);
            const newThread = await threadRepo.addThread(user[0].id, threadCreate);

            expect(newThread).toStrictEqual(
                new ThreadCreated({
                    id: 'thread-123',
                    title: 'Thread Title',
                    owner: 'user-123',
                }),
            );
        });
    });

    describe('verifyThread function', () => {
        beforeEach(async () => {
            await ThreadsTableTesthelper.addThread({
                threadId: 'thread-123',
                userId: 'user-123'
            });
        });

        it('should validate thread correctly', async () => {
            const idGenerator = () => '123';
            const threadRepo = new ThreadRepositoryPostgres(pool, idGenerator);

            await expect(threadRepo.verifyThread('thread-123')).resolves.not.toThrowError(InvariantError);
        });

        it('should throw error when thread id does not valid', async () => {
            const idGenerator = () => '123';
            const threadRepo = new ThreadRepositoryPostgres(pool, idGenerator);

            await expect(threadRepo.verifyThread('thread-999')).rejects.toThrowError(NotFoundError);
        });
    });

    describe('getThread function', () => {
        beforeEach(async () => {
            await ThreadsTableTesthelper.addThread({
                threadId: 'thread-123',
                userId: 'user-123',
                title: 'Thread Title',
                body: 'Thread Body',
            });
        });

        it('should return certain thread correctly', async () => {
            const nowDate = new Date();
            const expected = new Thread({
                id: 'thread-123',
                title: 'Thread Title',
                body: 'Thread Body',
                date: nowDate.toISOString(),
                username: 'ilham',
                comments: [],
            });

            const threadRepo = new ThreadRepositoryPostgres(pool, () => { });
            const thread = await threadRepo.getThread('thread-123');

            expect(thread.id).toEqual(expected.id);
            expect(thread.title).toEqual(expected.title);
            expect(thread.body).toEqual(expected.body);
            expect(thread.username).toEqual(expected.username);
            expect(thread.comments).toHaveLength(expected.comments.length);
            expect(thread.date).toBeDefined();
        });

        it('should return null if thread does not exist', async () => {
            const threadRepo = new ThreadRepositoryPostgres(pool, () => { });
            const thread = await threadRepo.getThread('thread-999');

            expect(thread).toEqual(null);
        });
    });
});
