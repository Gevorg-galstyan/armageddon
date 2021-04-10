import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {connect} from "react-redux";
import Asteroids from "../../layout/asteroids/Asteroids";
import Distance from "../../layout/distance/Distance";

 function Home({distance}) {
    const [onlyDangers, setOnlyDanger] = useState(false)

    return (
        <Container>
            <Row className={'filters'}>
                <Col className={'mr-auto p-0'} lg>
                    <input
                        type="checkbox"
                        id={'onlyDanger'}
                        onChange={()=>setOnlyDanger(!onlyDangers)}
                    />
                    <label htmlFor={'onlyDanger'} className={'m-0'}>Показать только опасные</label>
                </Col>
                <Distance />
            </Row>
            <Asteroids
                distance={distance}
                onlyDangers={onlyDangers}
            />
        </Container>
    )
}

const mapStateToProps = (state)=>{
     return{
         distance: state.distance,

     }
}

export default connect(mapStateToProps)(Home)
