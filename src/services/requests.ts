import { useAuthUser } from "next-firebase-auth";

export const authApi = "/api/users";
export const usersApi = "https://rostov-gateway.herokuapp.com/songs/users/";
export const songsApi = "https://rostov-gateway.herokuapp.com/songs/songs/";
export const albumsApi = "https://rostov-gateway.herokuapp.com/songs/albums/";
export const playlistsApi =
  "https://rostov-gateway.herokuapp.com/songs/playlists/";

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

const post = async (url: string, body: {}, token: string) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...body,
    }),
  });
  const json = await response.json();
  return json;
};
const put = async (
  url: string,
  body: { [key: string]: string | number | boolean },
  token: string
) => {
  let formData = new FormData();
  for (let key in body) {
    formData.append(key, String(body[key]));
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const json = await response.json();
    return json;
  } catch (e) {
    throw e;
  }
};

const setRole = async (uid: string, role: string, token: string) => {
  return post(`${authApi}/setRole/${uid}`, { role }, token);
};

export const useSetRole = () => {
  const auth = useAuthUser() as any;
  const token = auth?.firebaseUser?.accessToken as string;
  return (uid: string, role: string) => setRole(uid, role, token);
};

const setDisabled = async (uid: string, disabled: boolean, token: string) => {
  return post(`${authApi}/setDisabled/${uid}`, { disabled }, token);
};

export const useSetDisabled = () => {
  const auth = useAuthUser() as any;
  const token = auth?.firebaseUser?.accessToken as string;
  return (uid: string, disabled: boolean) => setDisabled(uid, disabled, token);
};

type contentType = "song" | "album" | "playlist";
const contentEndpoint = {
  song: songsApi,
  album: albumsApi,
  playlist: playlistsApi,
};
const setContentDisabled = async (
  id: string | number,
  blocked: boolean,
  type: contentType,
  token: string
) => {
  return put(contentEndpoint[type] + id, { blocked }, token);
};

export const useSetContentDisabled = () => {
  const auth = useAuthUser() as any;
  const token = auth?.firebaseUser?.accessToken as string;
  return (id: string | number, disabled: boolean, type: contentType) =>
    setContentDisabled(id, disabled, type, token);
};
