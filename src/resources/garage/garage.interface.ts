import { Document } from "mongoose";

export default interface Garage extends Document {
  //   _id: number;
  originalId: string;
  mispar_mosah?: number;
  shem_mosah?: string;
  cod_sug_mosah?: number;
  sug_mosah?: string;
  ktovet?: string;
  yishuv?: string;
  telephone?: string;
  mikud?: number;
  cod_miktzoa?: number;
  miktzoa?: string;
  menahel_miktzoa?: string;
  rasham_havarot?: number;
  TESTIME?: string;
}
