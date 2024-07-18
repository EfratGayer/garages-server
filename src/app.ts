import express, { Application } from "express";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import Controller from "@/utils/interfaces/controller.interface";
import ErrorMiddleware from "@/middleware/error.middleware";
import helmet from "helmet";

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initDBConnection();
    this.initMiddleware();
    this.initControllers(controllers);
    this.initErrorHandling();
  }

  private initMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
  }

  private initErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  private async initDBConnection(): Promise<void> {
    try {
      const { MONGO_PATH } = process.env;

      let db = await mongoose.connect(`${MONGO_PATH}`);

      if (db) {
        console.log("DB is connected.");
      } else {
        throw "";
      }
    } catch (error: any) {
      console.error(`Connection to DB Failed:  ${error}`);
    }
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}
export default App;
