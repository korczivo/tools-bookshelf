import dotenv from 'dotenv';

dotenv.config();

export type envTypes = {
  bcrypt_secret: string;
  port: number;
};

export default <envTypes>{
  bcrypt_secret: process.env.BCRYPT_SECRET,
  port: process.env.PORT || 5000,
};
