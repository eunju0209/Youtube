import axios from 'axios';
import { VideoType } from '../pages/Videos';
import { SearchAPI } from './youtube';

export default class FakeYoutube {
  getVideos(keyword?: string) {
    return keyword ? this.search() : this.mostPopular();
  }

  private async search(): Promise<VideoType[]> {
    const res = await axios.get('/videos/search.json');
    const videos: SearchAPI[] = res.data.items;
    return videos.map((video) => ({ ...video, id: video.id.videoId }));
  }

  private async mostPopular(): Promise<VideoType[]> {
    const res = await axios.get('/videos/mostPopular.json');
    return res.data.items;
  }
}
