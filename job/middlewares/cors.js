const allowedCors = [
  'http://localhost:5000',
  'https://localhost:5000',
  'https://dolgoff.nomoredomains.club',
  'http://dolgoff.nomoredomains.club',
  'http://api.dolgoff.nomoredomains.club',
  'https://api.dolgoff.nomoredomains.club',
];

const corsOp = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
module.exports = corsOp;