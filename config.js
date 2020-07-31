var pkg = require('./package.json');

var version = pkg.version;

var banner = `/*!
 * ${pkg.name} ${version} (https://github.com/jdeseva/@jsmini/util-tools)
 * API https://github.com/jdeseva/@jsmini/util-tools/blob/master/doc/api.md
 * Copyright 2020-${new Date().getFullYear()} jdeseva. All Rights Reserved
 * Licensed under MIT (https://github.com/jdeseva/@jsmini/util-tools/blob/master/LICENSE)
 */
`;

exports.name = '@jjlib/utils';
exports.banner = banner;
