import Input from "./Input";
import "./Form.css";

function Form(props: {
  formClassName: string;
  inputClassName: string;
  typeText: string;
  typeDatepicker: string;
  onSetName: Function;
  onSetDate: Function;
  onSetCategory: Function;
  name: string;
  date: string;
  category: string;
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
    console.log(date)
    props.onSetDate(date);
  }

  return (
    <form className={props.formClassName}>
      <Input
        type={props.typeText}
        className={props.inputClassName}
        value={props.name}
        onChange={(e: any) => props.onSetName(e.target.value)}
      />
      <Input
        type={props.typeText}
        className={props.inputClassName}
        value={props.category}
        onChange={(e: any) => props.onSetCategory(e.target.value)}
      />
      <Input
        type={props.typeDatepicker}
        className={props.inputClassName}
        onChange={(e: any) => handleDate(e.target.value)}
      />
    </form>
  );
}

export default Form;
