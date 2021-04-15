import React, { useState, useRef, useContext } from 'react';
import { Context as TweetContext } from '../../context/TweetContext';

const NewTweetForm = () => {
  const textRef = useRef();
  const [newTweet, setNewTweet] = useState({
    content: '',
  });
  const { newTweetToDB } = useContext(TweetContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    newTweetToDB(newTweet);
    setNewTweet({ content: '' });
  };

  const handleChange = (e) => {
    setNewTweet({ content: e.target.value });
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const checkLength = () => {
    const len = newTweet.content.length;
    return len <= 140 ? (
      <span style={{ color: 'green' }}>{len}</span>
    ) : (
      <span style={{ color: 'red' }}>{140 - len}</span>
    );
  };

  const submitButton = () => {
    const len = newTweet.content.length;
    return len > 140 || len === 0 ? (
      <input type="submit" value="Tweet" disabled />
    ) : (
      <input type="submit" value="Tweet" />
    );
  };

  return (
    <form className="new-tweet-form" onSubmit={handleSubmit}>
      <div className="tweet-form-content-div">
        <div className="user-profile-img" />
        <textarea
          type="text"
          ref={textRef}
          onChange={handleChange}
          value={newTweet.content}
          placeholder="What's happening?"
        />
      </div>

      <div className="tweet-form-buttons-div">
        {checkLength()}
        {submitButton()}
      </div>
    </form>
  );
};

export default NewTweetForm;
