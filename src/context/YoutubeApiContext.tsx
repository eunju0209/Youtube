import { createContext, ReactNode, useContext } from 'react';
import FakeYoutube from '../api/fakeYoutube';
import { YoutubeApi } from '../api/youtube';

const YoutubeApiContext = createContext<YoutubeApi | null>(null);

// const youtube = new Youtube();
const youtube: YoutubeApi = new FakeYoutube();

export function YoutubeApiProvider({ children }: { children: ReactNode }) {
  return (
    <YoutubeApiContext.Provider value={youtube}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export const useYoutubeApi = () => {
  const result = useContext(YoutubeApiContext);
  if (!result) {
    throw new Error('api가 존재하지 않습니다.');
  }
  return result;
};
