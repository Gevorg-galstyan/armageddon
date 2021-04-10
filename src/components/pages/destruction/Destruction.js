import React, {useState, useEffect} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {store} from "../../../store/store";
import {dateFormat, fractional, selectedAsteroids} from "../../../helpers/utils";
import {addToDestruct, destructAsteroids, getAsteroids} from "../../../store/actions";
import styles from "../../layout/asteroids/asteroid.module.css";
import asteroidImg from "../../../assets/img/asteroid.svg";
import dinosaur from "../../../assets/img/dinosaur.png";
import video from '../../../assets/video/bruce.mp4';
import {Link} from "react-router-dom";

function Destruction({asteroids, forDestruct, addToDestruct, destructAsteroids, getAsteroids}) {


    useEffect(() => {
        if (!asteroids) {
            getAsteroids();
            store.dispatch({type: 'ADD_TO_DESTRUCT', selectedAsteroids})
        }
    }, [asteroids, getAsteroids])


    const [playVideo, setPlayVideo] = useState('')

    let asteroid = [];

    for (const key in asteroids) {
        const destructing = asteroids[key].filter(e => {
            if (!forDestruct.has(e.id)) {
               return false
            }
            e.date = key;
            return e;
        })
        asteroid = [...asteroid, ...destructing]
    }

    const handleClick = () => {
        setPlayVideo(video)
        destructAsteroids()
    }


    const content = asteroid.map(asteroid => {

        const width = asteroid.estimated_diameter.meters.estimated_diameter_min <= 85 ? 85 : asteroid.estimated_diameter.meters.estimated_diameter_min;
        const name = asteroid.name.match('\\((.*?)\\)')[1];

        return (
            <Row key={asteroid.id}
                 className={`${styles.asteroidContainer} ${asteroid.is_potentially_hazardous_asteroid ? styles.dangerAsteroid : styles.dontDangerAsteroid} align-items-center position-relative mt-3`}>
                <Col className={'p-0 h-100 align-self-end'} lg>
                    <div className={styles.asteroidImage}>
                        <img src={asteroidImg} alt="" width={width}
                             style={width > 200 ? {"bottom": 0} : {"bottom": "25%"}}/>
                    </div>
                    <div className={styles.dinosaur}>
                        <img src={dinosaur} alt=""/>
                    </div>
                </Col>
                <Col lg>
                    <h2 className={styles.asteroidName}>{name}</h2>

                    <ul className={styles.asteroidParams}>
                        <li>
                            <span>Дата</span>
                            <span>{dateFormat(asteroid.date)}</span>
                        </li>
                        <li>
                            <span>Расстояние</span>
                            <span>{fractional(Math.round(asteroid.close_approach_data[0].miss_distance.kilometers))} км</span>
                        </li>
                        <li>
                            <span>Размер</span>
                            <span>{Math.round(asteroid.estimated_diameter.meters.estimated_diameter_min)} м</span>
                        </li>
                    </ul>
                </Col>
                <Col lg>
                    <div className={styles.dangerRating}>
                        <p className={'m-0'}>Оценка:</p>
                        <span>{asteroid.is_potentially_hazardous_asteroid ? "опасен" : 'не опасен'}</span>
                    </div>
                    <div className={'text-center'}>
                        <Button
                            className={`${styles.toDestroy} btn btn-primary`}
                            onClick={() => addToDestruct(asteroid.id)}
                        >
                            Уничтожить
                        </Button>
                    </div>
                </Col>
            </Row>
        )
    })

    return (
        <Container>
            {
                content.length <= 0 ?
                    <Row className={'justify-content-center mt-5'}><h3>Нет Астероидов для уничтожения</h3></Row> :
                    content
            }

            {
                content.length > 0 &&
                <Row>
                    <Button
                        className={`${styles.toDestroyAll} btn btn-primary`}
                        onClick={handleClick}
                    >
                        заказать бригаду Брюса
                    </Button>
                </Row>
            }

            {
                playVideo &&
                <>
                    <div className={'backLink'}><span className={'color-white'}>Видео автоматически закроется после завершения, или можете нажать</span> <Link  to={'/'}>На главную</Link></div>
                    <video id={'videoPlayer'} controls autoPlay onEnded={() => setPlayVideo('')}>
                        <source src={playVideo} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                </>
            }
        </Container>
    )
}

const mapDispatchToProps = {
    addToDestruct,
    destructAsteroids,
    getAsteroids
}

const mapStateToProps = (state) => {
    return {
        forDestruct: state.forDestruct,
        asteroids: state.asteroids,
        distance: state.distance
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Destruction)
