import { Form, Button, Row, Col } from 'react-bootstrap';
import styles from './SearchForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SearchForm = () => {
  const navigate = useNavigate();
  const [searchPhrase, setSearchPhrase] = useState('');

  const handleSearch = () => {
    navigate(`/search/${searchPhrase}`);
  };
  return (
    <Form className={styles.search}>
      <Row className='g-1'>
        <Col sm={12} lg={8}>
          <Form.Control
            className={styles.form}
            type='text'
            placeholder='Type and find...'
            value={searchPhrase}
            onChange={e => {
              setSearchPhrase(e.target.value);
            }}
          />
        </Col>
        <Col sm={12} lg={3} className={styles.buttonCol}>
          <Button className={styles.button} onClick={handleSearch}>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
