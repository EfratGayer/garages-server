import GarageModel from "@/resources/garage/garage.model";
import Garage from "@/resources/garage/garage.interface";
import axios, { AxiosResponse } from "axios";

const apiUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=bb68386a-a331-4bbc-b668-bba2766d517d&limit=5`;

class GarageService {
  private garage = GarageModel;

  /**
   * Get Garages from API
   */
  public async getFromAPI(): Promise<Garage[]> {
    try {
      const response: AxiosResponse = await axios.get(apiUrl);      
      const data = response.data;
      if (data.success == true && data?.result) {
        const garages: Garage[] = data?.result?.records || [];
        return garages;
      } else {
        throw "";
      }
    } catch (error: any) {
      throw new Error("Unable to get garages.");
    }
  }

  /**
   * Get All Garages from DB
   */
  public async getGarages(): Promise<Garage[]> {
    try {
      const garages: Garage[] = await this.garage.find();
      return garages;
    } catch (error: any) {
      throw new Error("Unable to get garages");
    }
  }

  /**
   * Add new Garages to DB
   */
  public async addGarages(garages: Garage[]): Promise<Garage[]> {
    try {
      const operations = garages.map((garage) => ({
        updateOne: {
          filter: { originalId: garage.originalId },
          update: { $setOnInsert: garage },
          upsert: true
        }
      }));
      const result = await this.garage.bulkWrite(operations);
      const insertedIds = Object.values(result?.upsertedIds).map((id) => id._id);
      const newGarages = await this.garage.find({ _id: { $in: insertedIds } });
      return newGarages;
    } catch (error) {
      throw new Error(`Failed to add garages: ${error}`);
    }
  }
}

export default GarageService;
