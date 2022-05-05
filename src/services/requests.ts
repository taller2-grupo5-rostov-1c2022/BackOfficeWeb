export const usersApi = "/api/users";

export const setRole = async (uid: string, role: string) => {
  const response = await fetch(`${usersApi}/setRole/${uid}`, {
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
