import React, {useState} from "react";
import {Col} from "react-bootstrap";
import {connect} from "react-redux";
import {setDistanceType} from "../../../store/actions";

function Distance({setDistanceType}) {
    const [distance, setDistance] = useState({
        kmDistance: true,
        luneDistance: false
    })
    const handleChange = ({target}) => {
        const bool = target.id === 'kmDistance' ? true : false
        setDistance({
            [target.id]: true
        })
        setDistanceType(bool);
    }

    return (
        <Col className={'ml-auto p-0 mt-lg-0 mt-3'} lg>
            <div className={'d-flex align-items-center justify-content-end flex-wrap filterDistance'}>
                <div className={'singleFilterContainer'}>
                    <span>Расстояние</span>
                    <input
                        type="radio"
                        name={'distance'}
                        id={'kmDistance'}
                        className={'distanceRadio d-none'}
                        onChange={handleChange}
                        checked={!!distance.kmDistance}
                    />
                    <label htmlFor="kmDistance" className={'distanceLabel m-0 mx-1'}>
                        в километрах,
                    </label>
                </div>
                <div className={'singleFilterContainer'}>
                    <input
                        type="radio"
                        name={'distance'}
                        id={'luneDistance'}
                        className={'distanceRadio d-none'}
                        onChange={handleChange}
                        checked={!!distance.luneDistance}
                    />
                    <label htmlFor="luneDistance" className={'distanceLabel m-0'}>
                        в дистанциях до луны
                    </label>
                </div>

            </div>
        </Col>
    )
}

const mapDispatchToProps = {
    setDistanceType
}

export default connect(null, mapDispatchToProps)(Distance)
