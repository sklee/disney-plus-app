import './App.css';
import { Nav } from './components/Nav';
import styled from 'styled-components';
import Banner from './components/Banner';
import Category from './components/Category';
import requests from './api/requests';
import Row from './components/Row';

function App() {
  return (
    <Container>
      <Nav />
      <Banner />
      <Category />
      <Row title="Trending Now" id="IN" fetchUrl={requests.fetchTrending}/>
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated}/>
      <Row title="Action Movies" id="AM" fetchUrl={requests.fetchActionMovies}/>
      <Row title="Comedy Movie" id="CM" fetchUrl={requests.fetchComedMovies}/>
    </Container>
  );
}

export default App;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow: hidden;
  display: block;
  top: 72px;
  padding: 0 calc( 3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index:-1;
  }
`