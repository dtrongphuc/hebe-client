import React from 'react';
import PropTypes from 'prop-types';

function LabelImage({ src }) {
	return <img src={src} alt='' className='image' />;
}

LabelImage.propTypes = {
	text: PropTypes.string,
};

export default LabelImage;
