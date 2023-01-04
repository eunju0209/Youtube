import axios from 'axios';
import { VideoType } from '../pages/Videos';
import { YoutubeApi } from './youtube';
import { ChannelResponse, SearchResponse, VideoResponse } from './youtube.d';

export default class FakeYoutube implements YoutubeApi {
  getVideos(keyword?: string): Promise<VideoType[]> {
    return keyword ? this.search() : this.mostPopular();
  }

  async getChannelImage(): Promise<string> {
    const res = await axios.get<ChannelResponse>('/videos/channel.json');
    return res.data.items[0].snippet.thumbnails.default.url;
  }

  async getRelatedVideos(): Promise<VideoType[]> {
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
