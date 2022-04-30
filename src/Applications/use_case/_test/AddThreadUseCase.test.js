const ThreadCreate = require('../../../Domains/threads/entities/ThreadCreate');
const ThreadCreated = require('../../../Domains/threads/entities/ThreadCreated');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
    it('should add thread', async () => {
        const payload = {
            userId: 'user-123',
            title: 'Thread Title',
            body: 'Thread Body',
        };

        const expected = new ThreadCreated({
            id: 'thread-123',
            title: 'Thread Title',
            owner: 'user-123',
        });

        const mockThreadRepository = new ThreadRepository();
        mockThreadRepository.addThread = jest.fn().mockImplementation(() =>
            Promise.resolve(
                new ThreadCreated({
                    id: 'thread-123',
                    title: 'Thread Title',
                    owner: 'user-123',
                }),
            ),
        );

        const addThreadUseCase = new AddThreadUseCase({ threadRepository: mockThreadRepository });
        const threadCreated = await addThreadUseCase.execute(payload.userId, payload);

        expect(threadCreated).toStrictEqual(expected);
        expect(mockThreadRepository.addThread).toBeCalledWith(
            payload.userId,
            new ThreadCreate({
                title: payload.title,
                body: payload.body,
            }),
        );
    });
});
