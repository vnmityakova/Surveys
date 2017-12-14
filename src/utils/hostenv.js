export const getHost = () => {
  const envHost = process.env.NODE_HOST;
  const location = process.env.NODE_ENV !== 'production'
    ? 'fipdev.fxdd.com'
    : document.location.host;
  const protocol = envHost ? '' : 's';

  return { host: envHost || location, protocol };
};
