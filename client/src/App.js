import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login/Login';
import NavBar from './components/views/NavBar/NavBar';
import AllAds from './components/pages/AllAds/AllAds';
import Footer from './components/views/Footer/Footer';
import Page from './components/views/Page/Page';
import SingleAd from './components/pages/SingleAd/SingleAd';
import Register from './components/pages/Register/Register';
import Logout from './components/pages/Logout/Logout';
import NotFound from './components/pages/NotFound';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAds } from './redux/adsRedux';
import AddAd from './components/pages/CreateAd/CreateAd';
import SearchResults from './components/pages/SearchResult/SearchResult';
import EditAd from './components/pages/EditAd/EditAd';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  return (
    <Page>
      <Container style={{ flex: '1' }}>
        <NavBar />
        <Routes>
          <Route path={'/'} element={<AllAds />} />
          <Route path={'/ads/:id'} element={<SingleAd />} />
          <Route path={'/ads/add'} element={<AddAd />} />
          <Route path={'/ads/edit/:id'} element={<EditAd />} />
          <Route path={'/search/:searchPhrase'} element={<SearchResults />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/logout'} element={<Logout />} />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </Page>
  );
}

export default App;
