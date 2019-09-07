/* feedreader.js
 *
 * This is the spec file read by Jasmine. It contains
 * all of the tests run against the application.
 */

/* Placing all of the tests within the $() function, since some of these tests may require DOM elements,
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

     /* The test suite contains a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
     describe('RSS Feeds', function() {

       // This test makes sure that the allFeeds variable has been defined and that it is not empty
       it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* The test that loops through each feed in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a URL defined', function() {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                //or expect(feed.url.length).not.toBe(0);
                expect(feed.url).not.toBe('');
            });
        });

        /* The test loops through each feed in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name defined', function() {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            })
        })
    });


    /* A new test suite named "The menu" */
    describe('The menu', function() {
        const body = document.querySelector('body');

        // The test ensures the menu element is hidden by default.
        it('is hidden by default', function() {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

         /* The test ensures the menu changes visibility when the menu icon is clicked.
          * It has two expectations: does the menu display when clicked and hide when clicked again.
         */
        it('toggles when the menu icon is clicked', function() {
            const menu = document.querySelector('.menu-icon-link');
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });


    /* A new test suite */
    describe('Initial Entries', function() {

        /* The test ensures when the loadFeed
         * function is called and completes its work, there is at least a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test uses Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('are loaded', function() {
                const entry = document.querySelector('.feed .entry');
             expect(entry).toBeDefined();
        });
    });


    /* A new test suite */
    describe('New Feed Selection', function() {
        const feed = document.querySelector('.feed');
        let innerHTMLBefore;

        /* The test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done) {
            loadFeed(0);
            innerHTMLBefore = feed.innerHTML;
            loadFeed(1, done);
        });

        it('changes the content', function() {
            const innerHTMLAfter = feed.innerHTML;
            expect(innerHTMLAfter).not.toEqual(innerHTMLBefore);
        });
    });
}());
