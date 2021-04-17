import { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import Retweet from '../components/Tweet/Retweet';
import SingleTweet from '../components/Tweet/SingleTweet';
import { Context as TweetContext } from '../context/TweetContext';

const useRenderTweets = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { state, fetchTweets } = useContext(TweetContext);
  useEffect(() => {
    if (!id) {
      fetchTweets(pathname);
    } else {
      fetchTweets(pathname, id);
    }
  }, [pathname, id]);
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
