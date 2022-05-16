import { useAuthUser } from "next-firebase-auth";

export const authApi = "/api/users";
export const usersApi = "https://rostov-gateway.herokuapp.com/songs/users/";
export const songsApi = "https://rostov-gateway.herokuapp.com/songs/songs/";
export const albumsApi = "https://rostov-gateway.herokuapp.com/songs/albums/";
export const playlistsApi =
  "https://rostov-gateway.herokuapp.com/songs/playlists/";

export const jsonFetcher = (url: string) => {
  return fetch(url).then((response) => response.json());
};

export const authFetcher = (auth: string) => (url: string) => {
  return (
    auth &&
    fetch(url, {
      headers: {
        authorization: "Bearer " + auth,
      },
    }).then((response) => response.json())
  );
};

export const useAuthFetcher = () => {
  const auth = useAuthUser() as any;
  const token = auth?.firebaseUser?.accessToken as string;
  const _authFetcher = authFetcher(token);
  return { authFetcher: _authFetcher, token };
};

export const setRole = async (uid: string, role: string) => {
  const response = await fetch(`${authApi}/setRole/${uid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //"Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      role: role,
    }),
  });
  const json = await response.json();
  return json;
};
