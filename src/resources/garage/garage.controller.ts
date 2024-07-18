import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import GarageService from "@/resources/garage/garage.service";
import Garage from "./garage.interface";

class GarageController implements Controller {
  public pathAPI = "/garages";
  public path = "/garages-db";
  public router: Router = Router();
  private garageService = new GarageService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(`${this.pathAPI}`, this.getFromAPI);
    this.router.get(`${this.path}`, this.getGaragesFromDB);
    this.router.post(
      `${this.path}`,
      this.createGarages
    );
  }

  public getFromAPI = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const garages: Garage[] = await this.garageService.getFromAPI();
      res.status(200).json(garages);
    } catch (error) {
      next(
        new HttpException(
          500,
          `Cannot find the garage. Error details: ${error}`
        )
      );
    }
  };

  private getGaragesFromDB = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const garages: Garage[] = await this.garageService.getGarages();
      res.status(200).json(garages);
    } catch (error) {
      next(
        new HttpException(
          500,
          `Cannot find the garage. Error details: ${error}`
        )
      );
    }
  };

  private createGarages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { garages } = req.body;
      const sanitizedGarages: Garage[] = garages?.map((garage: any) => {
        const { _id, ...rest } = garage;
        return { originalId: _id, ...rest };
      });
      const newGarages = await this.garageService.addGarages(sanitizedGarages);
      res.status(201).json(newGarages);
    } catch (error) {
      next(
        new HttpException(
          400,
          `Cannot create the new garage. Error details: ${error}`
        )
      );
    }
  };
}

export default GarageController;
