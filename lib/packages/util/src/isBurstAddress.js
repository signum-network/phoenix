/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
var isValid_1 = require("./isValid");
/**
 * Validation Check. Quick validation of Burst addresses included
 * @param address Burst Address
 */
exports.isBurstAddress = function (address) {
    return /^BURST\-[A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{5}/i.test(address) && isValid_1.isValid(address);
};
