import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ShouldRender from '../basic/ShouldRender';
import { IS_SAAS_SERVICE } from '../../config';
import booleanParser from '../../utils/booleanParser';
import { history } from '../../store';

class AlertDisabledWarning extends Component {
    render() {
        const { alertEnable, currentProject, page } = this.props;
        const projectId = currentProject ? currentProject._id : null;
        const redirectTo = `/dashboard/project/${projectId}/settings/billing`;

        return (
            <ShouldRender if={!alertEnable && booleanParser(IS_SAAS_SERVICE)}>
                <div id="alertWarning" className="Box-root Margin-vertical--12">
                    <div className="db-Trends bs-ContentSection Card-root">
                        <div className="Box-root Box-background--red4 Card-shadow--medium Border-radius--4">
                            <div className="bs-ContentSection-content Box-root Flex-flex Flex-alignItems--center Flex-justifyContent--spaceBetween Padding-horizontal--20 Padding-vertical--12">
                                <span className="ContentHeader-title Text-color--white Text-fontSize--15 Text-fontWeight--regular Text-lineHeight--16">
                                    <ShouldRender if={page === 'Component'}>
                                        <span>
                                            SMS and Call Alerts are disabled for
                                            this project. Please go to{' '}
                                            <span
                                                className="pointer Border-bottom--white Text-fontWeight--medium"
                                                onClick={() =>
                                                    history.push(redirectTo)
                                                }
                                            >
                                                Project Settings
                                                <span className="right-arrow" />
                                                Billings
                                            </span>{' '}
                                            and enable it.
                                        </span>
                                    </ShouldRender>
                                    <ShouldRender if={page === 'Billing'}>
                                        <span>
                                            Click &#34;Enable Call and SMS
                                            alerts&#34; for SMS and Call alerts
                                            to be sent to your team when
                                            incidents / downtime happens.
                                        </span>
                                    </ShouldRender>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </ShouldRender>
        );
    }
}

AlertDisabledWarning.displayName = 'AlertDisabledWarning';

AlertDisabledWarning.propTypes = {
    alertEnable: PropTypes.bool,
    currentProject: PropTypes.shape({ _id: PropTypes.string }),
    page: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        alertEnable:
            state.project &&
            state.project.currentProject &&
            state.project.currentProject.alertEnable,
        currentProject: state.project.currentProject,
    };
};

export default connect(mapStateToProps)(AlertDisabledWarning);
