import { connect } from 'react-redux';
import React, { useState } from 'react';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import {NotificationManager} from 'react-notifications';
import { BANK, joinUrlWithParamsId } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [pages, setPages] = useState(null);


    const onSubmit = () => {
        if(!pages) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        props.setRequestGlobalAction(true);

        let data: any = {
            pages,
            client_reference: "cashm_client_"+props.match.params.id,
        };

        BankService.createCheckBook(data).then(() => {
            NotificationManager.success("Le chequier a été créé avec succès");
            props.history.push(joinUrlWithParamsId(BANK.CLIENT.CHECKBOOK.LIST, props.match.params.id));
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création du chequier");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>       
            <PageTitleBar
                title={"Créer un chequier"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="pages">
                                Nombre de page
                            </InputLabel>
                            <InputStrap
                                required
                                id="pages"
                                type="number"
                                name='pages'
                                className="input-lg"
                                value={pages}
                                onChange={(e) => setPages(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Ajouter
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));