import userRoute from "./user";
import adminRoute from "./admin";

const router = (app) => {
  app.use("/api/user", userRoute);
  app.use("/admin", adminRoute);
};

export default router;
