import { SearchResponse, ChannelResponse, VideoResponse } from './youtube.d';
import axios from 'axios';
import { VideoType } from '../pages/Videos';

export interface YoutubeApi {
  getVideos(keyword?: string): Promise<VideoType[]>;
  getChannelImage(id: string): Promise<string>;
  getRelatedVideos(id: string): Promise<VideoType[]>;
}

export default class Youtube implements YoutubeApi {
  private readonly client;
  constructor() {
    this.client = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3',
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  getVideos(keyword?: string): Promise<VideoType[]> {
    return keyword ? this.search(keyword) : this.mostPopular();
  }

  async getChannelImage(id: string): Promise<string> {
    const res = await this.client.get<ChannelResponse>('/channels', {
      params: {
        part: 'snippet',
        id,
      },
    });
    return res.data.items[0].snippet.thumbnails.default.url;
  }

  async getRelatedVideos(id: string): Promise<VideoType[]> {
    const res = await this.client.get<SearchResponse>('/search', {
      params: {
        part: 'snippet',
        maxResults: 25,
        type: 'video',
        relatedToVideoId: id,
      },
    });
    return res.data.items.map((item) => ({ ...item, id: item.id.videoId }));
  }

  private async search(keyword: string): Promise<VideoType[]> {
    const res = await this.client.get<SearchResponse>('/search', {
      params: {
        part: 'snippet',
        maxResults: 25,
        type: 'video',
        q: keyword,
      },
    });
    return res.data.items.map((item) => ({ ...item, id: item.id.videoId }));
  }

  private async mostPopular(): Promise<VideoType[]> {
    const res = await this.client.get<VideoResponse>('/videos', {
      params: {
        part: 'snippet',
        maxResults: 25,
        chart: 'mostPopular',
        regionCode: 'KR',
      },
    });
    return res.data.items;
  }
}
