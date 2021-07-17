import React from 'react';
import PropTypes from 'prop-types';

function LabelText({ text }) {
	return <span className='text'>{text}</span>;
}

LabelText.propTypes = {
	text: PropTypes.string,
};

export default LabelText;
