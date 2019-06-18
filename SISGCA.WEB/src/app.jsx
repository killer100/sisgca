import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './app.css';
import HeaderProduce from './components/_layout/header-produce';
import Grid from '@material-ui/core/Grid';
//import UserInfo from "./constants/user-info";
import PageLoader from './components/_common/page-loader';
import { GetUser } from './api/common';
import CertificacionContainer from './components/certificacion-ambiental/certificacion-container';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    AppContainer: {
        padding: 0,
        paddingBottom: 50
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user: {},
            menuOptions: [
                { label: 'Registro', to: '/' }
                // { label: "GORE Ejecutivo", to: "/gore-ejecutivo" },
                // { label: "MUNI Ejecutivo", to: "/muni-ejecutivo" }
            ]
        };
    }

    setLoading(bool) {
        this.setState({ loading: bool });
    }

    componentDidMount() {
        this.setLoading(true);

        GetUser()
            .then(user => {
                this.setState({ user: user });
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                this.setLoading(false);
            });
    }

    render() {
        const { classes } = this.props;
        const { menuOptions, loading, user } = this.state;

        return (
            <Router>
                <div className="App">
                    <HeaderProduce menuOptions={menuOptions} user={user} />
                    <div className={classes.AppContainer}>
                        <Grid container justify="center">
                            <Grid item lg={9} md={11} sm={12} xs={12}>
                                <Switch>
                                    <Route exact path="/" component={CertificacionContainer} />
                                    <Route component={NoMatch} />
                                </Switch>
                            </Grid>
                        </Grid>
                    </div>
                    <PageLoader show={loading} text="Cargando datos de la aplicación..." />
                </div>
            </Router>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

const NoMatch = ({ location }) => (
    <div>
        <h3>
            No se encontró la página solicitada <code>{location.pathname}</code>
        </h3>
    </div>
);

export default withStyles(styles)(App);
