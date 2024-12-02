import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { isEmailValid, isPasswordStrong, isRequired } from '../../Utils/Validation';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../../Styles/login.scss'
import { NavLink } from 'react-router-dom';

const Login = () => {
    const initialValues = { email: '', password: '' };
    const navigate = useNavigate();
    const [fetchError, setFetchError] = React.useState(null);
    const { login } = useAuth();

    const validate = (values) => {
        const errors = {};

        if (!isRequired(values.email)) {
            errors.email = 'Email is required';
        } else if (!isEmailValid(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!isRequired(values.password)) {
            errors.password = 'Password is required';
        } else if (!isPasswordStrong(values.password)) {
            errors.password = 'Password must be at least 8 characters';
        }

        return errors;
    };

    const handleSubmit = async (credentials) => {
        try {
            await login(credentials);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            setFetchError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                {fetchError && <div className="error-message">{fetchError}</div>}
                <Formik
                    initialValues={initialValues}
                    validate={validate}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field type="email" id="email" name="email" />
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password" />
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>
                        <button type="submit">Login</button>
                    </Form>
                </Formik>
                <div className="forgot-password">
                    <NavLink to="/forgot-password">Forgot password?</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Login;
