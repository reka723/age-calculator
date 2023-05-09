import * as yup from "yup";
const today = new Date();
export const schemaThisYear = yup.object({
  year: yup
    .number()
    .typeError("Wrong input")
    .min(today.getFullYear() - 100)
    .max(today.getFullYear())
    .required("is Required"),
  month: yup
    .number()
    .typeError("Wrong input")
    .min(1)
    .max(today.getMonth() + 1),
  day: yup.number().min(1).max(31),
});

export const schemaThisYearAndMonth = yup.object({
  year: yup
    .number("Wrong input")
    .typeError("Wrong input")
    .max(today.getFullYear())
    .required("is Required"),
  month: yup
    .number("Wrong input")
    .typeError("Wrong input")
    .min(1, "Wrong input")
    .max(today.getMonth() + 1),
  day: yup.number().min(1).max(today.getDate()),
});

export const schema = yup.object({
  year: yup
    .number()
    .typeError("Wrong input")
    .min(today.getFullYear() - 100, "Wrong input")
    .max(today.getFullYear(), "Wrong input")
    .required("is Required"),
  month: yup.number().typeError("Wrong input").min(1).max(12),
  day: yup.number().typeError("Wrong input").min(1).max(31),
});
