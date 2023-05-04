import { useForm } from "react-hook-form";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Form.css";
import Field from "./Field";

const today = new Date();

const schema = yup.object({
  year: yup
    .number()
    .typeError("Wrong input")
    .min(today.getFullYear() - 100)
    .max(today.getFullYear())
    .required("is Required"),
  month: yup.number().typeError("Wrong input").min(1).max(12),
  day: yup.number().typeError("Wrong input").min(1).max(31),
});

const schemaThisYear = yup.object({
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
  day: yup.number().min(1).max(today.getDate()),
});
export default function Form() {
  const [thisYear, setThisYear] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(thisYear ? schemaThisYear : schema),
  });

  const onSubmit = (data) => reset();

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (value.year.toString() == today.getFullYear().toString()) {
        setThisYear(true);
      } else {
        setThisYear(false);
        clearErrors();
      }
    });
    console.log(thisYear);
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-input-container">
        <Field
          register={register}
          errors={errors.year}
          name="year"
          label="Year"
          placeholder="YYYY"
        />
        <Field
          register={register}
          errors={errors.month}
          name="month"
          label="Month"
          placeholder="MM"
        />
        <Field
          register={register}
          errors={errors.day}
          name="day"
          label="Day"
          placeholder="DD"
        />
      </div>
      <div className="form-error-container"></div>
      <button type="submit">Calculate</button>
    </form>
  );
}
