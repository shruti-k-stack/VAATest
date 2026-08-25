export const toTitleCase = (str: string): string => {
    return str
    .toLowerCase()
    .split(' ')
    .map((word: string): string => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const truncateText = (text: string, maxLength: number): string => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
};