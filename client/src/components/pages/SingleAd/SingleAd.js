import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import styles from './SingleAd.module.scss';
import { useParams, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAdById, removeAdRequest } from '../../../redux/adsRedux';
import { IMG_URL } from '../../../config';
import { checkIfLoggedIn } from '../../../redux/usersRedux';
import { useState } from 'react';

const SingleAd = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const adData = useSelector(state => getAdById(state, id));
  const user = useSelector(state => checkIfLoggedIn(state));
  const date = new Date(adData.date);
  const datePublish = date.toLocaleDateString();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClickRemove = () => {
    handleClose();
    dispatch(removeAdRequest(adData._id));
    navigate('/');
  };
  if (user) {
    console.log(adData.user.login, '+++ user from ad +++');
    console.log(user.login, '--- user from session ---');
  }
  if (!adData) return <Navigate to='/' />;
  return (
    <div className={styles.card}>
      <Card className={styles.adCard}>
        <Card.Img variant='top' src={IMG_URL + adData.image} />
        <Card.Body>
          <Card.Title>{adData.title}</Card.Title>
          <Card.Title>{adData.price} PLN</Card.Title>
          <Card.Text>{adData.location}</Card.Text>
          <Card.Text>{adData.content}</Card.Text>
          <Card.Text>{datePublish}</Card.Text>
          <Row className={styles.row}>
            <Col>
              <img
                className={styles.avatar}
                src={IMG_URL + adData.user.avatar}
                alt=''
              />
            </Col>
            <Col>{adData.user.login}</Col>
            <Col>Tel: {adData.user.phone}</Col>
          </Row>
          {user && user.login === adData.user.login && (
            <Row>
              <Col className='text-end'>
                <Button
                  as={NavLink}
                  to={`/ads/edit/${adData._id}`}
                  className={styles.buttonEdit}>
                  Edit
                </Button>
                <Button className={styles.buttonDelete} onClick={handleShow}>
                  Delete
                </Button>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        className={styles['custom-modal']}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to do that? </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you absolutely certain you want to proceed with this action?
          <br />
          Once completed, this post will be permanently removed from the app!
        </Modal.Body>
        <Modal.Footer>
          <Button id='cancel-button' variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            id='remove-button'
            variant='danger'
            onClick={handleClickRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SingleAd;
