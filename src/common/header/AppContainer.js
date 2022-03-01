import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBeer} from "@fortawesome/free-solid-svg-icons";

class AppContainer extends React.PureComponent {

    render() {
        return (
            <>
                <div className="MainContainer">
                    <div className="header">
                        <div className="header-title">
                            <span>&Culture Brewing App</span>
                            <FontAwesomeIcon
                                className="mt-1 ml-2"
                                icon={faBeer}
                                size="1x"
                            />
                        </div>
                    </div>
                    <div className="app-container">
                        {this.props.children}
                    </div>
                </div>
            </>
        );
    }
}

AppContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

AppContainer.defaultProps = {
};


export default AppContainer;