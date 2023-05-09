import "./Result.css";
export default function Result(props) {
  return (
    <div className="result-container">
      <div>
        <h2 className="value">{props.age === null ? "--" : props.age.years}</h2>
        <h2>years</h2>
      </div>
      <div>
        <h2 className="value">
          {props.age === null ? "--" : props.age.months}
        </h2>
        <h2>months</h2>
      </div>
      <div>
        <h2 className="value">{props.age === null ? "--" : props.age.days}</h2>
        <h2>days</h2>
      </div>
    </div>
  );
}
