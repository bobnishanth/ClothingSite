import './input-form.styles.scss'
const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className='group'>
      <input className='form-input' {...otherProps}></input>

      <label
        className={`{${
          otherProps.value.length ? 'shrink' : ''
        }} form-input-label`}
      >
        {label}
      </label>
    </div>
  )
}

export default FormInput