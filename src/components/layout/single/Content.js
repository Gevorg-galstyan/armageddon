import React, {useState} from "react";
import {dateFormat, fractional} from "../../../helpers/utils";
import {addToDestruct} from "../../../store/actions";
import {Accordion, Button, Card, Col, Row, Table} from "react-bootstrap";
import {connect} from "react-redux";
import style from "../../pages/single/single.module.css";
import styles from "../asteroids/asteroid.module.css";
import dinosaur from "../../../assets/img/dinosaur.png";
import asteroidImg from "../../../assets/img/asteroid.svg";

function Content({distance, asteroid, addToDestruct,forDestruct}) {

    const [tableShow, setTableShow] = useState(true)

    const width = asteroid.estimated_diameter.meters.estimated_diameter_min <= 85 ? 85 : asteroid.estimated_diameter.meters.estimated_diameter_min;
    const name = asteroid.name.match('\\((.*?)\\)')[1];

    return (
        <>
            <Row
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
                            <span>Расстояние</span>
                            <span>{fractional(Math.round(distance ? asteroid.close_approach_data[0].miss_distance.kilometers : asteroid.close_approach_data[0].miss_distance.lunar))} {distance ? 'км' : "лунный"}</span>
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
                            onClick={()=>addToDestruct(asteroid.id)}
                            disabled={forDestruct.has(asteroid.id)}
                        >
                            {forDestruct.has(asteroid.id) ? 'В списке':"На уничтожение"}
                        </Button>
                    </div>

                </Col>
            </Row>

            <Row className={'justify-content-center mt-4'}>
                <h3 className={'mb-3'}>Список всех сближений</h3>
                <div className={'d-flex align-items-center  w-100 mb-3'}>
                    <input
                        type="checkbox"
                        id={'showTable'}
                        onChange={()=>setTableShow(!tableShow)}
                    />
                    <label htmlFor="showTable" className={'m-0 ml-2'}>Смотреть в {tableShow ? "списке" : 'таблице'}</label>
                </div>
                {
                    !tableShow &&
                    <Accordion className={'w-100'}>
                        {
                            asteroid.close_approach_data.map(e => {
                                return (
                                    <Card key={e.epoch_date_close_approach} className={'mb-2 border-bottom'}>
                                        <Card.Header className={'p-0 bg-transparent'}>
                                            <Accordion.Toggle as={Button} variant="link"
                                                              eventKey={e.epoch_date_close_approach}
                                                              className={style.accordionBtn}>
                                                <span
                                                    className={style.caption}>ГОД - {dateFormat(e.close_approach_date)}</span>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={e.epoch_date_close_approach}>
                                            <Card.Body>
                                                <ul className={styles.asteroidParams}>
                                                    <li>
                                                        <span>Скорость полёта</span>
                                                        <span>{fractional(Math.round(e.relative_velocity.kilometers_per_hour))} км/ч</span>
                                                    </li>
                                                    <li>
                                                        <span>Расстояние до земли</span>
                                                        <span>{fractional(Math.round(e.miss_distance.kilometers))} км</span>
                                                    </li>
                                                    <li>
                                                        <span>Орбита </span>
                                                        <span>{e.orbiting_body}</span>
                                                    </li>
                                                </ul>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                )
                            })
                        }
                    </Accordion>}
                {
                    tableShow &&
                    <Table striped bordered hover variant="dark">
                        <thead className={style.stickyHead}>
                        <tr>
                            <th>ГОД</th>
                            <th>Скорость полёта</th>
                            <th>Расстояние до земли</th>
                            <th>Орбита</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            asteroid.close_approach_data.map(e => {
                                return (
                                    <tr key={e.epoch_date_close_approach}>
                                        <td>{dateFormat(e.close_approach_date)}</td>
                                        <td>{fractional(Math.round(e.relative_velocity.kilometers_per_hour))} км/ч</td>
                                        <td>{fractional(Math.round(e.miss_distance.kilometers))} км</td>
                                        <td>{e.orbiting_body}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>}
            </Row>
        </>
    )
}



const mapStateToProps = (state) => {
    return {
        distance: state.distance,
        forDestruct: state.forDestruct
    }
}

const mapDispatchToProps = {
    addToDestruct
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
