import React, {useEffect} from "react";
import {Container, Spinner} from "react-bootstrap";
import {connect} from "react-redux";
import {getSingleAsteroid} from "../../../store/actions";
import Distance from "../../layout/distance/Distance";
import Content from "../../layout/single/Content";


function Single({loader, asteroid, match, getSingleAsteroid}) {

    useEffect(() => {
        getSingleAsteroid(match.params.id);
    }, [getSingleAsteroid,match.params.id])


    return (
        <Container className={'mt-3'}>
            <Distance/>
            {
                asteroid &&
                <Content asteroid={asteroid} />
            }
            {loader && <div className={'text-center'}><Spinner animation="grow"/></div>}
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        loader: state.loader,
        asteroid: state.singleAsteroid,
    }
}

const mapDispatchToProps = {
    getSingleAsteroid
}

export default connect(mapStateToProps,mapDispatchToProps)(Single)
