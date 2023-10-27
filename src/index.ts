/** Global imports */
import express, { Express } from 'express';
import { Server, createServer } from 'http';
import cluster from 'cluster';
import os from 'os';

/** Local imports */
import { ENV } from './config/env.config';
import { pool } from './config/db.config';
import customerRoutes from './routes/customer.routes';

const app: Express = express();
const server: Server = createServer(app);
const port: number = ENV.PORT;
const totalCPU: number = os.cpus().length;

/** Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** API routes */
app.use('/api/v1', customerRoutes);

(async () => {
  try {
    await pool.query('SELECT 1');
    if (cluster.isPrimary) {
      console.log(
        `Master server running | port(${port}) | Database connected | pid(${process.pid})`
      );
      for (let i: number = 0; i < totalCPU; i++) {
        cluster.fork();
      }
      cluster.on('exit', () => {
        cluster.fork();
      });
    } else {
      server.listen(port, () =>
        console.log(
          `Worker server running | port(${port}) | Database connected | pid(${process.pid})`
        )
      );
    }
  } catch (error) {
    console.log(`Database not connect`);
  }
})();
