const BASE_URL = 'http://localhost:3000';
// User URLS
const USERS_URL = BASE_URL + '/users';
const LOGIN_URL = BASE_URL + '/login';
const PERSIST_URL = BASE_URL + '/auth';

// Tweet URLS

const TWEETS_URL = BASE_URL + '/tweets';
const USER_TWEETS_URL = BASE_URL + '/userTweets';
const SHOW_TWEETS_URL = (id) => `${BASE_URL}/users/${id}/showTweets`;

// Timeline

const TIMELINE_URL = BASE_URL + '/timeline';

// Likes

const LIKES_URL = BASE_URL + '/likes';

// Hashtag
const HASHTAGS_URL = BASE_URL + '/hashtags';

// Retweets

const RETWEETS_URL = BASE_URL + '/retweets';

const API = {
  BASE_URL,
  USERS_URL,
  LOGIN_URL,
  PERSIST_URL,
  TWEETS_URL,
  USER_TWEETS_URL,
  SHOW_TWEETS_URL,
  TIMELINE_URL,
  LIKES_URL,
  HASHTAGS_URL,
  RETWEETS_URL,
};

export default API;
