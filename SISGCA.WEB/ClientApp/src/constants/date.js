import moment from 'moment';

export const dateFormat = 'DD/MM/YYYY';

export function ConvertJsonDate(date) {
    return moment(date).toDate();
}

export function FormatDate(date, format) {
    return moment(date).format(format);
}