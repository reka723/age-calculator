export default function Field(props) {
  const { register, errors, name, label, placeholder } = props;
  return (
    <div className="field-container">
      <label>{label}</label>
      <input type="number" {...register(name)} placeholder={placeholder} />
      {errors && <p>{errors.message}</p>}
    </div>
  );
}
