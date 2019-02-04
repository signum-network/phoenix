/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
/**
 * Construct a Burst address from a string array
 * @param parts 4 parts string array
 */
exports.constructBurstAddress = function (parts) {
    return 'BURST-' + parts[0] + '-' + parts[1] + '-' + parts[2] + '-' + parts[3];
};
