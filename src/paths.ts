
export const paths = {
  home: () => "/",
  userPage: (steamId: string) => `/user/${steamId}`,
};

export default paths;

export const addSearchParams = (path: string, params: URLSearchParams) =>
  `${path}?${params.toString()}`;

export const setSearchParam = (
  path: string,
  params: URLSearchParams,
  key: string,
  value: string,
) => {
  const newParams = new URLSearchParams(params);
  newParams.set(key, value);
  return addSearchParams(path, newParams);
};
