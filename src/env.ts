import dotenv from 'dotenv';

dotenv.config();

export type envTypes = {
  secret: string;
  port: number;
};

export default <envTypes>{
  secret: process.env.SECRET,
  port: process.env.PORT || 5000,
};
