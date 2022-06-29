import { useState } from 'react';

const FormItem = ({ name, label, inputType = 'text', error, onInputChange }) => {
	return (
		<div className={error.length ? 'form-item error-item' : 'form-item'}>
			<label htmlFor={name}>{label}</label>
			<div className='form-field'>
				<input type={inputType} name={name} id={name} onBlur={onInputChange} />
			</div>
			<div className='form-error'>{error}</div>
		</div>
	);
};

export default FormItem;
