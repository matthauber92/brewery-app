import React from 'react';
import { Row, Col, Button } from 'antd';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBeer} from "@fortawesome/free-solid-svg-icons";

const BrewCard = (props) => {
    return (
        <>
            <div className="brew-card card-align">
                <Row className="p-3 ml-4" style={{ width: '95%' }}>
                    <Col span={24}>
                        <FontAwesomeIcon
                            className="beer float-right"
                            icon={faBeer}
                            size="3x"
                        />
                        <div
                            tabIndex={0}
                            className="card-title"
                            onKeyDown={() => props.handleSelect(`/details/${props.id}`)}
                            onClick={() => props.handleSelect(`/details/${props.id}`)}
                        >
                            <div className="d-flex">
                                <span>{props.name}</span>
                            </div>
                        </div>
                        <div>
                            {
                                props.url ? <a href={props.url} target="_blank">{props.url}</a> : 'No Website Url'
                            }
                        </div>
                    </Col>
                    <Col span={24}>
                        <hr />
                        <div className="d-inline-flex">
                            <div>
                                <div className="sub-title">
                                    Type
                                </div>
                                <p className="ml-0">
                                    {props.type.toUpperCase()}
                                </p>
                            </div>
                            <div className="ml-4">
                              <span className="sub-title">
                                  Address
                              </span>
                                <p>{`${props.street ? `${props.street},` : ''} ${props.city}, ${props.state}, ${props.zip}`}</p>
                            </div>
                        </div>
                        <div className="float-right">
                            <Button className="primary-btn" onClick={() => props.handleSelect(`/details/${props.id}`)}>
                                View Details
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default BrewCard;
