export const authApi = "/api/users";
export const usersApi =
  "https://rostov-song-server.herokuapp.com/api/v3/users/";

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
