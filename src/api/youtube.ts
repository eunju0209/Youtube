import axios from 'axios';
import { VideoType } from '../pages/Videos';

export type SearchAPI = {
  id: {
    kind: string;
    videoId: string;
  };
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

export default class Youtube {
  private readonly client;
  constructor() {
    this.client = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3',
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  getVideos(keyword?: string) {
    return keyword ? this.search(keyword) : this.mostPopular();
  }

  private async search(keyword: string): Promise<VideoType[]> {
    const res = await this.client.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 25,
        type: 'video',
        q: keyword,
      },
    });
    const videos: SearchAPI[] = res.data.items;
    return videos.map((video) => ({ ...video, id: video.id.videoId }));
  }

  private async mostPopular(): Promise<VideoType[]> {
    const res = await this.client.get('/videos', {
      params: {
        part: 'snippet',
        maxResults: 25,
        chart: 'mostPopular',
      },
    });
    return res.data.items;
  }
}
