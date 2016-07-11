/**
 * ruddyJS JavaScript Library Input Extension v0.0.1
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
    if(String.prototype.isEmpty === undefined){
        String.prototype.isEmpty = function() {
            var s = this.trim();
            return (s == null || s == "" || s.length == 0);
        }
    }

    /**
     * Input extension
     *
     * @returns {Input}
     * @constructor
     */
    var Input = function(){

        if (window === this) {
            return new Input();
        }

    };

    /**
     * Input prototypes
     *
     * @type {{preg_match: Function, inputMatch: Function, emptyInput: Function}}
     */
    Input.prototype = {
        /**
         * preg_match
         *
         * @param regex
         * @param string
         * @returns {boolean}
         */
        preg_match: function preg_match(regex, string)
        {
            regex = (regex) ? regex : this.name;
            var reg = new RegExp(regex);
            return (reg.test(string));
        },

        /**
         * check if two inputs are matched
         *
         * @param input
         * @param callback
         */
        inputMatch: function (input, callback)
        {
            var obj = this.e, bool;

            input.on('keyup', function(){
                bool = (obj.value == this.value);
                if (callback !== undefined) { callback.call(bool); }
                return bool;
            });
        },

        /**
         * Check if an input is empty
         *
         * @param callback
         */
        emptyInput: function (callback)
        {
            var obj = this.e, bool;

            $r(obj).on('blur', function(){
                bool = obj.value.isEmpty();
                if (callback !== undefined) { callback.call(bool); }
                return bool;
            });
        }
    };

    /**
     * extend the Input extension to RuddJS Library
     */
    $r(false).extend(Input);
}($r));