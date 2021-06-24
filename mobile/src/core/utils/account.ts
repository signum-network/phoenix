export const trimAddressPrefix = (addressRS: string): string => {
    const index = addressRS.indexOf('-');
    return addressRS.substr(index + 1);
};

export const shortRSAddress = (addressRS: string): string => {
    const noPrefix = trimAddressPrefix(addressRS);
    const firstIndex = noPrefix.indexOf('-');
    const lastIndex = noPrefix.lastIndexOf('-');
    const middlePart = noPrefix.substring(firstIndex, lastIndex + 1);
    return noPrefix.replace(middlePart, '-...-');
};
