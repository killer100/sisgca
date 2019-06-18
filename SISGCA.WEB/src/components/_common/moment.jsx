import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function Moment(props) {
    let dateFormatted = '';
    let { date, format } = props;
    if (!format)
        format = 'DD/MM/YYYY';

    if (!date || date === '') {
        dateFormatted = '-';
    } else if (moment(date, format, true).isValid()) {
        dateFormatted = date;
    } else {
        dateFormatted = moment(date).format(format);
    }
    return (<span>{dateFormatted}</span>);
}


Moment.propTypes = {
    date: PropTypes.string,
    format: PropTypes.string
};


export default Moment;
