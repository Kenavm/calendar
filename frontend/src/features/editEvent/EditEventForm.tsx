import Input from "../../components/Input";
import Label from "../../components/Label";
import Select from "../../components/Select";
import './EditEventForm.css'

function EditEventForm(props: {
  formClassName: string;
  inputClassName: string;
  typeText: string;
  typeSelect: string;
  typeDatepicker: string;
  labelName: string;
  labelCategory: string;
  labelDate: string;
  onSetUpdatedName:Function
  onSetUpdatedDate: Function
  onSetUpdatedCategory: Function;
  nameOfEventToEdit: string;
  dateOfEventToEdit: string;
  categoryOfEventToEdit: string;
  categoryNames: Array<string>;
}) {
  function handleDate(dateString: string) {
    console.log(dateString);
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
    props.onSetUpdatedDate(date);
  }

  return (
    <form className={props.formClassName}>
      <Label text={props.labelName} />
      <Input
        type={props.typeText}
        className={props.inputClassName}
        value={props.nameOfEventToEdit}
        onChange={(e) => props.onSetUpdatedName(e.target.value)}
      />
      <Label text={props.labelCategory} />
      <Select
        values={props.categoryNames}
        value={props.categoryOfEventToEdit}
        onChange={(e) => props.onSetUpdatedCategory(e.target.value)}
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

export default EditEventForm;
