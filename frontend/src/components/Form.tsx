import Input from "./Input";

function Form(props: {
  formClassName: string;
  inputClassName: string;
  typeText: string;
  typeDatepicker: string;
  onSetName: Function;
  onSetDate: Function;
  onSetCategory: Function;
}) {

  return (
    <form>
      <Input
        type={props.typeText}
        className={props.inputClassName}
        onChange={(e: any) => props.onSetName(e.target.value)}
      />
      <Input
        type={props.typeText}
        className={props.inputClassName}
        onChange={(e: any) => props.onSetCategory(e.target.value)}
      />
      <Input
        type={props.typeDatepicker}
        className={props.inputClassName}
        onChange={(e: any) => props.onSetDate(e.target.value)}
      />
    </form>
  );
}

export default Form;
