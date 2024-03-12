import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getAdById } from '../../../redux/adsRedux';
import { Spinner } from 'react-bootstrap';
import { checkIfLoggedIn } from '../../../redux/usersRedux';
import EditAdForm from '../../features/EditAdForm/EditAdForm';

const EditAd = () => {
  const { id } = useParams();
  const user = useSelector(state => checkIfLoggedIn(state));
  const ad = useSelector(state => getAdById(state, id));
  console.log(ad.user.login);
  console.log(user.login);
  if (!user) return <Navigate to='/' />;
  else
    return (
      <div>
        {ad === undefined ? (
          <Spinner key='spinner' animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        ) : (
          <>
            <h1> Edit your ad!</h1>
            <EditAdForm />
          </>
        )}
      </div>
    );
};

export default EditAd;
