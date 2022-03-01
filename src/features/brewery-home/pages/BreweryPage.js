import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {Row, Col, Skeleton} from 'antd';
import BrewCard from "../components/BrewCard";
import BreweryService from "../../../services/brewery/BreweryService";

const BreweryPage = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [breweries, setBreweries] = useState([]);

    useEffect(() => {
        getBreweries();
    }, []);

    const getBreweries = () => {
        setLoading(true);
        BreweryService.GetBreweries('breweries').then((result) => {
                setBreweries(result);
                setLoading(false);
            },
            (error) => {
                console.log(error(error.toString()));
            },
        );
    }

    const navigate = (path) => {
        history.push(path);
    }

    return (
        <>
            <div className="app-page-container">
                {
                    !loading && (
                        <Row gutter={[16, 16]}>
                            {
                                breweries && breweries.map(brewery => (
                                    <Col span={24} key={brewery.id}>
                                        <BrewCard
                                            key={brewery.id}
                                            id={brewery.id}
                                            name={brewery.name}
                                            type={brewery.brewery_type}
                                            street={brewery.street}
                                            city={brewery.city}
                                            state={brewery.state}
                                            zip={brewery.postal_code}
                                            url={brewery.website_url}
                                            handleSelect={(path) => navigate(path)}
                                        />
                                    </Col>
                                ))
                            }
                        </Row>
                    )
                }
                {
                    loading && (
                        <>
                            <Row gutter={[16, 16]}>
                                {
                                    [...Array(12)].map((value, index) => {
                                        return <Col span={24} key={index}>
                                            <div className="loading-item">
                                                <Skeleton active avatar paragraph={{rows: 3}}/>
                                            </div>
                                        </Col>
                                    })
                                }
                            </Row>
                        </>
                    )
                }
            </div>
        </>
    );
}

export default BreweryPage;