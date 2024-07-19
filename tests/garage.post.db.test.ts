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

  it("should add new garages to the database and return them", async () => {
    const garages = [
      {
        originalId: "1",
        mispar_mosah: 16,
        shem_mosah: "נירים מוסך הקבוץ",
        cod_sug_mosah: 6,
        sug_mosah: "מוסך מורשה",
        ktovet: "ד.נ. הנגב",
        yishuv: "נירים",
        telephone: "054-7916219",
        mikud: 85125,
        cod_miktzoa: 10,
        miktzoa: "מכונאות רכב בנזין",
        menahel_miktzoa: "אליהו ציון",
        rasham_havarot: 570005926,
        TESTIME: "",
      },
      {
        originalId: "2",
        mispar_mosah: 16,
        shem_mosah: "נירים מוסך הקבוץ",
        cod_sug_mosah: 6,
        sug_mosah: "מוסך מורשה",
        ktovet: "ד.נ. הנגב",
        yishuv: "נירים",
        telephone: "054-7916219",
        mikud: 85125,
        cod_miktzoa: 20,
        miktzoa: "מכונאות רכב דיזל",
        menahel_miktzoa: "אליהו ציון",
        rasham_havarot: 570005926,
        TESTIME: "",
      },
    ];

    const bulkWriteResult = {
      upsertedIds: {
        0: new mongoose.Types.ObjectId(),
        1: new mongoose.Types.ObjectId(),
      },
    };

    const newGarages = [
      {
        _id: bulkWriteResult.upsertedIds[0],
        originalId: "1",
        mispar_mosah: 16,
        shem_mosah: "נירים מוסך הקבוץ",
        cod_sug_mosah: 6,
        sug_mosah: "מוסך מורשה",
        ktovet: "ד.נ. הנגב",
        yishuv: "נירים",
        telephone: "054-7916219",
        mikud: 85125,
        cod_miktzoa: 10,
        miktzoa: "מכונאות רכב בנזין",
        menahel_miktzoa: "אליהו ציון",
        rasham_havarot: 570005926,
        TESTIME: "",
      },
      {
        _id: bulkWriteResult.upsertedIds[1],
        originalId: "2",
        mispar_mosah: 16,
        shem_mosah: "נירים מוסך הקבוץ",
        cod_sug_mosah: 6,
        sug_mosah: "מוסך מורשה",
        ktovet: "ד.נ. הנגב",
        yishuv: "נירים",
        telephone: "054-7916219",
        mikud: 85125,
        cod_miktzoa: 20,
        miktzoa: "מכונאות רכב דיזל",
        menahel_miktzoa: "אליהו ציון",
        rasham_havarot: 570005926,
        TESTIME: "",
      },
    ];

    mockedGarageModel.bulkWrite.mockResolvedValue(bulkWriteResult as any);
    mockedGarageModel.find.mockResolvedValue(newGarages);

    const result = await garageService.addGarages(garages as Garage[]);

    expect(result).toEqual(newGarages);
    expect(mockedGarageModel.bulkWrite).toHaveBeenCalledWith(
      garages.map((garage) => ({
        updateOne: {
          filter: { originalId: garage.originalId },
          update: { $setOnInsert: garage },
          upsert: true,
        },
      }))
    );
    expect(mockedGarageModel.find).toHaveBeenCalledWith({
      _id: { $in: Object.values(bulkWriteResult.upsertedIds) },
    });
  });

  it("should throw an error when adding garages fails", async () => {
    mockedGarageModel.bulkWrite.mockRejectedValue(
      new Error("Bulk write failed")
    );

    const garages = [
      {
        originalId: "1",
        mispar_mosah: 16,
        shem_mosah: "נירים מוסך הקבוץ",
        cod_sug_mosah: 6,
        sug_mosah: "מוסך מורשה",
        ktovet: "ד.נ. הנגב",
        yishuv: "נירים",
        telephone: "054-7916219",
        mikud: 85125,
        cod_miktzoa: 10,
        miktzoa: "מכונאות רכב בנזין",
        menahel_miktzoa: "אליהו ציון",
        rasham_havarot: 570005926,
        TESTIME: "",
      },
      {
        originalId: "2",
        mispar_mosah: 16,
        shem_mosah: "נירים מוסך הקבוץ",
        cod_sug_mosah: 6,
        sug_mosah: "מוסך מורשה",
        ktovet: "ד.נ. הנגב",
        yishuv: "נירים",
        telephone: "054-7916219",
        mikud: 85125,
        cod_miktzoa: 20,
        miktzoa: "מכונאות רכב דיזל",
        menahel_miktzoa: "אליהו ציון",
        rasham_havarot: 570005926,
        TESTIME: "",
      },
    ];

    await expect(garageService.addGarages(garages as Garage[])).rejects.toThrow(
      "Failed to add garages: Error: Bulk write failed"
    );
  });
});
