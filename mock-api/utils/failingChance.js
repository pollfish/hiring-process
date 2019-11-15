const shouldFail = (query = {}) => {
  const { env } = query;
  if (env === 'production') {
    return Math.floor(Math.random() * 4) === 0	
  }
  return false;
};

module.exports = shouldFail;