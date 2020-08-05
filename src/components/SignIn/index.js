import React from 'react';
import { PATH, APP_SETTINGS } from '../../config';
import { setToken, setUserEmail, setUserName } from '../../redux/api';

export class SignIn extends React.Component {
    state = {
        email: '',
        password: '',
        show: false,
        error: ""
    };


    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submitForm = (e) => {
        e.preventDefault();
        const {
            email,
            password
        } = this.state;

        fetch(`${APP_SETTINGS.API.URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: email,
                email: email,
                password: password
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.message && !data.success) {
                    this.setState({ show: true });
                    this.setState({ error: data.message });
                }
                else {
                    this.setState({ show: false });
                    this.setState({ error: "" });
                    setToken(data.auth_token);
                    setUserEmail(data.email);
                    setUserName(data.name);
                    this.props.history.push(PATH.HOME);
                }

            })
    }
    render() {
        const { submitForm } = this;
        return (
            <div className="extension-popup-main">
                <div className="extension-popup-main-div">
                    <form onSubmit={submitForm}>
                        <h3 className="ex-popup-h3-main">
                            {"Sign in"}
                        </h3>
                        {
                            this.state.show
                            &&
                            <span className="sign-in-error">
                                {this.state.error}
                            </span>
                        }
                        <div className="sign-in-main-div">
                            <label className="lavel-text">
                                {"Email"}
                            </label>
                            <br />
                            <input onChange={this.handleChange}
                                type="email" autoComplete="on" autoCorrect="on"
                                autoCapitalize="off"
                                spellCheck="false" name="email"
                                className="form-control" placeholder="Enter Name" />
                            <br />
                            <br />
                            <label className="lavel-text">
                                {"Password"}
                            </label>
                            <br />
                            <input onChange={this.handleChange}
                                type="password" name="password" autoComplete='off'
                                className="form-control si-my-form" placeholder="********" />
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="ex-popup-btn-learn">
                            <button>
                                {"Login"}
                            </button>
                        </div>
                        <br />
                    </form>
                </div>
            </div>
        )
    }
}



export default SignIn;
