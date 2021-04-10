import React from "react";
import {Link, NavLink} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import styles from './header.module.css';
import {connect} from "react-redux";

function Header({forDestruct}) {
    return (
        <header>
            <Navbar bg="transparent" expand="lg" className={`container ${styles.headerContainer}`}>
                <Link to="/" className={`${styles.logo} navbar-brand`}>
                    <h1 className={styles.generalHeading}>ARMAGGEDON V</h1>
                    <p className={styles.pageDescription}>Сервис мониторинга и уничтожения астероидов, опасно подлетающих к Земле.</p>
                </Link>


                <Navbar.Collapse className={'show'} id="basic-navbar-nav">
                    <Nav className={`${styles.headerNavLinks} ml-auto`}>
                        <NavLink
                            to={'/'}
                            activeClassName={styles.navActive}
                            className={styles.navLink}
                            exact
                        >
                            Астероиды
                        </NavLink>
                        <NavLink
                            to={'/destruction'}
                            activeClassName={styles.navActive}
                            className={styles.navLink}
                            exact
                        >
                            <div className={styles.destruct}>Уничтожение {forDestruct.size > 0 && <span>{forDestruct.size}</span>}</div>
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}


const mapStateToProps = (state) => {
    return {
        forDestruct: state.forDestruct,
    }
}


export default connect(mapStateToProps)(Header)
