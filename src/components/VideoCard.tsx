import { VideoType } from '../pages/Videos';
import ChannelThumbnail from './ChannelThumbnail';
import { useNavigate } from 'react-router-dom';
import { formatAgo } from '../util/timeago';

type VideoCardProps = {
  video: VideoType;
  type?: string;
};

export default function VideoCard({ video, type }: VideoCardProps) {
  const navigate = useNavigate();
  const { title, thumbnails, channelId, channelTitle, publishedAt } =
    video.snippet;
  const isList = type === 'list';

  return (
    <li
      className={`hover:cursor-pointer hover:scale-105 transition-all ${
        isList ? 'flex gap-1' : ''
      }`}
      onClick={() =>
        navigate(`/videos/watch/${video.id}`, { state: { video } })
      }
    >
      <img
        className={`${isList ? 'w-60' : 'w-full'} rounded-xl`}
        src={thumbnails.medium.url}
        alt={title}
      />
      <div className='flex mt-2'>
        <div className={`shrink-0 ${isList ? 'hidden' : ''}`}>
          <ChannelThumbnail channelId={channelId} channelTitle={channelTitle} />
        </div>
        <div className='ml-3'>
          <p className='font-semibold line-clamp-2 mb-1'>{title}</p>
          <p className='text-sm opacity-60'>{channelTitle}</p>
          <p className='text-sm opacity-60'>{formatAgo(publishedAt, 'ko')}</p>
        </div>
      </div>
    </li>
  );
}
