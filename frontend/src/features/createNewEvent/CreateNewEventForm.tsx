import Input from "../../components/Input";
import "./CreateNewEventForm.css";
import Label from "../../components/Label";
import Select from "../../components/Select";

function CreateNewEventForm(props: {
  formClassName: string;
  inputClassName: string;
  typeText: string;
  typeSelect: string;
  typeDatepicker: string;
  labelName: string;
  labelCategory: string;
  labelDate: string;
  onSetName: Function;
  onSetDate: Function;
  onSetCategory: Function;
  name: string;
  date: string;
  category: string;
  categoryNames: Array<string>;
}) {
  function handleDate(dateString: string) {
  
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hour = dateObject.getHours();
    const minute = dateObject.getMinutes();

    const date = {
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
    };
    props.onSetDate(date);
  }

  return (
    <form className={props.formClassName}>
      <Label text={props.labelName} />
      <Input
        type={props.typeText}
        className={props.inputClassName}
        value={props.name}
        onChange={(e) => props.onSetName(e.target.value)}
      />
      <Label text={props.labelCategory} />
      <Select
        values={props.categoryNames}
        value={props.category}
        onChange={(e) => props.onSetCategory(e.target.value)}
      />
      <Label text={props.labelDate} />
      <Input
        type={props.typeDatepicker}
        className={props.inputClassName}
        onChange={(e) => handleDate(e.target.value)}
      />
    </form>
  );
}

export default CreateNewEventForm;
