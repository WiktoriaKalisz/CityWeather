import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); 

const nextConfig = {
  env: {
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
  },
};

module.exports = nextConfig;