import React, {useEffect, useState} from 'react';
import {Row, Col, Button, Tooltip, Skeleton} from 'antd';
import GoogleMapReact from 'google-map-react';
import BreweryService from "../../../services/brewery/BreweryService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationPin} from "@fortawesome/free-solid-svg-icons";

const BreweryDetailPage = (props) => {
    const defaultProps = {
        zoom: 11
    };
    const Location = () => <Tooltip title={brewery.name}>
        <a href={brewery && brewery.website_url ? brewery.website_url : ''} target="_blank">
            <FontAwesomeIcon className="location-pin float-right" icon={faLocationPin} size="3x"/>
        </a>
    </Tooltip>;
    const [loading, setLoading] = useState(false);
    const [brewery, setBrewery] = useState({});

    useEffect(() => {
        getBrewery();
    }, []);

    const getBrewery = () => {
        const id = props.history.location.pathname.split('/')[2];
        setLoading(true);
        BreweryService.GetBrewery(id).then((result) => {
                setBrewery(result);
                setLoading(false);
            },
            (error) => {
                console.log(error(error.toString()));
            },
        );
    };

    const phoneNumberFormatter = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, "");
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 4)}) ${phoneNumber.slice(4)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6
        )}-${phoneNumber.slice(6, 10)}`;
    }

    const handleBack = () => {
        props.history.goBack();
    };

    return (
        <>
            <div className="app-page-container">
                <Row>
                    <Col span={24}>
                        <Row>
                            <Col span={12}>
                                <Button
                                    className="secondary-btn"
                                    type="secondary"
                                    id="secondaryBtn"
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col xs={24} sm={24} md={24} lg={12} className="d-block">
                                <div className="d-flex">
                                    {
                                        loading && (
                                            <Skeleton active paragraph={{rows: 1}}/>
                                        )
                                    }
                                    <div className="route-header" style={{ marginBottom: '5px' }}>
                                        {brewery.name}
                                    </div>
                                </div>
                                <div className="d-block mt-2">
                                    <div className="page-header">{`${brewery.city}, ${brewery.state}`}</div>
                                    <a
                                        target="_blank"
                                        href={brewery ? brewery.website_url : 'No Url'}
                                        style={{ fontSize: '20px' }}
                                    >
                                        {brewery ? brewery.website_url  : 'No Url'}
                                    </a>
                                    <br />
                                    <br />
                                    <div className="detail-list">
                                        <div className="d-flex">
                                            <strong className="page-header">Type:</strong>
                                            {
                                                loading && (
                                                    <Skeleton active paragraph={{rows: 1}}/>
                                                )
                                            }
                                            <p className="p-0 mt-2 ml-2 f-bold" style={{ fontSize: '18px' }}>{brewery && brewery.brewery_type ? brewery.brewery_type.toUpperCase() : null}</p>
                                        </div>
                                        <div className="d-flex">
                                            <strong className="page-header">Contact:</strong>
                                            {
                                                loading && (
                                                    <Skeleton active paragraph={{rows: 1}}/>
                                                )
                                            }
                                            <p className="p-0 mt-2 ml-2 f-bold" style={{ fontSize: '18px' }}>{phoneNumberFormatter(brewery.phone)}</p>
                                        </div>
                                        <div className="d-flex">
                                            <strong className="page-header">Address:</strong>
                                            {
                                                loading && (
                                                    <Skeleton active paragraph={{rows: 1}}/>
                                                )
                                            }
                                            <p className="p-0 mt-2 ml-2 f-bold" style={{ fontSize: '18px' }}>
                                                {`${brewery.street ? `${brewery.street},` : ''} ${brewery.city}, ${brewery.state}, ${brewery.postal_code}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            {
                                brewery && brewery.latitude && brewery.longitude ? (
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <div className="text-center">
                                            <div style={{ height: '50vh', width: '100%' }}>
                                                {
                                                    loading && (
                                                        <Skeleton.Image />
                                                    )
                                                }
                                                <GoogleMapReact
                                                    bootstrapURLKeys={{ key: 'AIzaSyCmmwudELCyx15AxvMreXW3jXAOiUpf4N0'}}
                                                    defaultCenter={{lat: parseFloat(brewery.latitude), lng: parseFloat(brewery.longitude)}}
                                                    defaultZoom={defaultProps.zoom}
                                                >
                                                    <Location
                                                        lat={brewery && parseFloat(brewery.latitude)}
                                                        lng={brewery && parseFloat(brewery.longitude)}
                                                        text="My Marker"
                                                    />
                                                </GoogleMapReact>
                                            </div>
                                        </div>
                                    </Col>
                                ) : (
                                    <Col span={12} className="text-center">
                                        <h1 className="page-header" style={{ marginBottom: '5px', color: '#d5d5d5' }}>No Location to Display</h1>
                                    </Col>
                                )
                            }
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default BreweryDetailPage;