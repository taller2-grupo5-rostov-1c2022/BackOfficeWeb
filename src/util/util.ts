export const parseArray = (data: string): any => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};
