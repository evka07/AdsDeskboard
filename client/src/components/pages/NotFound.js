import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
  const navigate = useNavigate();
  const onHandleClick = () => {
    navigate('/');
  };
  return (
    <Container className='my-4'>
      <Row className='text-muted justify-content-center '>
        <Col xs='auto'>The page was not found</Col>
      </Row>
      <Row className='text-center'>
        <Col>
          <button
            className='border border-info rounded-pill p-3 mt-5'
            onClick={onHandleClick}>
            Come back to homepage!
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
