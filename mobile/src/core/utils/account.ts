export const trimAddressPrefix = (addressRS: string): string => {
    const index = addressRS.indexOf('-');
    return addressRS.substr(index + 1);
};
