import React from 'react';
import useRenderTweets from '../hooks/useRenderTweets';

export default function Home() {
  const [renderTweets] = useRenderTweets('Home');

  return <div>{renderTweets()}</div>;
}
