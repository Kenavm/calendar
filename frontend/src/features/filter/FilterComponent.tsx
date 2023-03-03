import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Text from "../../components/Text";
import "./FilterComponent.css";

function FilterComponent(props: {
  categoryNames: Array<string>;
  onFilterEvents: Function;
  fromDate: string;
  toDate: string;
  onSetFromDate: Function;
  onSetToDate: Function;
  onResetEvents: Function;
  onSetChecked: Function;
}) {
  return (
    <div className="filter">
      <Header heading={"FILTER"} />
      <div className="from">
        <Text text={"from"} />
        <Input
          type={"datetime-local"}
          value={props.fromDate}
          onChange={(e) => props.onSetFromDate(e.target.value)}
        />
      </div>
      <div className="to">
        <Text text={"to"} />
        <Input
          type={"datetime-local"}
          value={props.toDate}
          onChange={(e) => props.onSetToDate(e.target.value)}
        />
      </div>
      <div className="futureEvents">
        <Text text={"only future events"} />
        <Input type={"checkbox"} 
        onChange={(e) => props.onSetChecked(e.target.checked)}
        />
      </div>
      <div className="category">
        <Text text={"Category"} />
        <Select values={props.categoryNames} />
      </div>
      <div className="buttonComponent">
      <Button
        name={"Filter"}
        className={"filterButton"}
        onClick={() => props.onFilterEvents()}
      />
      <Button
        name={"Reset"}
        className={"resetButton"}
        onClick={() => props.onResetEvents()}
      />
      </div>
    </div>
  );
}

export default FilterComponent;
