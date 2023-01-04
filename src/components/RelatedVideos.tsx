import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import VideoCard from './VideoCard';

type RelatedVideosProps = {
  videoId: string;
};

export default function RelatedVideos({ videoId }: RelatedVideosProps) {
  const youtube = useYoutubeApi();
  const { data: videos } = useQuery({
    queryKey: ['related', videoId],
    queryFn: () => youtube.getRelatedVideos(videoId),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <ul>
      {videos &&
        videos.map((video) => (
          <VideoCard key={video.id} video={video} type='list' />
        ))}
    </ul>
  );
}
