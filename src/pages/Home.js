import React from 'react';
import useRenderTweets from '../hooks/useRenderTweets';
import NewTweetForm from '../components/Tweet/NewTweetForm';

export default function Home() {
  const [renderTweets] = useRenderTweets('Home');

  return (
    <div>
      <NewTweetForm />
      {renderTweets()}
    </div>
  );
}
