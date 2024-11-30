import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

// Connection Related Function
async function main() {
  await mongoose.connect(config.mongoose_url as string);

  try {
    app.listen(config.port, () => {
      console.log(`PH Unuversity API Connected ${config.port}`);
    });
  } catch (error) {
    console.log(error)
  }
}

main()

