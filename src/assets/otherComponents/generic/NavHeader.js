import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../../config';
import { removeToken, removeUserEmail, removeUserName, getToken } from '../../../redux/api';

export function NavHeader(props) {

    const logOut = (e) => {
        e.preventDefault();
        removeToken();
        removeUserEmail();
        removeUserName();
        props.history.push(PATH.HOME);
    }

    return (
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-light north-nav">
                <Link to={PATH.HOME}
                    className="navbar-brand north-nav-brand">
                    {"Travel North"}
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mr-left-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link to={PATH.HOME} className="nav-link">
                                {"Home"}
                                <span className="sr-only">
                                    {"(current)"}
                                </span>
                            </Link>
                        </li>
                        {
                            getToken() === null
                            &&
                            <li className="nav-item">
                                <Link to={PATH.SIGNIN} className="nav-link">
                                    {"Sign-in"}
                                </Link>
                            </li>
                        }
                        {
                            getToken() !== null
                            &&
                            <li onClick={logOut} className="nav-item">
                                <div className="nav-link">
                                    {"Sign-Out"}
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}