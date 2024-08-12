import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import { FormGroup, Button } from 'reactstrap';
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class SendJoinRequestModal extends Component {

    state = {
        posts: [],
        post: null,
        motivations: [],
        motivation: null
     }
  
     constructor(props) {
        super(props);
     }

     componentDidMount() {
         this.getPosts();
         console.log("Folders => ", this.props.group);
     }

     getPosts = () => {
        this.props.setRequestGlobalAction(true),
        GroupService.getGroupPosts(this.props.group.groupReference)
        .then(response => this.setState({ posts: response }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    getPostMotivations = (id) => {
        this.props.setRequestGlobalAction(true);
        GroupService.getGroupPostMotivations(id)
        .then(response => this.setState({ motivations: response }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    render() {

        const { onClose, show, title, onSubmit } = this.props;
        const { posts, motivations, post, motivation } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        {title}
                    </h3>
                )}
            >
                <RctCardContent>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Séléctionnez un poste
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={post}
                            options={posts}
                            onChange={(__, item) => {
                                this.setState({ post: item, motivation: null, motivations: [] });
                                if(item) {
                                    this.getPostMotivations(item.id);
                                }
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Séléctionnez une motivation
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={motivation}
                            options={motivations}
                            onChange={(__, item) => {
                                this.setState({ motivation: item });
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={!motivation}
                            onClick={() => onSubmit(motivation)}
                            className="text-white font-weight-bold"
                        >
                            Envoyer la demande
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(SendJoinRequestModal)));