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
        const string = 'mitko';
        const arr = [...string];

        console.log(arr);
    };
};

/**
*   Start the App
*/
const application = new App(document, window);
