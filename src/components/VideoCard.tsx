import { VideoType } from '../pages/Videos';
import ChannelThumbnail from './ChannelThumbnail';
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

register('ko', koLocale);

type VideoCardProps = {
  video: VideoType;
};

export default function VideoCard({ video }: VideoCardProps) {
  const { title, thumbnails, channelId, channelTitle, publishedAt } =
    video.snippet;
  return (
    <li className='hover:cursor-pointer hover:scale-105 transition-all'>
      <img
        className='w-full rounded-xl'
        src={thumbnails.medium.url}
        alt={title}
      />
      <div className='flex mt-2'>
        <ChannelThumbnail channelId={channelId} channelTitle={channelTitle} />
        <div className='ml-3'>
          <p className='font-semibold line-clamp-2 mb-1'>{title}</p>
          <p className='text-sm opacity-60'>{channelTitle}</p>
          <p className='text-sm opacity-60'>{format(publishedAt, 'ko')}</p>
        </div>
      </div>
    </li>
  );
}
