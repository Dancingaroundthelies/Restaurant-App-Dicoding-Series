import FavoriteRestaurantIdb from '../src/scripts/data/favoriteresto-idb';
import * as TestFactories from './helpers/testFactories';

// positif
// Skenario Batal Menyukai Restaurant
describe('Unliking A Restaurant', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(async () => {
        addLikeButtonContainer();
        await FavoriteRestaurantIdb.putRestaurant({
            id: 1,
        });
    });

    afterEach(async () => {
        await FavoriteRestaurantIdb.deleteRestaurant(1);
    });

    // positif
    // Widget untuk batal menyukai Restaurant ditampilkan
    it('should display unlike widget when the restaurant has been liked', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({
            id: 1,
        });

        expect(document.querySelector('[aria-label="unlike this restaurant"]'))
            .toBeTruthy();
    });

    it('should not display like widget when the restaurant has been liked', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({
            id: 1,
        });

        expect(document.querySelector('[aria-label="like this restaurant"]'))
            .toBeFalsy();
    });

    // positif
    // Widget batal menyukai Restaurant ditekan oleh pengguna dan
    // Restaurant dihapus dari daftar Restaurant yang disukai
    it('should be able to remove liked restaurant from the list', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({
            id: 1,
        });

        document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
        expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
    });

    // negatif
    // Ternyata resto tidak ada dalam daftar resto yang disukai.
    it('should not throw error if the unliked restaurant is not in the list', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({
            id: 1,
        });

        // hapus dulu resto dari daftar resto yang disukai
        await FavoriteRestaurantIdb.deleteRestaurant(1);
        // kemudian, simulasikan pengguna menekan widget batal menyukai resto
        document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
        expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
    });
});