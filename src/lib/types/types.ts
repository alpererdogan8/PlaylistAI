export interface IPlaylistCreate {
  name: string;
  description: string;
  isPublic: boolean;
}
export interface ICard {
  header: string;
  image: any;
  alt: string;
  imgHeight: number;
  imgWidth: number;
}
export interface IGetPlaylist {
  limit?: number;
  offset?: number;
  csv?: boolean;
}

export interface IContextApi {
  getPlaylists: ({ limit, offset }: IGetPlaylist) => Promise<any>;
  createPlaylist: ({ name, description, isPublic }: IPlaylistCreate) => Promise<any>;
  addToPlaylist: ({ playlistId, uris }: { playlistId: string; uris: string[] }) => Promise<any>;
  state: TYPE_STATE;
  dispatch: React.Dispatch<TYPE_ACTION>;
}
export type TYPE_ACTION = { type: "PENDING" | "SUCCESS" | "FAILED"; payload?: { data: any; isTrue?: boolean } };

export type TYPE_STATE = {
  loading: boolean;
  data: object[];
  isPromptAvailable: boolean;
  error: object;
};
