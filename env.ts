import dotenv from 'dotenv';

dotenv.config();

export type envTypes = {
  port: number,
}

export default <envTypes>{
  port: process.env.PORT || 5000,
};
