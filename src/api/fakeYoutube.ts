import axios from 'axios';
import { VideoType } from '../pages/Videos';
import { ChannelResponse, SearchResponse, VideoResponse } from './youtube';

export default class FakeYoutube {
  getVideos(keyword?: string) {
    return keyword ? this.search() : this.mostPopular();
  }

  async getChannelImage() {
    const res = await axios.get<ChannelResponse>('/videos/channel.json');
    return res.data.items[0].snippet.thumbnails.default.url;
  }

  async getRelatedVideos() {
    const res = await axios.get<SearchResponse>('/videos/related.json');
    return res.data.items.map((item) => ({ ...item, id: item.id.videoId }));
  }

  private async search(): Promise<VideoType[]> {
    const res = await axios.get<SearchResponse>('/videos/search.json');
    return res.data.items.map((item) => ({ ...item, id: item.id.videoId }));
  }

  private async mostPopular(): Promise<VideoType[]> {
    const res = await axios.get<VideoResponse>('/videos/mostPopular.json');
    return res.data.items;
  }
}
