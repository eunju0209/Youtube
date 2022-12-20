import { useLocation } from 'react-router-dom';
import ChannelThumbnail from '../components/ChannelThumbnail';
import RelatedVideos from '../components/RelatedVideos';
import { formatAgo } from '../util/timeago';
import { VideoType } from './Videos';

type RouteState = {
  state: {
    video: VideoType;
  };
};

export default function VideoDetail() {
  const {
    state: { video },
  } = useLocation() as RouteState;

  const { title, channelId, channelTitle, publishedAt, description } =
    video.snippet;

  return (
    <div className='flex flex-col lg:flex-row'>
      <article className='basis-4/6 mr-3'>
        <iframe
          id='ytplayer'
          title={title}
          width='100%'
          height='500'
          src={`https://www.youtube.com/embed/${video.id}`}
          className='mb-3'
        />
        <h2 className='text-xl font-bold my-3'>{title}</h2>
        <div className='flex items-center mb-6'>
          <ChannelThumbnail channelId={channelId} channelTitle={channelTitle} />
          <div className='ml-3'>
            <p className='text-sm opacity-60'>{channelTitle}</p>
            <p className='text-sm opacity-60'>{formatAgo(publishedAt, 'ko')}</p>
          </div>
        </div>
        <pre className='whitespace-pre-wrap text-sm'>{description}</pre>
      </article>
      <article className='basis-2/6'>
        <RelatedVideos videoId={video.id} />
      </article>
    </div>
  );
}
