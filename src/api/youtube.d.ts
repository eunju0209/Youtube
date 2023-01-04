import { VideoType } from './../pages/Videos';

export type SearchData = {
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

export type SearchResponse = {
  items: SearchData[];
};

export type VideoResponse = {
  items: VideoType[];
};

export type ChannelResponse = {
  items: [
    {
      snippet: {
        thumbnails: {
          default: { url: string };
        };
      };
    }
  ];
};
