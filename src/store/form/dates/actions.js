import { SELECT_DATE, TOGGLE_DATEPICKER } from 'store/actions';

function getDateByType(state, dateType) {
	return state.form.dates[dateType].date;
}

/**
 * Some wrapper for `SELECT_DATE` action.
 * 
 * @param {Moment|null} date
 * @param {String} dateType
 * @returns {Function}
 */
export function datepickerChange(date, dateType) {
	return (dispatch, getState) => {
		const state = getState();
		
		// If the new departure date is `bigger` than the selected return date,
		// clear the return date.
		if (dateType === 'departure') {
			let anotherDate = getDateByType(state, 'return');
			
			if (anotherDate && anotherDate.isBefore(date)) {
				dispatch(selectDate(null, 'return'));
				dispatch(toggleDatePicker(false, 'return'));
			}
		}
		// Do the same thing if the selected departure date is `smaller` than the new return date.
		else if (dateType === 'return') {
			let anotherDate = getDateByType(state, 'departure');

			if (anotherDate && anotherDate.isAfter(date)) {
				dispatch(selectDate(date, 'departure'));
			}
		}

		// Update new date.
		dispatch(selectDate(date, dateType));
	};
}

export function selectDate(date, dateType) {
	return {
		type: SELECT_DATE,
		dateType,
		payload: {
			date
		}
	};
}

export function toggleDatePicker(isActive, dateType) {
	return {
		type: TOGGLE_DATEPICKER,
		dateType,
		payload: {
			isActive
		}
	};
}