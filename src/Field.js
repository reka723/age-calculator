import "./Field.css";
export default function Field(props) {
  const { register, errors, name, label, placeholder, className } = props;
  console.log(className);
  return (
    <div className="field-container">
      <label className={className}>{label}</label>
      <input type="number" {...register(name)} placeholder={placeholder} />
      {errors && <p>{errors.message}</p>}
    </div>
  );
}
