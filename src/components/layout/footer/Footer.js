import React from "react";
import {Container, Row} from "react-bootstrap";

export default function Footer(){

    return(
        <footer>
            <Container>
                <Row>
                    <p className={'text-center w-100'}>2021 © Все права и планета защищены</p>
                </Row>
            </Container>
        </footer>
    )
}
