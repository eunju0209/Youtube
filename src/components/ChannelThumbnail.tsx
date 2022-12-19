import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type ChannelThumbnailProps = {
  channelId: string;
  channelTitle: string;
};

export default function ChannelThumbnail({
  channelId,
  channelTitle,
}: ChannelThumbnailProps) {
  const { data } = useQuery(['channel'], async () =>
    axios
      .get('/videos/channel.json')
      .then((res) => res.data.items[0].snippet.thumbnails.default.url)
  );
  return (
    <>
      {data && (
        <img className='w-8 h-8 rounded-full' src={data} alt={channelTitle} />
      )}
    </>
  );
}
