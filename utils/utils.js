export function formatDate(dateString) {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}.${month}.${day}`;
}

export function roundByeThousand(number) {
    return Math.floor(number / 1000) * 1000;
}
