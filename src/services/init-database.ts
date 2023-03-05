import slonikDefault, * as slonikNamespace from "slonik";
import fieldTransformDefault, * as fieldTransformNamespace from "slonik-interceptor-field-name-transformation";
import dbConfig from "../config/database";

const env = process.env.NODE_ENV || "development";
const isProduction = env === "production";

const slonik = isProduction ? slonikDefault : slonikNamespace;
const fieldTransformation = isProduction
  ? fieldTransformDefault
  : fieldTransformNamespace;

export const sql = slonik.sql;

const interceptors = [
  fieldTransformation.createFieldNameTransformationInterceptor({
    format: "CAMEL_CASE",
  }),
];

const db = slonik.createPool(dbConfig[env].database, {
  interceptors: interceptors,
});

export default db;