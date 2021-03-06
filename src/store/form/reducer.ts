import { AnyAction, combineReducers } from 'redux';
import { SHOW_ERRORS} from '../actions';
import passengers from './passengers/reducer';
import additional from './additional/reducer';
import coupon from './coupon/reducer';
import mileCard from './mileCard/reducer';
import segments from './segments/reducer';
import routeType from './route/reducer';
import gridAutocomplete from './gridAutocomplete/reducer';
import { FormState } from '../../state';
import { ShowErrorsAction } from './actions';

export const showErrorsReducer = (state: boolean = false, { type, payload }: ShowErrorsAction): boolean => {
	return type === SHOW_ERRORS ? payload : state;
};

export default (state: FormState, action: AnyAction): FormState => {
	// Some `form` action handlers goes there.

	return combineReducers<FormState>({
		showErrors: showErrorsReducer,
		segments,
		passengers,
		additional,
		coupon,
		mileCard,
		routeType,
		gridAutocomplete
	})(state, action);
};
