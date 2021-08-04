import { AxiosParams } from "interfaces/params.interface";
import { store, setMovies, addMovieDetails, addMovieAsFavourite, removeMovieAsFavourite } from "redux/mainStore";

export class MovieService {
    private config: any;
    private url: URL = new URL('https://movie-database-imdb-alternative.p.rapidapi.com');
    private method: string | undefined;
    private headers: Headers | undefined;

    constructor(method: string | null = null, params: AxiosParams | null = null ) {
        if (method && params) {
            const paramKeys = Object.keys(params);
            const paramValues = Object.values(params);

            paramKeys.forEach((key, index) => {
                this.url.searchParams.append(key, paramValues[index]);
            });

            this.method = method;
            this.headers = new Headers();
            this.headers.append('x-rapidapi-key', `${process.env.REACT_APP_RAPID_API_KEY}`);
            this.headers.append('x-rapidapi-host', `${process.env.REACT_APP_RAPID_API_HOST}`);

            this.config = {
                "method": `${this.method}`,
                "mode": 'cors',
                "headers": this.headers
            };
        }
    }

    async getMovies() {
        try {
            await fetch(this.url.toString(), this.config)
            .then((response) => response.json())
            .then((json) => {
                const { Search} = json;
                store.dispatch(setMovies({
                    data: Search.filter((movie: any) => movie.Poster !== 'N/A'),
                    count: Search.length,
                }));
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getMovie() {
        try {
            await fetch(this.url.toString(), this.config)
                .then((response) => response.json())
                .then((json) => {
                    const favouritesList = localStorage.getItem('favourites');
                    let isFavourited: boolean = false;

                    if (favouritesList) {
                        const array = JSON.parse(favouritesList);

                        if (array.find((item: any) => item.id === json.imdbID) !== undefined) {
                            isFavourited = true;
                            json.isFavourited = isFavourited;
                        } else {
                            json.isFavourited = false;
                        }
                    }
                    
                    store.dispatch(addMovieDetails(json));
                });
        } catch (error) {
            console.log(error);
        }
    }

    async addAsFavourite(item: any) {
        try {
            store.dispatch(addMovieAsFavourite(item));
        } catch (error) {
            console.log(error);
        }
    }

    async removeAsFavourite(item: any) {
        try {
            store.dispatch(removeMovieAsFavourite(item));
        } catch (error) {
            console.log(error);
        }
    }
}