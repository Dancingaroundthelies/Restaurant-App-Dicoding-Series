import { itActsAsFavoriteRestaurantModel,} from './contract/favoriteRestaurantContract';

let favoriteRestaurant = [];

const FavoriteRestaurantArray = {

    getRestaurant(id) {
        if (!id) {
            return;
        }

        return favoriteRestaurant.find((restaurant) => restaurant.id == id);
    },

    getAllRestaurant() {
        return favoriteRestaurant;
    },

    putRestaurant(restaurant) {
        if (!restaurant.hasOwnProperty('id')) {
            return;
        }

        // make sure id ini belum ada dalam daftar favoriteRestaurant
        if (this.getRestaurant(restaurant.id)) {
            return;
        }

        favoriteRestaurant.push(restaurant);
    },

    deleteRestaurant(id) {
        // cara boros menghapus restaurant dengan copy restaurant yang ada
        // kecuali restaurant dengan id == id
        favoriteRestaurant = favoriteRestaurant.filter((restaurant) => restaurant.id != id);
    },

    searchRestaurants(query) {
        return this.getAllRestaurant()
            .filter((restaurant) => {
                const loweredCaseRestaurantTitle = (restaurant.title || '-').toLowerCase();
                const jammedRestaurantTitle = loweredCaseRestaurantTitle.replace(/\s/g, '');

                const loweredCaseQuery = query.toLowerCase();
                const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

                return jammedRestaurantTitle.indexOf(jammedQuery) !== -1;
            });
    },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
    afterEach(() => favoriteRestaurant = []);

    itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});