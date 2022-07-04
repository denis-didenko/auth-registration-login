import { useContext, useState, useRef } from 'react';
import AuthContext from '../../context/auth';
import FormItem from '../FormItem';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const formRef = useRef();
    const { auth } = useContext(AuthContext);

    const inputChangeHandler = e => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const formSubmitHandler = async e => {
        e.preventDefault();

        const response = await auth.register(formData);
        console.log('response: ', response);
        if (!response) return;
        if (response?.data?.errors) {
            validateForm(response.data.errors);
        } else {
            resetForm();
        }
    };

    const validateForm = responseErrors => {
        const errorNames = Object.keys(responseErrors);

        Object.keys(errors).forEach(err => {
            if (errorNames.includes(err)) {
                setErrors(prev => ({ ...prev, [err]: responseErrors[err].msg }));
            } else {
                setErrors(prev => ({ ...prev, [err]: '' }));
            }
        });
    };

    const resetForm = () => {
        setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
        formRef.current.reset();
    };

    return (
        <form action='/register' ref={formRef} onSubmit={formSubmitHandler}>
            <h2 className='form-title'>Register</h2>

            <FormItem name='firstName' label='First name:' error={errors.firstName} onInputChange={inputChangeHandler} />
            <FormItem name='lastName' label='Last name:' error={errors.lastName} onInputChange={inputChangeHandler} />
            <FormItem name='email' inputType='email' label='Email:' error={errors.email} onInputChange={inputChangeHandler} />
            <FormItem name='password' inputType='password' label='Password:' error={errors.password} onInputChange={inputChangeHandler} />
            <FormItem
                name='confirmPassword'
                inputType='password'
                label='Confirm password:'
                error={errors.confirmPassword}
                onInputChange={inputChangeHandler}
            />

            <div className='form-submit'>
                <button type='submit'>Submit</button>
            </div>
        </form>
    );
};

export default RegisterForm;
