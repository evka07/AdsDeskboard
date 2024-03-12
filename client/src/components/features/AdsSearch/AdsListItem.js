import { Card, Button, Row, Col } from 'react-bootstrap';
import { IMG_URL } from '../../../config';
import styles from './AdsListItem.module.scss';
import { useNavigate } from 'react-router-dom';

const AdsListItem = props => {
  const navigate = useNavigate();
  const handleNavigate = id => {
    navigate(`/ads/${id}`);
  };

  return (
    <Col sm={12} lg={6} xl={4}>
      <Card className={styles.advertCard}>
        <Card.Img variant='top' src={`${IMG_URL}/${props.image}`} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Row className={styles.row}>
            <Col>
              <b>{props.price} PLN</b>
            </Col>
            <Col>{props.location}</Col>
            <Col className='text-end'>
              <Button
                className={styles.button}
                onClick={() => handleNavigate(props.id)}>
                See more
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default AdsListItem;
