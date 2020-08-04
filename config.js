var pkg = require('./package.json');

var version = pkg.version;

var banner = `/*!
 * ${pkg.name} ${version} 
 * Copyright 2020-${new Date().getFullYear()} wjj5728. All Rights Reserved
 * https://github.com/wjj5728/rollup-template
 * Licensed under MIT LICENSE
 */
`;

exports.name = '@jjlib/utils';
exports.banner = banner;
