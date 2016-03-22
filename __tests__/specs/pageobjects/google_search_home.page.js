import {browser,Q} from '../../setup/test_helper';
import di from '../di/container';
let _browser, _configs, _elements;


export default class search_page {
    constructor() {
        browser.endAll();
        _configs = di.container.config;
        _elements = di.container.homePage_ui;
        _browser = browser.init().timeoutsImplicitWait(_configs.defaultTimeout);        
    }
    get browser(){
        return _browser;
    }
    navigate() {
        let deferred = Q.defer();
        _browser.url(_configs.baseUrl)
            .getUrl()
            .then((url) => {
                (url.indexOf("www.google.com") > -1) ? deferred.resolve("navigated") : deferred.reject("navigation failed");
            });
         return deferred.promise;
            
    }
    search() {
        let deferred = Q.defer();
        _browser
            .setValue(_elements.searchbox, _configs.searchTerm)
            .keys(['Enter'])
            .then(() => {
                deferred.resolve("search done");                
            })
        return deferred.promise;
    }

    areThereResults() {
        let deferred = Q.defer();
            _browser
                .getText(_elements.resultStatus).then((result) => {
                    let results = (result.indexOf("results") > -1) ? true : false;
                    let about = (result.indexOf("About") > -1) ? true : false;
                    let seconds = (result.indexOf("seconds") > -1) ? true : false;
                    (results && about && seconds) ? deferred.resolve("found expected results") : deferred.reject("didn't find expected results");
                })            
        return deferred.promise;

    }

    doesItContain(result, searchItem) {
        return (result.indexOf(searchItem) > -1 ? true : false);
    }

    end() {
        _browser.end();
    }
}
