export default function LikeButton({ likes, userId, handleLike }) {
  const liked = likes.find((like) => like.user_id === userId);

  return liked ? (
    <div className="unlike-button liked" onClick={handleLike}>
      <span>♥</span>
      <p>{`   ${likes.length}`}</p>
    </div>
  ) : (
    <div className="like-button" onClick={handleLike}>
      <span>♥</span> <p>{`   ${likes.length}`}</p>
    </div>
  );
}
