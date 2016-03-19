import {browser, config, Q} from '../../setup/test_helper';
import uimap from '../uimap/google_search_shopping.uimap';

let _browser, _configs, _elements;

export default class shopping_page {
    constructor(browser) {
        _configs = new config();
        _browser = browser;
        _elements = new uimap();
    }
    navigate() {
        let deferred = Q.defer();
        _browser
        .click("="+_elements.shoppingTab)
        .click("="+_elements.phoneModel)
        .elements(_elements.results)
        .then((elements)=>{
            (elements.value.length>0)?deferred.resolve():deferred.reject("no such element - "+_elements.results);
        },(error)=>{
            deferred.reject(error);
        })
        return deferred.promise;
    }
}