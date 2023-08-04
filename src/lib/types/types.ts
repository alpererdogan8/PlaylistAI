export interface IPlaylistCreate {
  body: {
    name: string;
    description: string;
    public: boolean;
  };
  session: {
    id?: string;
    access_token?: string;
  };
}

export interface ICard {
  header: string;
  image: any;
  alt: string;

  imgHeight: number;
  imgWidth: number;
}
