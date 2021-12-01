//#region IMPORTS
import FormInput from "./FormInput"
import Button from "./Button"
//#endregion IMPORTS

export default function Form({inputs, buttons, id, className}) {
  return (
    <form id={id} className={className}>
      {inputs && inputs.map(input => {
        return <FormInput
          id={input.id}
          label={input.label}
          type={input.type}
          onChange={input.onChange}
          inputClasses={input.inputClasses}
          required={input.required}
        />
      })}

      {buttons && (
        <div className={buttons.className} id={buttons.id}>
          {buttons.buttons.map(button => {
            return <Button
              text={button.text}
              onClick={button.onClick}
              classes={button.classes}
            />
          })}
        </div>)
      }
    </form>
  )
}