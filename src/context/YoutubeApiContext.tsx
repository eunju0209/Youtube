import { createContext, ReactNode, useContext } from 'react';
import FakeYoutube from '../api/fakeYoutube';
import Youtube from '../api/youtube';

const YoutubeApiContext = createContext<Youtube | FakeYoutube | null>(null);

// const youtube = new Youtube();
const youtube = new FakeYoutube();

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
