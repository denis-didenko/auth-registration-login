import { useContext, useRef, useState } from 'react';
import AuthContext from '../../context/auth';
import FormItem from '../FormItem';

const LoginForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});
	const formRef = useRef();
	const { auth } = useContext(AuthContext);

	const inputChangeHandler = e => {
		setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const formSubmitHandler = async e => {
		e.preventDefault();

		const response = await auth.login(formData.email, formData.password);
		if (response?.data?.error) {
			validateForm(response.data.error);
		} else {
			resetForm();
		}
	};

	const validateForm = responseErrors => {
		Object.keys(errors).forEach(err => {
			if (responseErrors.name === err) {
				setErrors(prev => ({ ...prev, [responseErrors.name]: responseErrors.message }));
			} else {
				setErrors(prev => ({ ...prev, [err]: '' }));
			}
		});
	};

	const resetForm = () => {
		setFormData({ email: '', password: '' });
		formRef.current.reset();
	};

	return (
		<form action='/login' ref={formRef} onSubmit={formSubmitHandler}>
			<h2 className='form-title'>Log in</h2>

			<FormItem name='email' inputType='email' label='Email:' error={errors.email} onInputChange={inputChangeHandler} />
			<FormItem name='password' inputType='password' label='Password:' error={errors.password} onInputChange={inputChangeHandler} />

			<div className='form-submit'>
				<button type='submit'>Submit</button>
			</div>
		</form>
	);
};

export default LoginForm;
