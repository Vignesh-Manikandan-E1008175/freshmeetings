import { AlternateTzFormat } from "./types";

export const isAlternateTzFormat = (timezone: string | AlternateTzFormat): timezone is AlternateTzFormat => {
  return (timezone as AlternateTzFormat).value !== undefined;
}