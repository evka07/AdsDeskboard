import { useDispatch, useSelector } from 'react-redux';

import { addAdRequest } from '../../../redux/adsRedux';
import AdForm from '../../common/AdForm/AdForm';
import { checkIfLoggedIn } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';
const CreateAdForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => checkIfLoggedIn(state));
  const navigate = useNavigate();
  const handleSubmit = date => {
    dispatch(addAdRequest({ ...date, user: user.login }));
    navigate('/');
  };

  return <AdForm action={handleSubmit} actionText='Create Advert' />;
};

export default CreateAdForm;
