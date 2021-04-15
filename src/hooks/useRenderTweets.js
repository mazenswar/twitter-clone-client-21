import { useContext, useEffect } from 'react';
import Retweet from '../components/Tweet/Retweet';
import SingleTweet from '../components/Tweet/SingleTweet';
import { Context as TweetContext } from '../context/TweetContext';

const useRenderTweets = ({ page, id }) => {
  const { state, fetchTweets } = useContext(TweetContext);
  useEffect(() => {
    if (!id) {
      fetchTweets(page);
    } else {
      fetchTweets(page, id);
    }
  }, [page, id]);
  const renderTweets = () => {
    const components = state.map((tweet) => {
      if (tweet.rt) {
        return (
          <Retweet
            key={`rt-${tweet.id}-${tweet.created_at}`}
            tweet={tweet.tweet}
            username={tweet.username}
          />
        );
      }
      return <SingleTweet key={`${tweet.id}-${tweet.created_at}`} {...tweet} />;
    });
    return <div>{components}</div>;
  };
  return [renderTweets];
};

export default useRenderTweets;
