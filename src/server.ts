import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';
let server: Server;
// Connection Related Function
async function main() {
  await mongoose.connect(config.mongoose_url as string);

  try {
    server = app.listen(config.port, () => {
      console.log(`PH Unuversity API Connected ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// Unhandled Rejection For Asynchronous Code
process.on('unhandledRejection', () => {
  console.log(`😈 Unhandled Rejection Detected! Shutting Down...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Uncaught Rejection For Synchronous Code
process.on('uncaughtException', ()=>{
  console.log(`😈 Uncaught Rejection Detected! Shutting Down...`);
  process.exit(1)
})

