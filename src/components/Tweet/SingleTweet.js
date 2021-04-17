import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { renderContent } from './helpers';

import LikeButton from './LikeButton';
import { Context as TweetContext } from '../../context/TweetContext';
import { Context as AuthContext } from '../../context/AuthContext';
import RetweetButton from './RetweetButton';

const SingleTweet = ({
  id,
  fullname,
  user_id,
  username,
  content,
  hashtags,
  created_at,
  mentions,
  del,
  retweets,
  likes,
}) => {
  // console.log('triggereddddddd');
  const { newLikeToDB, createRetweetToDB } = useContext(TweetContext);
  const { state: user } = useContext(AuthContext);
  const currentUserId = user.id;

  ////////////////////////////

  return (
    <div className="single-tweet">
      <div className="single-tweet-header">
        <div className="single-tweet-user-img" />
        <Link to={`/users/${user_id}`} className="single-tweet-fullname">
          {fullname}
        </Link>

        <Link to={`/users/${user_id}`} className="single-tweet-username">
          @{username}
        </Link>
        <span className="single-tweet-date">
          {new Date(created_at).toDateString()}
        </span>
      </div>
      <span className="single-tweet-content">
        {renderContent(content, hashtags, mentions)}
      </span>

      <div className="single-tweet-footer">
        <LikeButton
          likes={likes}
          userId={currentUserId}
          handleLike={() => newLikeToDB(id)}
        />
        <RetweetButton
          retweets={retweets}
          handleRetweet={() => createRetweetToDB(id)}
          currentUserId={currentUserId}
        />
      </div>
    </div>
  );
};
SingleTweet.defaultProps = {
  retweets: [],
  likes: [],
};
export default SingleTweet;
