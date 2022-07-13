import { config } from 'dotenv';

/**
 * Эта функция подгружает переменные из файла .env и кладет их в process.env
 */
config();

export const DB_URL = process.env.DB_URL;
