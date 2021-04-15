import React, { useContext } from 'react';
import retweetIcon from '../../assets/icons/retweet-icon.js';
import SingleTweet from './SingleTweet';
import { Context as AuthContext } from '../../context/AuthContext';

const Retweet = ({ tweet, username }) => {
  const {
    state: { user: currentUser },
  } = useContext(AuthContext);
  return (
    <div className="single-retweet">
      <div className="single-retweet-header">
        {retweetIcon}
        <p>
          {username === currentUser.username
            ? 'You retweeted'
            : username + ' retweeted'}
        </p>
      </div>

      <SingleTweet del={false} {...tweet} />
    </div>
  );
};

export default Retweet;
