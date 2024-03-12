import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import styles from './Register.module.scss';
import { API_URL } from '../../../config';
import { PasswordStrength } from '../../features/PasswordStrength/PasswordStrength';

const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError', 'loginError'

  const handleSubmit = e => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('login', login);
    fd.append('password', password);
    fd.append('phone', phone);
    fd.append('avatar', avatar);

    const options = {
      method: 'POST',
      body: fd,
    };

    setStatus('loading');

    fetch(`${API_URL}/auth/register`, options).then(res => {
      if (res.status === 202) {
        setStatus('success');
      } else if (res.status === 400) {
        setStatus('clientError');
      } else if (res.status === 409) {
        setStatus('loginError');
      } else {
        setStatus('serverError');
      }
    });
  };

  return (
    <Card className={styles.card + ' col-12 col-md-6 col-xl-4 mx-auto mt-5'}>
      <Card.Title className='text-center mt-2 fs-1'>Sign up</Card.Title>

      {status === 'success' && (
        <Alert variant='success' className='text-center mt-2'>
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfuly registered you can now log in...</p>
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
          <Alert.Heading>No enough data!</Alert.Heading>
          <p>You have to fill all the fields.</p>
        </Alert>
      )}

      {status === 'loginError' && (
        <Alert variant='warning' className='text-center mt-2'>
          <Alert.Heading>Login already in use</Alert.Heading>
          <p>You have to use other login.</p>
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
            placeholder='Enter login'></Form.Control>
        </Form.Group>

        <Form.Group controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <PasswordStrength onChange={e => setPassword(password)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formPhone'>
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type='tel'
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder='Phone number'></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formAvatar'>
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type='file'
            onChange={e => setAvatar(e.target.files[0])}
          />
        </Form.Group>

        <Button variant='primary' type='submit' className={styles.button}>
          Sign up
        </Button>
      </Form>
    </Card>
  );
};

export default Register;
