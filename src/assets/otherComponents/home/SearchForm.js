import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { LoadSpinner } from '../LoadSpinner';
import Autocomplete from 'react-autocomplete';

export class SearchForm extends React.Component {
    state = {
        selectedValue: "Hello",
        country: "",
        value: 'ma',
        attraction_areas: [],
        areaSites: []
    }

    myChangeHandler = (site_area) => {
        this.setState({ selectedValue: site_area });
        if (site_area !== "") {
            this.props.getAttractionsByCountryAndArea(this.state.country.id, site_area);
        }
    }

    selectCountry = (country) => {
        this.props.getSiteAreasByCountry(country.id);
        this.setState({ country: country });
    }

    componentWillReceiveProps = (props) => {
        if (props.locations.country.title !== (this.props.locations.country && this.props.locations.country.title)) {
            this.setState({
                country: props.locations.country
            });
        }
        this.setState({
            selectedValue: props.locations.areaSite,
            areaSites: props.locations.areaSites
        });
    }
    componentDidMount = () => {
        this.setState({
            country: this.props.locations.country
        });
    }
    matchStateToTerm = (state, value) => {
        return (
            state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        )
    }

    matchStateToTermWithHeaders = (state, value) => {
        return (
            state.header ||
            state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        )
    }

    /**
     * An example of how to implement a relevancy-based sorting method. States are
     * sorted based on the location of the match - For example, a search for "or"
     * will return "Oregon" before "North Carolina" even though "North Carolina"
     * would normally sort above Oregon. Strings where the match is in the same
     * location (or there is no match) will be sorted alphabetically - For example,
     * a search for "or" would return "North Carolina" above "North Dakota".
     */
    sortStates = (a, b, value) => {
        const aLower = a.name.toLowerCase()
        const bLower = b.name.toLowerCase()
        const valueLower = value.toLowerCase()
        const queryPosA = aLower.indexOf(valueLower)
        const queryPosB = bLower.indexOf(valueLower)
        if (queryPosA !== queryPosB) {
            return queryPosA - queryPosB
        }
        return aLower < bLower ? -1 : 1
    }

    render() {
        /* Search Bar used for search attraction
         area of Specific country selected from DropDown List */

        return (
            <div className="row no-margin serach-bars">
                <div className="col12 col-sm-12 col-md-6 col-lg-6">
                    {
                        (
                            this.props.locations.success === true
                            &&
                            this.props.locations.countryLoading === false
                        )
                        &&
                        <div className="main">
                            <div className="form-group has-search">
                                <span className="fa fa-search form-control-feedback"></span>
                                <Autocomplete

                                    value={(this.state.country.title === this.props.locations.country.title) ? this.state.selectedValue : ""}
                                    inputProps={{ id: 'states-autocomplete' }}
                                    wrapperStyle={{ position: 'relative', display: 'inline-block' }}
                                    items={this.state.areaSites}
                                    getItemValue={(item) => item.name}
                                    shouldItemRender={this.matchStateToTerm}
                                    sortItems={this.sortStates}
                                    onChange={(event, value) => this.setState({ selectedValue: value })}
                                    //onSelect={value => this.setState({ selectedValue: value })}
                                    onSelect={value => this.myChangeHandler(value)}
                                    renderMenu={children => (
                                        <div className="auto-d-menu">
                                            {children}
                                        </div>
                                    )}
                                    renderItem={(item, isHighlighted) => (
                                        <div
                                            className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                                            key={item.name}
                                        >{item.name}</div>
                                    )}
                                />
                            </div>
                        </div>
                    }
                    {
                        (
                            (
                                this.props.locations.success === false
                                &&
                                this.props.locations.isLoading === true
                            )
                            ||
                            (
                                this.props.locations.success === true
                                &&
                                this.props.locations.countryLoading === true
                            )
                        )

                        &&
                        <LoadSpinner />

                    }
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                    {
                        this.props.locations.success === true
                        &&
                        <Dropdown bsPrefix="dropdown">
                            <Dropdown.Toggle bsPrefix="btn btn-secondary search-drop-btn search-drop-btn-sec dropdown-toggle"
                                id="dropdown-custom-components">

                                {this.state.country.title}
                            </Dropdown.Toggle>

                            <Dropdown.Menu bsPrefix="dropdown-menu search-drop-tab">
                                {
                                    this.props
                                    &&
                                    this.props.locations
                                    &&
                                    this.props.locations.countries
                                    &&
                                    this.props.locations.countries.map(
                                        (country, index) => {
                                            return (
                                                <Dropdown.Item
                                                    key={index}
                                                    onClick={() => { this.selectCountry(country) }}
                                                    bsPrefix="dropdown-item" eventKey={index}>
                                                    {country.title}
                                                </Dropdown.Item>
                                            )
                                        })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                    {
                        this.props.locations.success === false
                        &&
                        this.props.locations.isLoading === true
                        &&
                        <LoadSpinner />

                    }
                </div>
            </div>
        )
    }
}