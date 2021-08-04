import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { store, addFavourites } from 'redux/mainStore';
import movieController from 'controllers/movie.controller';
import { SearchbarComponent as Searchbar } from 'components/Searchbar/Searchbar';
import { CardComponent as CustomCard } from 'components/Card/Card';
import { FavouriteNav } from 'components/FavouriteNav/FavouriteNav';
import { useEffect } from 'react';

function App() {
  const [movies, setMovies] = useState(store.getState().movieList);
  const [movieCount, setMovieCount] = useState(store.getState().moviesCount)
  const [movieToSearch, setMovieToSearch] = useState('');
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);

  useEffect(() => {
    const existingFavourites: any = localStorage.getItem('favourites');
    const array: any = JSON.parse(existingFavourites);
    store.dispatch(addFavourites(array))
  }, []);

  const search = async (e: any) => {
    e.preventDefault();
    setIsLoadingMovies(true);

    await movieController.getMovies('GET', { s: movieToSearch, r: 'json' })
      .then(() => {
        setIsLoadingMovies(false);
        setMovies(store.getState().movieList);
        setMovieCount(store.getState().moviesCount);
      });
  }

  return (
    <Container>
      <FavouriteNav></FavouriteNav>
      <Row style={{ padding: '5rem 0 2rem 0'}}>
        <Col xs={9} lg={6} xl={4}>
          <Searchbar 
          value={ movieToSearch }
          onChange={ (e: any) => { setMovieToSearch(e.target.value) } }
          onClick={ search }
          isLoading={ isLoadingMovies }
          buttonText="Search"
          />
        </Col>
      </Row>
      <Row style={{ padding: '0 0 2rem 0'}}>
      {
        movieCount > 0 ? (
            <Col xs={9} lg={6} xl={4}>
              <span>We found { movieCount } item(s) matching your search</span>
            </Col>
          ) : null
      }
      </Row>
      <Row>
        {
          movieCount > 0 ? movies.map((movie, index) => (
            <Col key={ index } xs={12} sm={6} lg={3} xl={2}>
              <CustomCard 
              id={ movie.imdbID }
              title={ movie.Title }
              poster={ movie.Poster }/>
            </Col>
          )) : null
        }
      </Row>
    </Container>
  );
}

export default App;
