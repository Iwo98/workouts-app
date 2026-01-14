import z from "zod";

export const transformDatesSchema = () =>
  z.union([z.iso.datetime().transform((val) => new Date(val)), z.date()]);
