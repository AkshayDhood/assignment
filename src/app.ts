import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import rateLimiter from 'express-rate-limit';
import routes from './routes/baseRoutes';
import { errorHandler } from './common/utils';
import { appDataSource } from './common/database';
import { checkEnvConfigs, EnvConfigs, getEnvValue } from './common/configs';
import { swaggerConfig } from './common/docs/swagger.config';

// Express App
export const app = express();

/**
 * Middlewares
 */
export async function initMiddlewares(): Promise<void> {
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(rateLimiter({ windowMs: 6000, limit: 100 }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  app.use('/api', routes);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

  app.use(errorHandler);

  checkEnvConfigs();
  await appDataSource.initialize();
}

/**
 * Initialize Application
 */
export async function initApp(): Promise<void> {
  try {
    await initMiddlewares();

    // for error not caught in error handler
    process.on('uncaughtException', error => console.log('uncaughtException =>', error));
    process.on('unhandledRejection', error => console.log('unhandledRejection =>', error));

    const port = getEnvValue(EnvConfigs.PORT);
    app.listen(port, () => console.log(`Express App Listening on Port ${port}`));
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
