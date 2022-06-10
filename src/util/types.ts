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
  blocked: boolean;
};

export type AlbumType = {
  id: number | string;
  name: string;
  description: string;
  album_creator_id: number | string;
  genre: string;
  sub_level: number;
  songs: SongType[];
  cover: string;
  blocked: boolean;
};

export type PlaylistType = {
  id: number | string;
  name: string;
  description: string;
  creator_id: number | string;
  songs?: SongType[];
  blocked: boolean;
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
  providerData: {
    providerId: string;
    rest: any[];
  }[];
  rest: any[];
};

export type MetricsData = {
  total: number;
  disabled: number;
  provider: {
    [p: string]: number;
  };
  role: {
    [r: string]: number;
  };
  new: {
    // created in the last n days
    [days: number]: number;
  };
  signedIn: {
    // signed in in the last n days
    [days: number]: number;
  };
};
