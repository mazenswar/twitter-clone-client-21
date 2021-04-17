import API from '../API_CONSTANTS';
import { createDataContext } from './createDataContext';
import twitterAPI from '../api/twitter';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'get_tweets':
      return payload;
    case 'create_tweet':
      return [payload, ...state];
    case 'delete_tweet':
      return removeTweet(state, payload);
    case 'update_likes':
      return updateTweets(state, payload);
    case 'create_retweet':
      return handleRetweet(state, payload);
    case 'delete_retweet':
      return removeTweet(state, payload);
    default:
      return state;
  }
};

// RETWEET HELPER

const handleRetweet = (tweets, obj) => {
  const newTweets = [obj, ...tweets];
  return updateTweets(newTweets, obj.tweet);
};

// DELETE TWEET HELPER

const removeTweet = (tweets, data) => {
  const updatedTweets = [...tweets].filter((tweetObj) => {
    if (tweetObj.rt && tweetObj.id === data.rt_id) {
      return false;
    }
    return true;
  });
  return updateTweets(updatedTweets, data.tweet);
};

const updateTweets = (tweets, updatedTweet) => {
  return tweets.map((tweet) =>
    tweet.id === updatedTweet.id ? updatedTweet : tweet
  );
};

// NEW LIKE HELPER

// const updateArray = (arr, obj) =>
//   arr.map(element => (element.id === obj.id ? obj : element));

// const addOrRemoveLike = (state, tweetObj) => {
//   const timelineTweet = state.timeline.find(tweet => tweet.id === tweetObj.id);
//   const currentUserTweet = state.currentUserTweets.find(
//     tweet => tweet.id === tweetObj.id
//   );
//   const showUserTweet = state.showUserTweets.find(
//     tweet => tweet.id === tweetObj.id
//   );
//   if (timelineTweet) {
//     return updateArray(state.timeline, tweetObj);
//   } else if (showUserTweet) {
//     return updateArray(state.showUserTweets, tweetObj);
//   } else if (currentUserTweet) {
//     return updateArray(state.currentUserTweets, tweetObj);
//   }
//   return state;
// };

// Actions

const createRetweetAction = (tweet) => ({
  type: 'create_retweet',
  payload: tweet,
});

const deleteRetweetAction = (data) => ({
  type: 'delete_retweet',
  payload: data,
});

const newTweetAction = (tweet) => ({
  type: 'create_tweet',
  payload: tweet,
});

const deleteTweetAction = (tweetId) => ({
  type: 'delete_tweet',
  payload: tweetId,
});

const updateLikes = (tweet) => ({
  type: 'update_likes',
  payload: tweet,
});

// FETCH
// const deleteRetweetToDB = (dispatch) => async (tweetId) => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       Authorization: `bearer ` + localStorage.token,
//     },
//   };
//   try {
//     await twitterAPI.delete(API.RETWEETS_URL + tweetId, config);
//     dispatch(deleteRetweetAction(tweetId));
//   } catch (e) {
//     console.log(e);
//   }
// };

const createRetweetToDB = (dispatch) => async (tweetId) => {
  try {
    const response = await twitterAPI.post(
      API.RETWEETS_URL,
      { tweet_id: tweetId },
      { headers: { Authorization: 'bearer ' + localStorage.token } }
    );
    if (response.data.success) {
      console.log('success', response);
      dispatch(deleteRetweetAction(response.data));
    } else {
      console.log('delete', response);
      dispatch(createRetweetAction(response.data));
    }
  } catch (e) {
    console.log(e);
  }
};

const fetchTweets = (dispatch) => async (page, id = null) => {
  let url;
  switch (page) {
    case 'Home':
      url = API.TIMELINE_URL;
      break;
    case 'User':
      url = API.SHOW_TWEETS_URL(id);
      break;
    case 'Profile':
      url = API.USER_TWEETS_URL;
      break;
    default:
      url = API.TIMELINE_URL;
      break;
  }
  try {
    const response = await twitterAPI.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `bearer ` + localStorage.token,
      },
    });
    dispatch({ type: 'get_tweets', payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

const newTweetToDB = (dispatch) => async (tweetObj) => {
  try {
    const response = await twitterAPI.post(
      API.TWEETS_URL,
      { tweet: tweetObj },
      {
        headers: {
          Authorization: `bearer ` + localStorage.token,
        },
      }
    );
    dispatch(newTweetAction(response.data));
  } catch (e) {
    console.log(e);
  }
};

const deleteTweetFromDB = (dispatch) => async (tweetId) => {
  try {
    const response = await twitterAPI.delete(`${API.TWEETS_URL}/${tweetId}`, {
      headers: { Authorization: 'bearer ' + localStorage.token },
    });
    dispatch(deleteTweetAction(response.data));
  } catch (e) {
    console.log(e);
  }
};

const newLikeToDB = (dispatch) => async (tweetId) => {
  try {
    const response = await twitterAPI.post(
      API.LIKES_URL,
      { tweet_id: tweetId },
      {
        headers: {
          Authorization: `bearer ` + localStorage.token,
        },
      }
    );
    dispatch(updateLikes(response.data));
  } catch (e) {
    console.log(e);
  }
};

// const deleteLikeFromDB = (dispatch) => async (tweetId) => {
//   try {
//     const response = await twitterAPI.delete(`${API.LIKES_URL}/${tweetId}`, {
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         Authorization: `bearer ` + localStorage.token,
//       },
//       data: { tweet_id: tweetId },
//     });
//     dispatch(updateLikes(response.data));
//   } catch (e) {
//     console.log(e);
//   }
// };

// exports

export const { Context, Provider } = createDataContext(
  reducer,
  {
    createRetweetToDB,
    fetchTweets,
    newTweetToDB,
    deleteTweetFromDB,
    newLikeToDB,
  },
  []
);
