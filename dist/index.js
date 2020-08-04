/*!
 * @jjlib/utils 1.0.3 
 * Copyright 2020-2020 wjj5728. All Rights Reserved
 * https://github.com/wjj5728/rollup-template
 * Licensed under MIT LICENSE
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['@jjlib/utils'] = {}));
}(this, (function (exports) { 'use strict';

  /**test */
  var test = /** @class */ (function () {
      function test() {
          /**a */
          this.a = 0;
          console.log(this.a);
          console.log('this');
          console.log('2222222222222222222222222222222222222222');
      }
      return test;
  }());

  exports.test = test;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
