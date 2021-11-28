import Mongoose from 'mongoose';
import config from '../../constants/config';
import { CONNECTION_OPTIONS } from './constants/db';

let connectionStatus = false;

const connectURL = (env) => {
  const confDB = config.db[env];

  if (env === 'local') {
    let uri = 'mongodb://', params = '';
    
    if (confDB.user) {
      uri += `${confDB.user}:${confDB.pass}@`;
      params = `?authSource=${confDB.auth}`;
    }

    return `${uri}${confDB.host}:${confDB.port}/${confDB.name}${params}`;
  }
  
  return `mongodb+srv://${confDB.user}:${confDB.passs}@${confDB.host}/${confDB.name}?retryWrites=true&w=majority`;
};

function connect (env = config.app.env) {
  Mongoose
    .connect(connectURL(env), CONNECTION_OPTIONS)
    .then(() => {
      console.log(`Connected to database! [${env}]`);
      connectionStatus = true;
    })
    .catch(err => {
      console.error(`Error connecting to the database [${env}].`);
      console.error(err);
    }).then(() => {
      if ((env === 'production' && connectionStatus === false)) {
        connect('local');
      }
    });
}

export default connect;

