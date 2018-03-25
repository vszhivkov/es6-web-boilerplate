/**
*   Declare the App
*/
class App {
    constructor(document, window) {
        this.doc = document;
        this.win = window;

        this.log();
    };

    /**
    *   App Methods   
    */    
    log() {
        console.log('msg');
    };
};

/**
*   Start the App
*/
const application = new App(document, window);
