export const toPrettyDate = (date: string): string => {
    const dateString = new Date(date).toUTCString();
    const indexDayOfWeek = dateString.indexOf(", ");
    return dateString.substr(indexDayOfWeek + 2);
};
