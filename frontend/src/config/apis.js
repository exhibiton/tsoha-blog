const env = process.env.NODE_ENV || 'development'

const apiEndpoints = {
  development: {
    api: 'http://localhost:5000',
  },
  production: {
    api: 'https://tsoha.herokuapp.com',
  },
}

module.exports = apiEndpoints[env]
