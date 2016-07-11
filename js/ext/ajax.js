/**
 * ruddyJS JavaScript Library Ajax Extension v0.0.1
 * jQuery like lightweight version
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.1
 *
 * http://ruddymonkey.com/
 */

(function($r) {
    (function() {
        /**
         * Ajax request polyfill
         */
        if(!window.XMLHttpRequest){

            var AXOs = ['MSXML2.XMLHTTP.6.0', 'MSXML3.XMLHTTP', 'Microsoft.XMLHTTP', 'MSXML2.XMLHTTP.3.0'];
            var correctAXO = null;

            XMLHttpRequest = function() {
                if (correctAXO === null) {
                    var xhr;
                    if (window.ActiveXObject) {
                        for (var i = 0, c = AXOs.length; i < c; i++) {
                            try {
                                xhr = new window.ActiveXObject(AXOs[i]);
                            } catch (e) { xhr = false; }
                            if (xhr) {
                                correctAXO = AXOs[i];
                                return xhr;
                            }
                        }
                    }
                    correctAXO = false;
                }
                if (correctAXO === false) {
                    throw new Error('XMLHttpRequest not supported in this browser');
                }
                return new window.ActiveXObject(correctAXO);
            };

        }
    }());

    /**
     * Ajax extension
     *
     * @returns {Ajax}
     * @constructor
     */
    var Ajax = function(){

        if (window === this) {
            return new Ajax();
        }

    };

    /**
     * Ajax prototypes
     *
     * @type {{pushURL: Function}}
     */
    Ajax.prototype = {
        /**
         * pushState url without refresh
         *
         * @param url
         * @param title
         * @param response
         */
        pushURL: function(url, title, response)
        {
            response = (response !== undefined) ? response : {};
            if (typeof (history.pushState) != "undefined") {
                document.title = title;
                history.pushState(response, title, url);
            } else {
                location.hash = '#'+url;
            }
        }
    };

    /**
     * extend the Ajax extension to RuddJS Library
     */
    $r(false).extend(Ajax);
}($r));