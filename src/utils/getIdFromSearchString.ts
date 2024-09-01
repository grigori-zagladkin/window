export const getIdFromSearchString = (url: string) => {
  const urlParts = url.split('/');
  return Number(urlParts[urlParts.length - 1]);
};
