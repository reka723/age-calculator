import { useForm } from "react-hook-form";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Form.css";
import { RxDoubleArrowDown } from "react-icons/rx";
import Field from "./Field";
import { schema, schemaThisYear, schemaThisYearAndMonth } from "./Schemas";
import classnames from "classnames";

const today = new Date();

export default function Form(props) {
  const [thisYearAndMonth, setThisYearAndMonth] = React.useState(false);
  const [thisYear, setThisYear] = React.useState(false);

  var myResolver = schema;
  if (thisYearAndMonth) myResolver = schemaThisYearAndMonth;
  if (thisYear) myResolver = schemaThisYear;

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(myResolver),
  });

  const onSubmit = (data) => {
    const birthDate = new Date(data.year, data.month - 1, data.day);
    const diff = today - birthDate;
    var diffYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    if (diffYears <= 0) {
      diffYears = 0;
    }
    var diffMonths = Math.floor(
      (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
    );
    if (diffMonths <= 0) {
      diffMonths = 0;
    }
    var diffDays = Math.floor(
      (diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    if (diffDays <= 0) {
      diffDays = 0;
    }
    const age = { years: diffYears, months: diffMonths, days: diffDays };
    props.setAge(age);
  };

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (
        value.year.toString() == today.getFullYear().toString() &&
        value.month.toString() == (today.getMonth() + 1).toString()
      ) {
        setThisYearAndMonth(true);
        setThisYear(false);
      } else if (value.year.toString() == today.getFullYear().toString()) {
        setThisYear(true);
        setThisYearAndMonth(false);
      } else {
        setThisYear(false);
        setThisYearAndMonth(false);
        clearErrors();
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-input-container">
        <Field
          className={classnames({ error: errors.year })}
          register={register}
          errors={errors.year}
          name="year"
          label="Year"
          placeholder="YYYY"
        />
        <Field
          className={classnames({ error: errors.month })}
          register={register}
          errors={errors.month}
          name="month"
          label="Month"
          placeholder="MM"
        />
        <Field
          className={classnames({ error: errors.day })}
          register={register}
          errors={errors.day}
          name="day"
          label="Day"
          placeholder="DD"
        />
      </div>
      <div className="form-error-container"></div>
      <div className="button-container">
        <button type="submit">
          <RxDoubleArrowDown size={25} color="white" />
        </button>
      </div>
    </form>
  );
}
