import { useState } from 'react';
import styles from './PasswordStrength.module.scss';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const strengthLabels = ['weak', 'medium', 'medium', 'strong'];

export const PasswordStrength = ({ onChange }) => {
  const [strength, setStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const getStrength = password => {
    let indicator = -1;

    if (/[a-z]/.test(password)) indicator++;
    if (/[A-Z]/.test(password)) indicator++;
    if (/\d/.test(password)) indicator++;
    if (/[^a-zA-Z0-9]/.test(password)) indicator++;

    if (password.length >= 8) indicator++;

    return strengthLabels[indicator];
  };

  const handleChange = e => {
    setStrength(getStrength(e.target.value));
    onChange(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={`${styles.passwordContainer}`}>
        <Form.Control
          name='password'
          spellCheck='false'
          className={styles.control}
          type={showPassword ? 'text' : 'password'}
          placeholder='Enter password'
          onChange={handleChange}
        />
        <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </div>
      </div>
      <div
        style={{ display: strength !== '' ? 'block' : 'none' }}
        className={`${styles.bars} ${styles[strength]}`}>
        <div></div>
      </div>

      <div className={styles.strength}>
        {strength && `${strength} password`}
      </div>
    </>
  );
};
