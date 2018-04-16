import * as React from 'react';
import { FormEvent } from 'react';
import { Moment } from 'moment';
import DatePicker, { ReactDatePickerProps } from '@nemo.travel/react-datepicker';
import * as classnames from 'classnames';

import Tooltip from './Tooltip';
import { isIE } from '../../utils';
import { DatepickerFieldType } from '../../state';

interface Props {
	date: Moment;
	specialDate?: Moment;
	isDisableable: boolean;
	tooltipIsActive: boolean;
	isActive: boolean;
	tooltipText: string;
	type: DatepickerFieldType;
	inputProps: any;

	selectDate: (date: Moment, dateType: DatepickerFieldType, segmentId: number) => any;
	getRef?: (inout: any) => any;
}

interface State {
	isActive: boolean;
}

type DatepickerProps = Props & ReactDatePickerProps;

export default class Datepicker extends React.Component<DatepickerProps, State> {
	public static dateFormat = 'DD.MM.YYYY';
	public static dateFormatForHeader = 'MMMM, YYYY';
	public calendar: any = null;

	state: State = {
		isActive: false
	};

	constructor(props: DatepickerProps) {
		super(props);

		this.state = {
			isActive: !!props.date || !props.isDisableable
		};

		this.enable = this.enable.bind(this);
		this.disable = this.disable.bind(this);
	}

	/**
	 * Prepare internal state.
	 *
	 * @param nextProps
	 */
	componentWillReceiveProps(nextProps: DatepickerProps): void {
		this.setState({
			isActive: !!nextProps.date || !nextProps.isDisableable
		} as State);
	}

	/**
	 * Activate datepicker on focus.
	 */
	enable(): void {
		if (this.props.isDisableable && !this.state.isActive) {
			this.setState({ isActive: true });
		}
	}

	/**
	 * Deactivate datepicker.
	 */
	disable(): void {
		if (this.props.isDisableable && this.state.isActive) {
			this.setState({ isActive: false });
			this.props.selectDate(null, this.props.type, 0);
		}
	}

	renderCloser(): React.ReactNode {
		return this.state.isActive && this.props.isDisableable ?
			<div className="widget-ui-input__closer" onClick={this.disable}/> : null;
	}

	customInputOnFocusHandler(event: FormEvent<HTMLInputElement>): void {
		(event.target as HTMLInputElement).blur();
	}

	/**
	 * Custom input field with wrapper.
	 */
	renderCustomInput(): React.ReactNode {
		const { inputProps, date, isDisableable, getRef, tooltipIsActive, tooltipText } = this.props;
		const formattedDate = date ? date.format('D MMMM, dd') : '';
		const dayOfMonth = date ? date.get('date').toString() : '31';

		if (getRef) {
			inputProps.ref = getRef;
		}

		return <div className="widget-ui-input__wrapper">
			<Tooltip message={tooltipText} isActive={tooltipIsActive} isCentered={true}>
				<input
					type="text"
					className={classnames('form-control widget-ui-input', { 'widget-ui-input_disabled': !this.state.isActive })}
					readOnly={true}
					spellCheck={false}
					value={formattedDate}
					{...inputProps}
					onFocus={this.customInputOnFocusHandler}
					onClick={this.enable}
				/>
			</Tooltip>

			{this.renderCloser()}

			{!isDisableable || !this.state.isActive ? <div className="widget-ui-datepicker__calendar"><span className="widget-ui-datepicker__calendar-inner">{dayOfMonth}</span></div> : null}
		</div>;
	}

	render(): React.ReactNode {
		const { date, locale, specialDate, type } = this.props;
		const NUM_OF_VISIBLE_MONTHS = 2;

		const specialDayClassName = (date: Moment) => {
			return specialDate && date.format('YYYY-MM-DD') === specialDate.format('YYYY-MM-DD') ? 'widget-ui-datepicker__specialDay' : null;
		};

		return <DatePicker
			ref={(calendar: any) => (this.calendar = calendar)}
			disabled={isIE() ? false : !this.state.isActive}
			locale={locale}
			dayClassName={specialDayClassName}
			customInput={this.renderCustomInput()}
			calendarClassName={`widget-ui-datepicker widget-ui-datepicker_${type}`}
			dateFormat={Datepicker.dateFormat}
			dateFormatCalendar={Datepicker.dateFormatForHeader}
			selected={date}
			monthsShown={NUM_OF_VISIBLE_MONTHS}
			onClickOutside={() => date ? null : this.disable()}
			onFocus={this.enable}
			{...this.props}
		>
			{this.props.children}
		</DatePicker>;
	}
}