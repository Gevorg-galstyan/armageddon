import React, {useEffect} from "react";
import {Button, Col, Row, Spinner} from "react-bootstrap";
import {dateFormat, fractional} from '../../../helpers/utils';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getAsteroids, addToDestruct} from "../../../store/actions";
import styles from './asteroid.module.css';
import dinosaur from '../../../assets/img/dinosaur.png';
import asteroid from '../../../assets/img/asteroid.svg';

function Asteroids({asteroids, getAsteroids, distance, onlyDangers, loader, addToDestruct, forDestruct}) {

    let content = [];

    useEffect(() => {
        getAsteroids()
    }, [getAsteroids])

    for (const key in asteroids) {
        const date = dateFormat(key)
        const singleAsteroid = asteroids[key].map(single => {

            if (onlyDangers && !single.is_potentially_hazardous_asteroid) {
                return false
            }

            const name = single.name.match('\\((.*?)\\)')[1];
            const width = single.estimated_diameter.meters.estimated_diameter_min <= 85 ? 85 : single.estimated_diameter.meters.estimated_diameter_min

            return (
                <Row key={single.id}
                     className={`${styles.asteroidContainer} ${single.is_potentially_hazardous_asteroid ? styles.dangerAsteroid : styles.dontDangerAsteroid} align-items-center position-relative mb-3`}>
                    <Col className={'p-0 h-100 align-self-end'} lg>
                        <Link to={`/asteroid/${single.id}`} className={'text-decoration-none'}>
                            <div className={styles.asteroidImage}>
                                <img src={asteroid} alt="" width={width}
                                     style={width > 200 ? {"bottom": 0} : {"bottom": "25%"}}/>
                            </div>
                            <div className={styles.dinosaur}>
                                <img src={dinosaur} alt=""/>
                            </div>
                        </Link>
                    </Col>
                    <Col lg>
                        <Link to={`/asteroid/${single.id}`} className={'text-decoration-none'}>
                            <h2 className={styles.asteroidName}>{name}</h2>

                            <ul className={styles.asteroidParams}>
                                <li>
                                    <span>Дата</span>
                                    <span>{date}</span>
                                </li>
                                <li>
                                    <span>Расстояние</span>
                                    <span>{fractional(Math.round(distance ? single.close_approach_data[0].miss_distance.kilometers : single.close_approach_data[0].miss_distance.lunar))} {distance ? 'км' : "лунный"}</span>
                                </li>
                                <li>
                                    <span>Размер</span>
                                    <span>{Math.round(single.estimated_diameter.meters.estimated_diameter_min)} м</span>
                                </li>
                            </ul>
                        </Link>
                    </Col>
                    <Col lg>

                        <div className={styles.dangerRating}>
                            <p className={'m-0'}>Оценка:</p>
                            <span>{single.is_potentially_hazardous_asteroid ? "опасен" : 'не опасен'}</span>
                        </div>
                        <div className={'text-center'}>
                            <Button
                                className={`${styles.toDestroy} btn btn-primary`}
                                onClick={()=>addToDestruct(single.id)}
                                disabled={forDestruct.has(single.id)}
                            >
                                {forDestruct.has(single.id) ? 'В списке':"На уничтожение"}
                            </Button>
                        </div>

                    </Col>
                </Row>
            )
        })

        content.push(singleAsteroid)
    }

    return (
        <>
            {loader && <div className={'text-center'}><Spinner animation="grow"/></div>}
            <div>{content}</div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        asteroids: state.asteroids,
        loader: state.loader,
        forDestruct: state.forDestruct,
    }
}

const mapDispatchToProps = {
    getAsteroids,
    addToDestruct
}

export default connect(mapStateToProps, mapDispatchToProps)(Asteroids)
