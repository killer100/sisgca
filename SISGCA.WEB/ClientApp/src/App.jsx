import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import HeaderProduce from './components/shared/layout/header-produce';
import Grid from '@material-ui/core/Grid';
import PageLoader from './components/shared/page-loader';
import Toast from './components/shared/toast';
import GestionSsam from './components/pages/gestion-ssam/gestion-ssam';

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
        padding: 0
    }
});

class ToastProvider {
    constructor(onOpen) {
        this.onOpenToast = onOpen;
    }

    open(message, variant = 'success') {
        this.onOpenToast(message, variant);
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toast: { open: false, message: '', variant: 'success' },
            toastProvider: new ToastProvider(this.handleOpenToast),
            loading: false,
            user: {
                NombreParaMostrar: 'Nombre Usuario'
            },
            menuOptions: [
                { label: 'SSAM', to: '/' },
                // { label: 'Delegación Masiva de Legajos', to: '/delegacion-masiva' }
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
        /*GetUser()
            .then(u => {
                const { user } = this.state;
                this.setState({ user: { ...user, ...u } });
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                this.setLoading(false);
            });*/
    }

    handleOpenToast = (message, variant) => {
        this.setState({ toast: { open: true, message, variant } });
    };

    handleCloseToast = () => {
        const { toast } = this.state;
        this.setState({ toast: { ...toast, open: false } });
    };

    render() {
        const { classes } = this.props;
        const { menuOptions, loading, user, toast, toastProvider } = this.state;

        return (
            <Router>
                <div className="App">
                    <HeaderProduce menuOptions={menuOptions} user={user} />
                    <div className={classes.AppContainer}>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={props => (
                                    <GestionSsam
                                        {...props}
                                        user={user}
                                    />
                                )}
                            />                           
                            <Route component={NoMatch} />
                        </Switch>
                    </div>
                    {/* <PageLoader show={loading} text="Cargando datos de la aplicación..." /> */}
                    <Toast {...toast} onClose={this.handleCloseToast} />
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
