import React, { useState } from 'react';
import './Card.css';
import { Card, CloseButton, Col, Row } from 'react-bootstrap';
import { store } from 'redux/mainStore';
import movieController from 'controllers/movie.controller';

export function CardComponent({ ...args }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isFavourited, setIsFavourited] = useState(false);

    const loadMovie = async (id = null) => {
        if (!id) return;
        await movieController.getMovie('GET', { i: args.id, r: 'json', plot: 'full' })
            .then(() => setIsFavourited(store.getState().movieDetails.isFavourited));
    };

    const addAsFavourite = async () => {
        await movieController.addAsFavourite({
            id: store.getState().movieDetails.imdbID,
            title: store.getState().movieDetails.title,
        })
        .then(() => setIsFavourited(true))
        .catch((error) => { console.log(error )});
    };

    const removeAsFavourite = async () => {
        await movieController.removeAsFavourite( store.getState().movieDetails.imdbID )
        .then(() => setIsFavourited(false))
        .catch((error) => {
            console.log(error);
        });
    }


    return (
        <>
            <Card
             onClick={ async () => {await loadMovie(args.id).then(() => setIsOpen(true)); }}
             style={{ width: '200px', maxHeight: '300px', margin: '0 auto', cursor: 'pointer', border: 'none', marginBottom: '2rem' }}>
                <Card.Img variant="top" src={ args.poster } style={{ height: '300px' }}/>
            </Card>

            {
                isOpen ? (
                    <div className="details">
                        <div className="details__body">
                            <CloseButton 
                             className="details__close-button"
                             onClick={ () => setIsOpen(false) }/>

                            <img 
                             src={ args.poster } 
                             className="details__image"
                             alt="" />

                             <div className="details__title">
                                 <h1>
                                    { store.getState().movieDetails.title }
                                    {
                                        isFavourited ? (<span><i onClick={ removeAsFavourite } className="fa fa-heart" style={{ color: 'red' }}></i></span>) : (<span><i onClick={ addAsFavourite } className="fa fa-heart" style={{ color: 'grey' }}></i></span>)
                                    }
                                </h1>
                                 <span className="details__span--meta">{ store.getState().movieDetails.year }</span>
                                 <span className="details__span--meta">{ store.getState().movieDetails.runtime }</span>
                                 <span className="details__span--meta">rated { store.getState().movieDetails.rated }</span>
                                 <span className="details__span--meta">imdb rating of { store.getState().movieDetails.imdbRating }</span>
                             </div>

                             <Row>
                                 <Col>
                                    <span className="details__span--meta">Actors: { store.getState().movieDetails.actors }</span>
                                 </Col>
                             </Row>

                             <Row className="details__plot">
                                 <Col>
                                    <p>{ store.getState().movieDetails.plot }</p>
                                 </Col>
                             </Row>
                        </div>
                    </div>
                ) : null
            }
        </>
    );
};