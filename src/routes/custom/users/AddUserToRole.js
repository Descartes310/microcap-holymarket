import {Input} from "reactstrap";
import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {NotificationManager} from "react-notifications";
import DialogComponent from "Components/DialogComponent";
import {addUserToProfile} from "Actions/independentActions";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

const AddUserToRole = ({show, profileId, setRequestGlobalAction, onClose, type = 'network-profile'}) => {
    const [reference, setReference] = useState('' );

    const onSubmit = () => {
        setRequestGlobalAction(true);
        addUserToProfile(profileId, reference, type)
            .then(() => {
                NotificationManager.success("Utilisateur ajouté avec succès");
                setReference('');
                onClose();
            })
            .catch(() => NotificationManager.error("Aucun utilisateurs correspondant à cette reference. Veuillez re-essayer."))
            .finally(() => setRequestGlobalAction(false));
    };

    return (
        <DialogComponent show={show} title={"Ajouter un utilisateurs"} onClose={onClose}>
            <RctCollapsibleCard>
                <div>
                    <div className="">
                        <InputLabel className="text-left" htmlFor="url">
                            Entrer la réference de l'utilisateur
                        </InputLabel>
                        <Input
                            type="text"
                            value={reference}
                            className="form-control"
                            onChange={event => setReference(event.target.value)}
                        />
                    </div>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={onSubmit}
                        className="text-white bg-primary font-weight-bold mt-3"
                    >
                        Sousmettre
                    </Button>
                </div>
            </RctCollapsibleCard>
        </DialogComponent>
    );
};

AddUserToRole.propTypes = {

};

export default AddUserToRole;
