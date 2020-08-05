import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { PATH } from '../../config';
import { connect } from 'react-redux';
let price = 0;
class SimpleForm extends React.Component {
    state = {
        checkIn: new Date,
        checkOut: new Date,
        num_of_adults: 1,
        num_of_children: 0,
        hotel_id: 0,
        error: null
    }

    childElement = React.createRef();
    checkInDate = (date) => {
        this.setState({ checkIn: date })
    }
    checkOutDate = (date) => {
        this.setState({ checkOut: date })
    }
    ExampleCustomInput = ({ value, onClick }) => (
        <>
            <button className="example-custom-input" onClick={onClick}>
                {value}
            </button>
            <FontAwesomeIcon icon={faCalendarAlt} />
        </>
    );
    componentDidMount = () => {
        price = 0;
    }
    mySubmit = (values) => {
        //#region Errors Setting
        let errors = {}
        let isError = false;
        if (!values.booking_type) {

            errors = "Booking Type is Missing"
            isError = true
        }
        if (!values.user_name && !isError) {
            errors = "Name is Missing"
            isError = true
        }

        if (!values.email && !isError) {
            errors = "E-mail is Missing"
            isError = true
        }

        // if (!values.hotel && !isError) {
        //     errors = "Select Hotel"
        //     isError = true
        // }
        if (!values.adults && !isError && (values.booking_type === "group")) {
            errors = "Select Number of Adults"
            isError = true
        }
        if (!values.children && !isError && (values.booking_type === "group")) {
            errors = "Select Number of Childrens"
            isError = true
        }
        if (isError) {
            this.setState({ error: errors })
        }
        else {
            this.setState({ error: null })
        }

        if (isError === false) {
            let data = {
                "booking_type": (values.booking_type === "group") ? 1 : 2,
                "name": values.user_name,
                "email": values.email,
                "check_in_date": this.state.checkIn,
                "check_out_date": this.state.checkOut,
                "num_of_adults": (values.booking_type === "group") ? values.adults : 1,
                "num_of_children": (values.booking_type === "group") ? values.children : 0,
                "addtional_instructions": values.addtional_instructions,
                "hotel_id": (values.hotel) ? this.props.hotels.hotelList[values.hotel].id : this.props.hotels.hotelList[this.props.hotelValue].id
            }

            this.props.getBooking(data)
        }
    }

    setPrice = () => {
        const {
            bookingTypeValue,
            hotelValue,
            adultValue,
            childrenValue } = this.props;

        if (hotelValue) {
            let hotel = this.props.hotels.hotelList[hotelValue];
            let adult = 0, children = 0;
            if (adultValue) {
                adult = adultValue;
            }
            if (childrenValue) {
                children = childrenValue;
            }
            if (bookingTypeValue !== "indiviual") {
                price = ((adult * hotel.adult_price) + (children * hotel.child_price))
            }
            else {
                price = (1 * hotel.adult_price)
            }

        }
    }
    render() {
        const {
            pristine,
            reset,
            submitting,
            hotelValue,
            bookingTypeValue } = this.props
        if (this.props.hotels.hotelList.length > 0) {
            this.setPrice();
        }
        //Form Used For Booking Hotel available in Attraction site
        return (

            <form ref={this.childElement} onSubmit={this.props.handleSubmit(this.mySubmit)}>

                <div className="form-body" >

                    <h1>
                        {"BOOK A TRIP"}
                    </h1>
                    {
                        this.state.error
                        &&
                        this.state.error !== null
                        &&
                        <div >
                            <span className="errors">
                                {this.state.error}
                            </span>
                        </div>}
                    {
                        this.props
                        &&
                        this.props.hotels
                        &&
                        this.props.hotels.successBooked === true
                        &&
                        <div>
                            <span className="success">
                                {"Your Hotel is Booked"}
                            </span>
                        </div>}
                    <span className="row booktype">
                        <span className="heading">
                            {"Book a Type"}
                        </span>
                        <span>

                            <label className="label-style">
                                <Field name="booking_type"
                                    component="input" type="radio" value="group" />{' '}
                                {"Group"}
                            </label>
                        </span>
                        <span>
                            <label className="label-style">
                                <Field name="booking_type"
                                    component="input" type="radio" value="indiviual" />{' '}
                                {"Indiviual"}
                            </label>
                        </span>
                    </span>
                    <div className="field-input-div">
                        <Field name="hotel"
                            className="field-input"
                            component="select">
                            <option />
                            {
                                this.props
                                &&
                                this.props.hotels
                                &&
                                this.props.hotels.hotelList
                                &&
                                this.props.hotels.hotelList.map((hotel, index) => {
                                    return (
                                        <option key={index}
                                            value={index}>
                                            {hotel.name}
                                        </option>
                                    )
                                })
                            }
                        </Field>
                    </div>
                    <div className="field-input-div">
                        <Field
                            className="field-input"
                            name="user_name"
                            component="input"
                            type="text"
                            placeholder="Name"
                        />
                    </div>

                    <div className="field-input-div">
                        <Field
                            className="field-input"
                            name="email"
                            component="input"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    {
                        bookingTypeValue !== "indiviual"
                        &&

                        <div className="field-input-div drop-row">
                            <Field name="adults"
                                className="field-input-half" component="select">
                                <option>
                                    {"Select Number Of Adults"}
                                </option>
                                <option value={1}>
                                    {"01 Adult"}
                                </option>
                                <option value={2}>
                                    {"02 Adults"}
                                </option>
                                <option value={3}>
                                    {"03 Adults"}
                                </option>
                                <option value={4}>
                                    {"04 Adults"}
                                </option>
                                <option value={5}>
                                    {"05 Adults"}
                                </option>
                            </Field>
                            <Field name="children"
                                className="field-input-half" component="select">
                                <option>
                                    {"Select Number Of Children"}
                                </option>
                                <option value={0}>
                                    {"00 Children"}
                                </option>
                                <option value={1}>
                                    {"01 Children"}
                                </option>
                                <option value={2}>
                                    {"02 Childrens"}
                                </option>
                                <option value={3}>
                                    {"03 Childrens"}
                                </option>
                                <option value={4}>
                                    {"04 Childrens"}
                                </option>
                                <option value={5}>
                                    {"05 Childrens"}
                                </option>

                            </Field>
                        </div>
                    }
                    <div className="row no-margin no-padding col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6" >
                            <label className="label-style">Check-in</label>
                            <div className=" no-margin">
                                <DatePicker
                                    selected={this.state.checkIn}
                                    onChange={this.checkInDate}
                                    className="red-border"
                                    customInput={<this.ExampleCustomInput />}
                                />
                            </div>

                        </div>
                        <div className="col-5 col-sm-5 col-md-5 col-lg-5" >
                            <label className="label-style">Check-out</label>
                            <DatePicker
                                selected={this.state.checkOut}
                                onChange={this.checkOutDate}
                                className="red-border"
                                customInput={<this.ExampleCustomInput />}
                            />
                        </div>

                    </div>
                    <div className="row no-padding no-margin total-amount-parent col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className=" total-amount col-6 col-sm-6 col-md-6 col-lg-6" >
                            <label>Total Amount</label>
                        </div>
                        <div className=" col-6 col-sm-6 col-md-6 col-lg-6" >
                            <input className="read-only-field" readOnly value={price} />
                        </div>
                    </div>

                    <div className="row no-margin no-padding col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="row no-margin no-padding col-12 col-sm-12 col-md-12 col-lg-12">
                            <Field name="addtional_instructions"
                                className="field-input-area"
                                placeholder="Aditional Instructions"
                                component="textarea" />
                        </div>
                    </div>

                    <div className="row no-margin btn-div">
                        <button className="btn-styles" type="submit" disabled={pristine || submitting}>
                            {"Book"}
                        </button>
                        <button type="button" className="btn-styles" disabled={pristine || submitting} onClick={reset}>
                            {"Cancel"}
                        </button>
                        <Link to={PATH.HOME}>
                            <button type="button" className="btn-styles" onClick={reset}>
                                {"Exit"}
                            </button>
                        </Link>
                    </div>
                </div>
            </form >

        )
    }
}


SimpleForm = reduxForm({
    form: 'simple',
    enableReinitialize: true
})(SimpleForm);
const selector = formValueSelector('simple');
SimpleForm = connect(state => {
    const bookingTypeValue = selector(state, 'booking_type');
    const hotelValue = selector(state, 'hotel');
    const adultValue = selector(state, 'adults');
    const childrenValue = selector(state, 'children');
    return {
        bookingTypeValue,
        hotelValue,
        adultValue,
        childrenValue
    }
})(SimpleForm);
export default SimpleForm;