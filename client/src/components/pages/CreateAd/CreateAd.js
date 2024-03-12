import { useSelector } from 'react-redux';
import { checkIfLoggedIn } from '../../../redux/usersRedux';
import { Navigate } from 'react-router-dom';
import CreateAdForm from '../../features/CreateAdForm/CreateAdForm';

const AddAd = () => {
  const user = useSelector(state => checkIfLoggedIn(state));

  if (!user) return <Navigate to='/' />;
  return (
    <div>
      <h1>Add your ad!</h1>
      <CreateAdForm />
    </div>
  );
};

export default AddAd;
