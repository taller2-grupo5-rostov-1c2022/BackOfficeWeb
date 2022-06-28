import { useAuthUser } from "next-firebase-auth";
import defaultSwr from "swr";

const apiGateway = "https://rostov-gateway.herokuapp.com";
export const authApi = "/api/users";
const _songs = "devsongs"; // prod: songs , dev: devsongs
const monolith = `${apiGateway}/${_songs}`;
export const usersApi = `${monolith}/users/`;
export const songsApi = `${monolith}/songs/`;
export const albumsApi = `${monolith}/albums/`;
export const playlistsApi = `${monolith}/playlists/`;
const subscriptionsApi = `${monolith}/subscriptions/`;
export const paymentsAPi = `${apiGateway}/payments/`;

const useToken = () => {
  const auth = useAuthUser() as any;
  const token = auth?.firebaseUser?.accessToken as string;
  return token;
};

export const authFetcher = (auth: string, headers?: any) => (url: string) => {
  return (
    auth &&
    fetch(url, {
      headers: {
        authorization: "Bearer " + auth,
        ...headers,
      },
    }).then((response) => response.json())
  );
};

export const useAuthFetcher = (headers?: any) => {
  const token = useToken();
  const _authFetcher = authFetcher(token, headers);
  return { authFetcher: _authFetcher, token };
};

export const useAuthSWR = (route: string | null, headers?: any) => {
  const { authFetcher, token } = useAuthFetcher(headers);
  const fetchedData = defaultSwr(token ? route : null, authFetcher, {
    // revalidateIfStale: false, // revalidates on mount
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    ...fetchedData,
    loading: !fetchedData?.data && fetchedData?.isValidating,
  };
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
  const token = useToken();
  return (uid: string, role: string) => setRole(uid, role, token);
};

const setDisabled = async (uid: string, disabled: boolean, token: string) => {
  return post(`${authApi}/setDisabled/${uid}`, { disabled }, token);
};

export const useSetDisabled = () => {
  const token = useToken();
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
  const token = useToken();
  return (id: string | number, disabled: boolean, type: contentType) =>
    setContentDisabled(id, disabled, type, token);
};

export const useUserMetrics = () => {
  return useAuthSWR(authApi + "/metrics");
};

export const useSubLevels = (): {
  level: number;
  name: string;
  price: string | number;
}[] => {
  const { data } = useAuthSWR(subscriptionsApi);

  // these should rarely change
  const defaultSubscriptions = [
    {
      level: 0,
      name: "Free",
      price: "0",
    },
    {
      level: 1,
      name: "Premium",
      price: "0.0000001",
    },
    {
      level: 2,
      name: "Pro",
      price: "0.0000005",
    },
    {
      level: 3,
      name: "God",
      price: "1000",
    },
  ];

  return data ?? defaultSubscriptions;
};

export const useGetSubName = () => {
  const subLevels = useSubLevels();

  return (level: number) => {
    const subLevel = subLevels.find((sub: any) => sub.level === level);
    return subLevel?.name ?? "Unknown ";
  };
};

export const useUserBalance = (uid: string) => {
  const { data } = useAuthSWR(uid && `${paymentsAPi}balances/${uid}`);
  return data?.balance ?? "unknown";
};

export const useAddBalance = (uid: string) => {
  const token = useToken();

  return async (amountInEthers: string) => {
    await post(`${paymentsAPi}pay/${uid}`, { amountInEthers }, token);
  };
};
