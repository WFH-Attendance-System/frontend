import moment from "moment";

function formatDate(date) {
    if (!date) return "-";
    return moment(date).format("DD/MM/YYYY");
}

function formatDateApi(date) {
    if (!date) return "-";
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

function formatDateTime(date) {
    if (!date) return "-";
    return moment(date).format("dddd, DD MMMM YYYY HH:mm:ss");
}

function calculateTime(start, end) {
    const diff = moment(end).diff(moment(start));
    const duration = moment.duration(diff);
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return {
        hours,
        minutes,
        seconds,
    };
}

export { formatDate, formatDateApi, formatDateTime, calculateTime };
