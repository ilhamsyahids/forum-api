const ThreadCommentLikeRepository = require('../ThreadCommentLikeRepository');

describe('ThreadCommentReplyRepository', () => {
  it('should throw error when its abstract method is called', async () => {
    const threadCommentLikeRepo = new ThreadCommentLikeRepository();

    await expect(threadCommentLikeRepo.addLike('user-123', 'comment-123')).rejects.toThrowError(
      'THREAD_COMMENT_LIKE_REPOSITORY.ADD_LIKE_NOT_IMPLEMENTED',
    );

    await expect(threadCommentLikeRepo.removeLike('user-123', 'comment-123')).rejects.toThrowError(
      'THREAD_COMMENT_LIKE_REPOSITORY.REMOVE_LIKE_NOT_IMPLEMENTED',
    );

    await expect(threadCommentLikeRepo.checkLikeExist('user-123', 'comment-123')).rejects.toThrowError(
      'THREAD_COMMENT_LIKE_REPOSITORY.CHECK_LIKE_EXIST_NOT_IMPLEMENTED',
    );

    await expect(threadCommentLikeRepo.getLikesCount('comment-123')).rejects.toThrowError(
      'THREAD_COMMENT_LIKE_REPOSITORY.GET_LIKES_COUNT_NOT_IMPLEMENTED',
    );
  });
});
