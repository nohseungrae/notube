import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";
const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads")); //file만 확인
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(localsMiddleware);

app.use(routes.home, globalRouter); // join search about home search ~~
app.use(routes.users, userRouter); //누군가 /user 로 접속하면 userRouter전체를 사용하겠다.
app.use(routes.videos, videoRouter);

export default app;
