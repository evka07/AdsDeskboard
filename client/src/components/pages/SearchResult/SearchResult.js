import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAllAds } from '../../../redux/adsRedux';
import SearchForm from '../../features/SearchForm/SearchForm';
import AdsList from '../../features/AdsSearch/AdsList';

const SearchResults = () => {
  const { searchPhrase } = useParams();
  const [status, setStatus] = useState('loading'); //loading, success, noMatch
  const ads = useSelector(getAllAds);
  const [searchAds, setSearchAds] = useState([]);

  useEffect(() => {
    const filteredAds = ads.filter(ad =>
      ad.title.toLowerCase().includes(searchPhrase.toLowerCase())
    );
    setSearchAds(filteredAds);
    setStatus('success');
    if ((searchAds.length = 0)) {
      setStatus('noMatch');
    }
  }, [ads, searchPhrase]);

  return (
    <div>
      <SearchForm />
      {status === 'loading' && (
        <Spinner key='spinner' animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}
      {searchAds ? <AdsList ads={searchAds} /> : <div>Halo</div>}
    </div>
  );
};
export default SearchResults;
