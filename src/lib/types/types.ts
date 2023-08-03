interface IPlaylistCreate {
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
