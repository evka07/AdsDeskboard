import { Row } from 'react-bootstrap';
import AdsListItem from './AdsListItem';

const AdsList = props => {
  return (
    <Row className='my-3'>
      {props.ads.map(ad => {
        return (
          <AdsListItem
            key={ad._id}
            id={ad._id}
            title={ad.title}
            location={ad.location}
            image={ad.image}
            price={ad.price}
          />
        );
      })}
    </Row>
  );
};

export default AdsList;
