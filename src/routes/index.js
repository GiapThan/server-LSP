import userRoute from "./user";
import studentRoute from "./student";

const router = (app) => {
  app.use("/user", userRoute);
  app.use("/student", studentRoute);
};

export default router;
