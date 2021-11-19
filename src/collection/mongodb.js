const mongoose = require('mongoose');

const DBConnect = (host, user, password, collection) => {
  const PARAMS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  mongoose
    .connect(`mongodb+srv://${user}:${password}@${host}/${collection}?retryWrites=true&w=majority`, PARAMS)
    .then(() => {
      console.log('Connected to database')
    })
    .catch(err => {
      console.error(`Error connecting to the database. \n${err}`);
    });
}

module.exports = {
  connect: DBConnect,
};
