import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import VideoCard from '../components/VideoCard';

export type VideoType = {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      medium: { url: string };
    };
    channelTitle: string;
  };
};

export default function Videos() {
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery<VideoType[]>({
    queryKey: ['videos'],
    queryFn: async () =>
      axios.get('/videos/mostPopular.json').then((res) => res.data.items),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something is wrong...</p>;

  return (
    <ul>
      {videos &&
        videos.map((video) => <VideoCard key={video.id} video={video} />)}
    </ul>
  );
}
