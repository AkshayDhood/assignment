import { appDataSource } from '../src/common/database';

export const initializeDatabase = async () => {
  if (!appDataSource.isInitialized) {
    await appDataSource.initialize();
  }
};

export const closeDatabase = async () => {
  if (appDataSource.isInitialized) {
    await appDataSource.destroy();
  }
};
