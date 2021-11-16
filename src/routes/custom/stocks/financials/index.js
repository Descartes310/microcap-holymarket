import React, { Component } from 'react';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { AbilityContext } from "Permissions/Can";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { getBranchProjectFolder, setRequestGlobalAction } from "Actions";
import ProjectItem from './projectItem'
import CustomList from "Components/CustomList";

class FinancialStock extends Component {

    static contextType = AbilityContext;

    state = {
        projects: []
    };

    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     this.getProjects();
    // }

    // getProjects = () => {
    //     this.props.setRequestGlobalAction(true);
    //     getBranchProjectFolder().then(data => {
    //         this.setState({ projects: data });
    //     }).finally(() => {
    //         this.props.setRequestGlobalAction(false);
    //     })
    // }

    render() {

        return (
            <div className="page-list">
                <PageTitleBar title={"Bourses de financements"} match={this.props.match} enableBreadCrumb={false} />
                <RctCollapsibleCard>
                    <div className="">
                        <h1 style={{
                            margin: '2%'
                        }}>
                            A partir du 15 decembre
                        </h1>
                        <p style={{
                            marginLeft: '2%'
                        }}>
                            Vous pourrez négocier ici vos offres et demandes de financement avec ou sans contre partie
                        </p>
                    </div>
                    {/* <CustomList
                        loading={false}
                        list={this.state.projects}
                        itemsFoundText={n => `${n} projet(s) trouvé(s)`}
                        renderItem={list => (
                            <>
                                {!list || (list && list.length === 0) ? (
                                    <div className="no-found-user-wrap d-flex justify-content-center align-items-center py-50">
                                        <h4> Aucun projet trouvé</h4>
                                    </div>
                                ) : (
                                        <div className="row" style={{ paddingBottom: 50 }}>
                                            {list.map((project, key) => (
                                                <div className="col-sm-6 col-md-4 col-lg-3" key={key}>
                                                    <ProjectItem project={project} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </>
                        )}
                    /> */}
                </RctCollapsibleCard>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return { requestGlobalLoader, authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(FinancialStock)));
