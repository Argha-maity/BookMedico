import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

if (process.env.NODE_ENV !== 'production') {
  console.log('Loaded env file:', `.env.${process.env.NODE_ENV || 'development'}`);
}
