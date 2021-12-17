import React from 'react';
import router from 'next/router';
import { auth } from '../configurations/auth'
const withAuth = (Component) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                load: true,
                userdata: {}
            }
        }
        componentDidMount() {
            auth.onAuthStateChanged(authUser => {
                if (authUser) {
                    this.setState({
                        load: false,
                        userdata: authUser
                    });
                } else {
                    router.push('login');
                }
            });
        }
        renderContent() {
            const { load, userdata } = this.state;
            if (!load) {
                return <Component {...this.props} userdata={userdata} />
            }
        }
        render() {
            return (
                <React.Fragment>
                    {this.renderContent()}
                </React.Fragment>
            );
        }
    };
}
export default withAuth;