import ProfileCard from '../components/ProfileCard';
import useRenderTweets from '../hooks/useRenderTweets';
import helpers from '../helpers';

export default function UserShow() {
  const [renderTweets] = useRenderTweets('User');
  return (
    <div>
      <helpers.ScrollToTop />
      <ProfileCard />
      {renderTweets()}
    </div>
  );
}
