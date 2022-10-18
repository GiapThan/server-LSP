import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const client = createClient({
  url: process.env.REDIS_URL,
});

client
  .connect()
  .then(() => {
    console.log("redis ok");
  })
  .catch((err) => {
    console.log("no", err);
  });

export default client;
