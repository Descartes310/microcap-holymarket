import {Input} from "reactstrap";
import {connect} from "react-redux";
import React, {useState} from 'react';
import {useQuery} from "Helpers/helpers";
import {useLocation} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {NotificationManager} from "react-notifications";
import { activateBranch, setRequestGlobalAction } from "Actions";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";

const Activation = ({authUser, setRequestGlobalAction}) => {
    const query = useQuery(useLocation);
    const defaultToken = query.get('token');

    const [token, setToken] = useState(defaultToken ? defaultToken : '' );
    const [finished, setFinished] = useState(false);

    const onSubmit = () => {
        setRequestGlobalAction(true);
        const data = {
            token,
            userId: authUser.user.id,
            branchId: authUser.branchId,
        };
        activateBranch(data)
            .then(() => {
                NotificationManager.success("Branche activé avec succès");
                setFinished(true);
            })
            .catch(() => NotificationManager.error("Token invalide. Veuillez re-essayer"))
            .finally(() => setRequestGlobalAction(false));
    };

    return (
        <div className="full-height text-center">
            <div className="row justify-content-center mt-md-70">
                <div className="col-md-9 col-sm-12">
                    {finished ? (
                        <div>
                            <h2 className="text-success">
                                Branche activé avec succès
                            </h2>
                        </div>
                    ) : (
                        <div>
                            <h2 className="">Activation de la branche</h2>

                            <div className="form-link bg-white px-3 py-20 my-30">
                                <InputLabel className="text-left" htmlFor="url">
                                    Entrer le token que vous avez reçu
                                </InputLabel>
                                <Input
                                    type="text"
                                    value={token}
                                    className="form-control"
                                    onChange={event => setToken(event.target.value)}
                                />
                            </div>
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={onSubmit}
                                className="text-white bg-primary font-weight-bold mr-3"
                            >
                                Activer la branche
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Activation.propTypes = {

};

export default connect(({authUser}) => ({authUser: authUser.data}), {setRequestGlobalAction})(Activation);
