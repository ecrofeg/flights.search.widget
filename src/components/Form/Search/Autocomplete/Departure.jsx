import React from 'react';
import Autocomplete from 'components/Form/Search/Autocomplete';
import { i18n } from 'utils';
import PropTypes from 'prop-types';

export default class Departure extends Autocomplete {
	static propTypes = {
		isLoading: PropTypes.bool,
		suggestions: PropTypes.array,
		inputValue: PropTypes.string,
		airport: PropTypes.object,
		system: PropTypes.object.isRequired,
		showErrors: PropTypes.bool.isRequired,
		changeAutocompleteSuggestions: PropTypes.func.isRequired,
		changeAutocompleteInputValue: PropTypes.func.isRequired,
		sendAutocompleteRequest: PropTypes.func.isRequired,
		selectAirport: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		this.type = 'departure';
		this.placeholder = i18n('form', 'from_full');
		this.mobileTitle = i18n('form', 'from');
		this.tooltipText = i18n('form', 'departureError');
	}
}