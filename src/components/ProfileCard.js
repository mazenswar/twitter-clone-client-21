import React, { useContext, useState, useEffect } from 'react';
import ProfileEdit from './ProfileEdit';
import { Context as AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import twitterAPI from '../api/twitter';

const ProfileCard = () => {
  const [user, setUser] = useState({
    followers: [],
    followees: [],
  });
  const { id } = useParams();
  const {
    state: { user: currentUser },
  } = useContext(AuthContext);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const response = await twitterAPI.get(`/users/${id}`);
      setUser(response.data);
    };
    getUser();
  }, []);

  //// functions

  const handleFollow = async () => {
    let url = '';
    const response = await twitterAPI.post(url, {
      data: { id },
      headers: { Authorization: `bearer ${localStorage.token}` },
    });
    setUser(response.data);
    // dispatch(ShowActions.followUpdateToDB(followeeId));
  };

  const followButton = () => {
    if (user.followers) {
      const follower = user.followers.find(
        (user) => user.id === currentUser.id
      );
      return follower ? (
        <button className="profile-card-follow-button" onClick={handleFollow}>
          Unfollow
        </button>
      ) : (
        <button className="profile-card-follow-button" onClick={handleFollow}>
          Follow
        </button>
      );
    }
  };

  const editModal = () => {
    return modal ? <ProfileEdit modal={modal} setModal={setModal} /> : null;
  };

  const profileButtons = () => {
    const current = id === currentUser.id;
    const followee = currentUser.followees.find((f) => f.id === id);

    if (current) {
      return (
        <div className="profile-card-buttons">
          <button
            onClick={() => setModal(!modal)}
            className="profile-card-follow-button"
          >
            Edit
          </button>
        </div>
      );
    } else if (followee) {
      return (
        <div className="profile-card-buttons">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          {followButton()}
        </div>
      );
    } else {
      return (
        <div className="profile-card-buttons">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          {followButton()}
        </div>
      );
    }
  };

  return (
    <div className="profile-card-container">
      {editModal()}
      <div className="profile-cover-photo"></div>
      <div className="profile-user-avatar"></div>
      {profileButtons()}
      <h2>{user.fullname}</h2>
      <p className="grey">@{user.username}</p>
      <p>Bio placeholder</p>
      <div className="profile-user-info">
        <p>Location Placeholder</p>
        <p>Birthday Placeholder</p>
        <p>Join Date Placeholder</p>
      </div>
      <div className="profile-card-follows">
        <span className="num">{user.followees.length}</span>
        <span className="grey">Following</span>
        <span className="num">{user.followers.length}</span>
        <span className="grey">Followers</span>
      </div>
      <p>Mutual follows placeholder</p>
    </div>
  );
};

export default ProfileCard;
