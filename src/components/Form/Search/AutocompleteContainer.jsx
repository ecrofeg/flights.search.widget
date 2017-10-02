import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as autocompleteActions from 'actions/autocomplete';
import DepartureAutocomplete from 'components/Form/Search/Autocomplete/Departure';
import ArrivalAutocomplete from 'components/Form/Search/Autocomplete/Arrival';

class AutocompleteContainer extends Component {
	render() {
		const { departureAutocomplete, arrivalAutocomplete, system, showErrors } = this.props;
		const {
			swapAirports,
			changeAutocompleteSuggestions,
			changeAutocompleteInputValue,
			sendAutocompleteRequest,
			selectAirport 
		} = this.props.actions;
		
		return <div className="form-group row widget-form-airports">
			<DepartureAutocomplete
				system={system}
				showErrors={showErrors}
				isLoading={departureAutocomplete.isLoading}
				suggestions={departureAutocomplete.suggestions}
				inputValue={departureAutocomplete.inputValue}
				airport={departureAutocomplete.airport}
				swapAirports={swapAirports}
				changeAutocompleteSuggestions={changeAutocompleteSuggestions}
				changeAutocompleteInputValue={changeAutocompleteInputValue}
				sendAutocompleteRequest={sendAutocompleteRequest}
				selectAirport={(airport, autocompleteType) => {
					selectAirport(airport, autocompleteType);

					if (system.autoFocusArrivalAirport && this.arrivalInput) {
						this.arrivalInput.focus();
					}
				}}
			/>
			
			<ArrivalAutocomplete
				system={system}
				showErrors={showErrors}
				isLoading={arrivalAutocomplete.isLoading}
				suggestions={arrivalAutocomplete.suggestions}
				inputValue={arrivalAutocomplete.inputValue}
				airport={arrivalAutocomplete.airport}
				swapAirports={swapAirports}
				changeAutocompleteSuggestions={changeAutocompleteSuggestions}
				changeAutocompleteInputValue={changeAutocompleteInputValue}
				sendAutocompleteRequest={sendAutocompleteRequest}
				selectAirport={selectAirport}
				getRef={(input) => this.arrivalInput = input}
			/>
		</div>
	}
}

export default connect(
	state => {
		return {
			departureAutocomplete: state.form.autocomplete.departure,
			arrivalAutocomplete: state.form.autocomplete.arrival,
			showErrors: state.form.showErrors,
			system: state.system
		};
	}, 
	dispatch => {
		return {
			actions: bindActionCreators(autocompleteActions, dispatch)
		};
	}
)(AutocompleteContainer);