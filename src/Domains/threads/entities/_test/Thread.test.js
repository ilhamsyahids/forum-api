const Thread = require('../Thread');

describe('Thread', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      id: 'thread-123',
      title: 'thread-title',
      body: 'thread-body',
      date: new Date().toISOString(),
    };

    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload data type is not correct', () => {
    const payload = {
      id: 'thread-123',
      title: 'thread-title',
      body: 'thread-body',
      date: new Date().toISOString(),
      username: 1,
      comments: {},
    };

    expect(() => new Thread(payload)).toThrowError('THREAD.WRONG_DATA_TYPE');
  });

  it('should create object correctly when given correct data', () => {
    const payload = {
      id: 'thread-123',
      title: 'thread-title',
      body: 'thread-body',
      date: new Date().toISOString(),
      username: 'user-123',
      comments: [],
    };

    const comment = new Thread(payload);

    expect(comment.id).toEqual(payload.id);
    expect(comment.content).toEqual(payload.content);
    expect(comment.username).toEqual(payload.username);
    expect(comment.date).toEqual(payload.date);
    expect(comment.replies).toEqual(payload.replies);
  });
});
