/* eslint-disable no-console */
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import Datastore from 'nedb';
import webpackConfig from '../webpack.config';
import { routes, checkAccess, cookiesSession } from '../../src';
import createStore from './JSONStore';

const db = {};
db.layers = new Datastore(path.join(__dirname, '../data/layers.db'));
db.layers.loadDatabase();

const store = createStore(path.join(__dirname, '../data/store.json'));

const app = express();
const router = new express.Router();

router.get('/layers', (req, res) => {
  db.layers.find({}).exec((err, docs) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(docs.filter(item => checkAccess(req.session.user, 'viewing', item.id)));
    }
  });
});

router.use(routes(store));

app.use(bodyParser.json());
app.use(cookiesSession());
app.use('/api', router);

const httpServer = new http.Server(app);

webpackConfig.output.path = '/';

const compiler = webpack(webpackConfig);

const server = new WebpackDevServer(compiler, {
  contentBase: './dist',
  hot: true,
  historyApiFallback: true,
  proxy: {
    '/api/*': 'http://localhost:6139',
  },
});

server.listen(3000, () => {
  httpServer.listen(6139);

  console.log('App server listening on port 3000');
  console.log('Build app...');
});
