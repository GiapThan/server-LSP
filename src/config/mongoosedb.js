import mongoose from "mongoose";

const connect = async () => {
  try {
    let conn = await mongoose.connect(process.env.DB_MONGOOSE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("connect db success", conn.connection.host);
  } catch (error) {
    console.log("connect db failed", error);
  }
};

export default connect;
