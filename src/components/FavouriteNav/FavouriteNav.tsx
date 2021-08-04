import './FavouriteNav.css';
import { store } from 'redux/mainStore';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import movieController from 'controllers/movie.controller';

export function FavouriteNav({ ...args }) {
    const [favourites, setFavourites] = useState<any>(null);

    store.subscribe(() => {
        setFavourites(store.getState().movieFavourites);
    });

    const removeAsFavourite = async (id: string) => await movieController.removeAsFavourite(id)

    return (
        <div className="favourite__nav">
            <h1>Favourites</h1>
            <ul className="favourite__item-list">
                {
                   favourites ? favourites.map((movie: any) => (
                            <li className="favourite__item">
                                <span>{ movie.title }</span>
                                <span>
                                    <Button variant="outline-danger" onClick={() => { removeAsFavourite(movie.id) }}>Remove</Button>
                                </span>
                            </li>
                        )) : null
                }
            </ul>
        </div>
    )
}