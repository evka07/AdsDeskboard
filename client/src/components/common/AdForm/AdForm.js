import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AdForm = ({ action, actionText, ...props }) => {
  const [title, setTitle] = useState(props.title || '');
  const [content, setContent] = useState(props.content || '');
  const [price, setPrice] = useState(props.price || '');
  const [location, setLocation] = useState(props.location || '');
  const [image, setImage] = useState(props.image || null);
  const [adDate, setAdDate] = useState(new Date());

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    if (Object.keys(errors).length === 0) {
      handleShow();
    }
  };

  const handleClickConfirm = () => {
    handleClose();
    action({
      title,
      content,
      price,
      location,
      date: adDate,
      image,
    });
    navigate('/');
  };
  return (
    <>
      <Form className='col-12 col-sm-6 mx-auto' onSubmit={validate(onSubmit)}>
        <h2>{props.children}</h2>
        <Form.Group className='mb-3' controlId='formTitle'>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            {...register('title', {
              required: true,
              minLength: 10,
              maxLength: 50,
            })}
            type='text'
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
            placeholder='Enter title min: 10 max: 50 characters'
          />
          {errors.title && (
            <small className='d-block form-text text-danger mt-2'>
              This title should be 10 - 50 characters
            </small>
          )}
        </Form.Group>
        <Form.Group className='mb-3' controlId='formContent'>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            {...register('content', { required: true, minLength: 5 })}
            as='textarea'
            value={content}
            onChange={e => {
              setContent(e.target.value);
            }}
            placeholder='Enter content min: 20 max: 1000 characters'
          />
          {errors.content && (
            <small className='d-block form-text text-danger mt-2'>
              This content should be 20 - 1000 characters
            </small>
          )}
        </Form.Group>
        <Form.Group className='mb-3' controlId='formPrice'>
          <Form.Label>Price:</Form.Label>
          <Form.Control
            {...register('price', { required: true })}
            type='number'
            min='0'
            value={price}
            onChange={e => {
              setPrice(e.target.value);
            }}
            placeholder='Enter price'
          />
          {errors.price && (
            <small className='d-block form-text text-danger mt-2'>
              Enter price
            </small>
          )}
        </Form.Group>
        <Form.Group className='mb-3' controlId='formLoc'>
          <Form.Label>Location:</Form.Label>
          <Form.Control
            {...register('location', { required: true })}
            type='text'
            value={location}
            onChange={e => {
              setLocation(e.target.value);
            }}
            placeholder='Enter location'
          />
          {errors.location && (
            <small className='d-block form-text text-danger mt-2'>
              Enter location
            </small>
          )}
        </Form.Group>
        <Form.Group className='mb-3' controlId='formPhoto'>
          <Form.Label>Image:</Form.Label>
          <br />
          <Form.Control
            {...register('image')}
            type='file'
            onChange={e => {
              setImage(e.target.files[0]);
            }}
          />
          {errors.image && (
            <small className='d-block form-text text-danger mt-2'>
              Select photo
            </small>
          )}
        </Form.Group>
        <Button variant='primary' type='submit'>
          {actionText}
        </Button>
        {actionText === 'Create Advert' && (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Congratulation your advert is alive! </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Your advert has been correctly added
              <br />
              Please click the button below to go to the main page
            </Modal.Body>
            <Modal.Footer>
              <Button
                id='confirm-button'
                variant='success'
                onClick={handleClickConfirm}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {actionText === 'Edit Ad' && (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>
                Congratulation your advert has been correctly updated!
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Your advert has been correctly updated
              <br />
              Please click the button below to go to the main page
            </Modal.Body>
            <Modal.Footer>
              <Button
                id='confirm-button'
                variant='success'
                onClick={handleClickConfirm}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Form>
    </>
  );
};

export default AdForm;
