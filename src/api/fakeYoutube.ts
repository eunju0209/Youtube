import axios from 'axios';
import { VideoType } from '../pages/Videos';
import { ChannelResponse, SearchResponse } from './youtube';

export default class FakeYoutube {
  getVideos(keyword?: string) {
    return keyword ? this.search() : this.mostPopular();
  }

  async getChannelImage() {
    const res = await axios.get<ChannelResponse>('/videos/channel.json');
    return res.data.items[0].snippet.thumbnails.default.url;
  }

  private async search(): Promise<VideoType[]> {
    const res = await axios.get<SearchResponse>('/videos/search.json');
    return res.data.items.map((video) => ({ ...video, id: video.id.videoId }));
  }

  private async mostPopular(): Promise<VideoType[]> {
    const res = await axios.get('/videos/mostPopular.json');
    return res.data.items;
  }
}
