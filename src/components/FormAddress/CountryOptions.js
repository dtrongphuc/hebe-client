import React from 'react';
import countries from 'utils/countries';

export default function CountryOptions() {
	return countries.map((country) => (
		<option value={country} key={country}>
			{country}
		</option>
	));
}
