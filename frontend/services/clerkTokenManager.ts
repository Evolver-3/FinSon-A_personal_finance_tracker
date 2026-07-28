
let getClerkToken: null | (() => Promise<string | null>) = null;

export const setClerkTokenGetter = (
  getter: () => Promise<string | null>
) => {
  getClerkToken = getter;
};

export const getFreshClerkToken = async () => {
  if (!getClerkToken) return null;
  return getClerkToken();
};