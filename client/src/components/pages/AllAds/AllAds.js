import SearchForm from '../../features/SearchForm/SearchForm';
import { getAllAds } from '../../../redux/adsRedux';
import { useSelector } from 'react-redux';
import { Row } from 'react-bootstrap';
import AdSummary from '../../common/AdSummary/AdSummary';

const AllAds = () => {
  const ads = useSelector(getAllAds);
  const sortedAds = [...ads].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      <SearchForm />
      <Row>
        {sortedAds.map(({ _id, title, location, price, image }) => (
          <AdSummary
            key={_id}
            title={title}
            location={location}
            price={price}
            image={image}
            id={_id}
          />
        ))}
      </Row>
    </>
  );
};

export default AllAds;
