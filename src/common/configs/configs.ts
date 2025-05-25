import dotenv from 'dotenv';
import { EnvConfigs } from '.';
dotenv.config();

export function checkEnvConfigs() {
  for (const envKey of Object.values(EnvConfigs)) {
    const value = process.env[envKey];

    if (value === undefined) {
      throw `${envKey} is required!`;
    }
  }
}

export function getEnvValue(envKey: EnvConfigs) {
  return process.env[envKey] || '';
}
