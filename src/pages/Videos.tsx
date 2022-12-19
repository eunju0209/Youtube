import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery<VideoType[]>({
    queryKey: ['videos', keyword],
    queryFn: async () =>
      axios
        .get(`/videos/${keyword ? 'search' : 'mostPopular'}.json`)
        .then((res) => res.data.items),
  });
  console.log(videos);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something is wrong...</p>;

  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4'>
      {videos &&
        videos.map((video) => <VideoCard key={video.id} video={video} />)}
    </ul>
  );
}
