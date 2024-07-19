import axios from "axios";
import GarageService from "@/resources/garage/garage.service";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("GarageService", () => {
  let garageService: GarageService;
  const apiUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=bb68386a-a331-4bbc-b668-bba2766d517d&limit=5`;

  beforeEach(() => {
    garageService = new GarageService();
  });

  it("should fetch garages from API and return them", async () => {
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
    const response = { data: { success: true, result: { records: garages } } };
    mockedAxios.get.mockResolvedValue(response);

    const result = await garageService.getFromAPI();

    expect(result).toEqual(garages);
    expect(mockedAxios.get).toHaveBeenCalledWith(apiUrl);
  });

  it("should throw an error when the API call fails", async () => {
    mockedAxios.get.mockRejectedValue(new Error("API call failed"));

    await expect(garageService.getFromAPI()).rejects.toThrow(
      "Unable to get garages."
    );
  });
});
