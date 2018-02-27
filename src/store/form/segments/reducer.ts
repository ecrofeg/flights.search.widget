import {ADD_SEGMENT, SET_AIRPORT_IN_SEGMENT} from '../../actions';
import { SegmentState, segmentState } from '../../../state';
import { SegmentAction } from './actions';
import {AnyAction} from "redux";
import {autocompleteAirportReducer} from "../autocomplete/reducer";

export const addAirportReducer = (state: SegmentState = segmentState, action: AnyAction): SegmentState => {
	return {
		...state,
		'autocomplete': {
			...state.autocomplete,
			[action.autocompleteType]: {
				...state.autocomplete[action.autocompleteType],
				airport: action.payload.airport
			}

		}
	}
};

export default (state: SegmentState[] = [segmentState], action: AnyAction): SegmentState[] => {
	if (action.type === SET_AIRPORT_IN_SEGMENT) {
		return state.map( (item: SegmentState, index: number) => {
			if (index === 0) {
				return addAirportReducer(item, action);
			}
			else {
				return item;
			}
		});
	}

	return state;
};
