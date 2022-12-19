import { VideoType } from '../pages/Videos';

type VideoCardProps = {
  video: VideoType;
};

export default function VideoCard({ video }: VideoCardProps) {
  return <li>{video.snippet.title}</li>;
}
