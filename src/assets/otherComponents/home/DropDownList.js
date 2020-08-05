import React from 'react'
import { Dropdown } from 'react-bootstrap';
export class DropDownList extends React.Component {
    state = {
        country: ""
    }
    selectCountry = (country) => {

        this.setState({ country: country.id });
    }
    componentDidMount = () => {
        this.setState({ country: this.props.locations.country.id })
    }
    render() {
        //Drop Down List Of ALL Countries
        return (
            <Dropdown bsPrefix="dropdown">
                <Dropdown.Toggle bsPrefix="btn btn-secondary search-drop-btn search-drop-btn-sec dropdown-toggle"
                    id="dropdown-custom-components">

                    {this.state.country.title}
                </Dropdown.Toggle>

                <Dropdown.Menu bsPrefix="dropdown-menu search-drop-tab">
                    {/* Setting Drop List Of Countries in Drop Down List */}
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
        )
    }
}
