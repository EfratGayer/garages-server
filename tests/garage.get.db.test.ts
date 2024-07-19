import GarageService from "@/resources/garage/garage.service";
import GarageModel from "@/resources/garage/garage.model";
import Garage from "@/resources/garage/garage.interface";
import mongoose from "mongoose";

jest.mock("@/resources/garage/garage.model");
const mockedGarageModel = GarageModel as jest.Mocked<typeof GarageModel>;

describe("GarageService", () => {
  let garageService: GarageService;

  beforeEach(() => {
    garageService = new GarageService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch garages from the database and return them", async () => {
    const garages = [
      {
        _id: new mongoose.Types.ObjectId(),
        originalId: "2",
        TESTIME: "",
        cod_miktzoa: 20,
        cod_sug_mosah: 6,
        ktovet: "ד.נ. הנגב",
        menahel_miktzoa: "אליהו ציון",
        miktzoa: "מכונאות רכב דיזל",
        mikud: 85125,
        mispar_mosah: 16,
        rasham_havarot: 570005926,
        shem_mosah: "נירים מוסך הקבוץ",
        sug_mosah: "מוסך מורשה",
        telephone: "054-7916219",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        originalId: "3",
        TESTIME: "",
        cod_miktzoa: 190,
        cod_sug_mosah: 6,
        ktovet: "ד.נ. הנגב",
        menahel_miktzoa: "אליהו ציון",
        miktzoa: "טרקטורים ומכונות ניידות",
        mikud: 85125,
        mispar_mosah: 16,
        rasham_havarot: 570005926,
        shem_mosah: "נירים מוסך הקבוץ",
        sug_mosah: "מוסך מורשה",
        telephone: "054-7916219",
        yishuv: "נירים",
      },
    ];

    mockedGarageModel.find.mockResolvedValue(garages);

    const result = await garageService.getGarages();

    expect(result).toEqual(garages);
    expect(mockedGarageModel.find).toHaveBeenCalled();
  });

  it("should throw an error when the database call fails", async () => {
    mockedGarageModel.find.mockRejectedValue(new Error("Database call failed"));

    await expect(garageService.getGarages()).rejects.toThrow(
      "Unable to get garages"
    );
  });
});
