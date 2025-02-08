import moment from "moment";

function formatDate(date) {
    return moment(date).format("DD/MM/YYYY");
}

function formatDateTime(date){
    return moment(date).format("dddd, DD MMMM YYYY HH:mm:ss");
}

function calculateTime(start, end){
    const diff = moment(end).diff(moment(start));
    const duration = moment.duration(diff);
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return {
        hours,
        minutes,
        seconds
    }
}

export { formatDate, formatDateTime, calculateTime };
