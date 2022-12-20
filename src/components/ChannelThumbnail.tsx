import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';

type ChannelThumbnailProps = {
  channelId: string;
  channelTitle: string;
};

export default function ChannelThumbnail({
  channelId,
  channelTitle,
}: ChannelThumbnailProps) {
  const youtube = useYoutubeApi();
  const { data } = useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => youtube.getChannelImage(channelId),
  });
  return (
    <>
      {data && (
        <img className='w-8 h-8 rounded-full' src={data} alt={channelTitle} />
      )}
    </>
  );
}
