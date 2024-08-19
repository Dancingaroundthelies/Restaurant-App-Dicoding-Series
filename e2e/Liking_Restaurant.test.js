const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('liking one restaurant', async ({ I }) => {
    I.amOnPage('/');

    I.waitForElement('.card-item_title a', 10);

    const firstRestaurant = locate('.card-item_title a').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.waitForElement('#likeButton', 10);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.waitForElement('.card-item');

    const likedRestaurantTitle = await I.grabTextFrom('.card-item_title a');

    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unliking one restaurant', async ({ I }) => {
    I.amOnPage('/');

    I.waitForElement('.card-item_title a');

    const firstRestaurant = locate('.card-item_title a').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.waitForElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.waitForElement('.card-item');

    const likedRestaurantTitle = await I.grabTextFrom('.card-item_title a');

    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

    I.waitForElement('.card-item_title a');
    I.click(firstRestaurant);

    I.waitForElement('#likeButton', 10);
    I.click('#likeButton');

    I.amOnPage('/#/favorite');

    I.dontSeeElement('.card-item_title a');
});