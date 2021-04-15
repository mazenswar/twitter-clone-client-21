import ProfileCard from '../components/ProfileCard';
import useRenderTweets from '../hooks/useRenderTweets';

export default function UserShow() {
  const [renderTweets] = useRenderTweets('User');
  return (
    <div>
      <ProfileCard />
      {renderTweets()}
    </div>
  );
}
