import { AxiosParams } from "interfaces/params.interface";
import { MovieService } from "services/movie.service";

class MovieController {
    async getMovies(method: any, params: AxiosParams) {
        const movieService: MovieService = new MovieService(method, params);
        await movieService.getMovies();
    }

    async getMovie(method: any, params: AxiosParams) {
        const movieService: MovieService = new MovieService(method, params);
        await movieService.getMovie();
    }

    async addAsFavourite(favourite: any) {
        try {
            const movieService: MovieService = new MovieService();
            const existingFavourites: any = localStorage.getItem('favourites');
            let existingFavouritesArray: any, favourites: any[];

            if (existingFavourites) {
                existingFavouritesArray = JSON.parse(existingFavourites);
                favourites = [
                    ...existingFavouritesArray,
                    favourite
                ];
            } else {
                favourites = [favourite ];
            }

            localStorage.setItem('favourites', JSON.stringify(favourites));
            await movieService.addAsFavourite(favourite);
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    async removeAsFavourite(id: string) {
        try {
            const movieService: MovieService = new MovieService();
            const existingFavourites: any = localStorage.getItem('favourites');
            const existingFavouritesArray: any = JSON.parse(existingFavourites);
            const filteredFaouritesList: any = existingFavouritesArray.filter((item: any) => item.id !== id);

            localStorage.setItem('favourites', JSON.stringify(filteredFaouritesList));
            await movieService.removeAsFavourite(filteredFaouritesList);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new MovieController();