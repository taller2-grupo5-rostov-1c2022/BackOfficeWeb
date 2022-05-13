export type SongType = {
  id: number | string;
  name: string;
  description: string;
  genre: string;
  album: {
    id: number | string;
    name: string;
  };
  artists: {
    name: string;
  }[];
};

export type AlbumType = {
  id: number | string;
  name: string;
  description: string;
  creator_id: number | string;
  genre: string;
  sub_level: number;
  songs: SongType[];
};

export type UserType = {
  id: string;
  name: string;
  location: string;
  interests: string; // needs to be parsed
  wallet: string;
  pfp: string;
  songs: SongType[];
  albums: AlbumType[];
  rest: any[];
};

export type AuthUserType = {
  uid: string;
  displayName: string;
  email: string;
  disabled: boolean;
  customClaims: {
    role: string;
  };
  metadata: {
    creationTime: string;
    lastSignInTime: string;
  };
  rest: any[];
};
