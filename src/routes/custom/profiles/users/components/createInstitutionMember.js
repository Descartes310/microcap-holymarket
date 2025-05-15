import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import UserSelect from 'Components/UserSelect';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import { institutionMemberTypes } from '../../../../../data';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const CreateInstitutionMember = (props) => {

    const {show, onClose, isUpdate, memberToUpdate} = props;
    const [type, setType] = useState(null);
    const [member, setMember] = useState(null);

    useEffect(() => {
        if(isUpdate && memberToUpdate) {
            setType(institutionMemberTypes.find(t => t.value === memberToUpdate.type));
            
        }
    }, [isUpdate, memberToUpdate])

    const onSubmit = () => {

        if(!member || !type) {
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            id: props.id, referral_code: member.referralCode, type: type.value
        };

        UserService.createInstitutionMember(data).then(() => {
            NotificationManager.success('Le membre a été enregistré');
            onClose(true);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite");
            onClose(false);
        })
        .finally(() => {
            setType(null);
            setMember(null);
            props.setRequestGlobalAction(false);
        });
        
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={() => onClose(false)}
            size="md"
            title={(
                <h3 className="fw-bold">
                    {props.title ? props.title : 'Créer un nouveau membre'}
                </h3>
            )}
        >
            <RctCardContent>
                <UserSelect fromMyOrganisation={true} onChange={(_, user) => {
                    setMember(user);
                }}/>
                <div className="col-md-12 col-sm-12 has-wrapper mb-30 p-0">
                    <InputLabel className="text-left">
                        Type de membre
                    </InputLabel>
                    <Autocomplete
                        value={type}
                        options={institutionMemberTypes}
                        id="combo-box-demo"
                        classes={{ paper: 'custom-input' }}
                        getOptionLabel={(option) => option.name}
                        onChange={(__, item) => { setType(item) }}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>
                
                <Button
                    color="primary"
                    disabled={!member || !type}
                    className="ml-0 text-white float-right"
                    onClick={() => onSubmit()}
                >
                    Enregistrer
                </Button>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateInstitutionMember));