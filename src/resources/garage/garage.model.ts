import { Schema, model } from "mongoose";
import Garage from "@/resources/garage/garage.interface";

const GarageSchema = new Schema(
  {
    originalId: {
      type: String,
      required: [true, "ID is required"],
      trim: true,
    },
    mispar_mosah: {
      type: Number,
      min: [0, "mispar_mosah must be a positive number"],
    },
    shem_mosah: {
      type: String,
      trim: true,
    },
    cod_sug_mosah: {
      type: Number,
      min: [0, "cod_sug_mosah must be a positive number"],
    },
    sug_mosah: {
      type: String,
      trim: true,
    },
    ktovet: {
      type: String,
      trim: true,
    },
    yishuv: {
      type: String,
      trim: true,
    },
    telephone: {
      type: String,
      match: [/^0[0-9-]{8,10}$/, "telephone is not correct"],
      trim: true,
    },
    mikud: {
      type: Number,
      min: [0, "mikud must be a positive number"],
    },
    cod_miktzoa: {
      type: Number,
      min: [0, "cod_miktzoa must be a positive number"],
    },
    miktzoa: {
      type: String,
      trim: true,
    },
    menahel_miktzoa: {
      type: String,
      trim: true,
    },
    rasham_havarot: {
      type: Number,
      min: [0, "rasham_havarot must be a positive number"],
    },
    TESTIME: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<Garage>("Garage", GarageSchema);
