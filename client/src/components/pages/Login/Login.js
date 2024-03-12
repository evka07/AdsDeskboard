import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import styles from './Login.module.scss';
import { API_URL } from '../../../config';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null); // null , 'loading', 'success', 'serverError', 'clientError'
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // credentials: 'include',
      body: JSON.stringify({ login, password }),
    };
    setStatus('loading');
    fetch(`${API_URL}/auth/login`, options)
      .then(res => {
        if (res.status === 200) {
          setStatus('success');
          dispatch(logIn({ login }));
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(err => {
        setStatus('serverError');
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className={styles.card + ' col-12 col-md-6 col-xl-4 mx-auto mt-5'}>
      <Card.Title className='text-center mt-2 fs-1'>Sign in</Card.Title>

      {status === 'success' && (
        <Alert variant='success' className='text-center mt-2'>
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfuly logged in!</p>
        </Alert>
      )}

      {status === 'serverError' && (
        <Alert variant='danger' className='text-center mt-2'>
          <Alert.Heading>Something went wrong!</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      )}
      {status === 'clientError' && (
        <Alert variant='danger' className='text-center mt-2'>
          <Alert.Heading>Incorrect data!</Alert.Heading>
          <p>Login or password are incorrect...</p>
        </Alert>
      )}

      {status === 'loading' && (
        <Spinner animation='border' role='status' className='d-block mx-auto'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}

      <Form className='m-3' onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formLogin'>
          <Form.Label>Login</Form.Label>
          <Form.Control
            type='text'
            value={login}
            onChange={e => setLogin(e.target.value)}
            placeholder='Enter login'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <div className={`${styles.passwordContainer}`}>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              value={password}
              className=''
              onChange={e => setPassword(e.target.value)}
              placeholder='Password'
            />
            <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </div>
          </div>
        </Form.Group>
        <Button variant='primary' type='submit' className={styles.button}>
          Sign in
        </Button>
      </Form>
    </Card>
  );
};

export default Login;
