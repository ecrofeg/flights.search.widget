import * as React from 'react';
import * as classnames from 'classnames';

export default ({ value: option, placeholder, readOnly = false }: any) => {
	const airport = option.value;

	return <span className={classnames('widget-form-airports__select__value', { 'widget-form-airports__select__value_readOnly': readOnly })}>
		<div className="widget-form-airports__select__value__placeholder">{placeholder}</div>

		<span className="widget-form-airports__select__value__airportName">
			{airport.name}
		</span>

		{airport.country ?
			<span className="widget-form-airports__select__value__countryName">
				<span className="widget-form-airports__select__value__comma">, </span>
				{airport.country.name}
			</span> :
			null}
	</span>;
};
