import retweetIcon from '../../assets/icons/retweet-icon.js';
const RetweetButton = ({ retweets, handleRetweet, currentUserId }) => {
  const retweeted = retweets.some((t) => t.user_id === currentUserId);
  return retweeted ? (
    <div className="liked" onClick={() => handleRetweet()}>
      {retweetIcon}
      {`   ${retweets.length}`}
    </div>
  ) : (
    <div onClick={() => handleRetweet()}>
      {retweetIcon}
      {`   ${retweets.length}`}
    </div>
  );
};

export default RetweetButton;
