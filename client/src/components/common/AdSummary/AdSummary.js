import { Card, Button, Row, Col } from 'react-bootstrap';
import styles from './AdSummary.module.scss';
import { IMG_URL } from '../../../config';
import { NavLink } from 'react-router-dom';

const AdSummary = ({ title, location, price, image, id }) => {
  return (
    <Col sm={12} lg={6} xl={4}>
      <Card className={styles.advertCard}>
        <Card.Img className={styles.img} variant='top' src={IMG_URL + image} />
        <Card.Body>
          <Card.Title className={styles.title}>{title}</Card.Title>
          <Row className={styles.row}>
            <Col className={styles.price}>
              <b>{price} PLN</b>
            </Col>
            <Col className={styles.location}>{location}</Col>
            <Col className='text-end'>
              <Button className={styles.button} as={NavLink} to={`/ads/${id}`}>
                See more
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AdSummary;
