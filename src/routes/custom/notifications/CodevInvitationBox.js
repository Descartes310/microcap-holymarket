import { connect } from "react-redux";
import React, { Component } from 'react';
import DialogComponent from "Components/DialogComponent";
import { setRequestGlobalAction } from "Actions";
import { Button } from "reactstrap";

class CodevInvitationBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        const { codevLine } = this.props;

        return (
            <DialogComponent
                title="Vous etes invités à un plan codev"
                onClose={this.props.onClose}
                show={this.props.show}
            >
                <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                    <div>
                        <p>Vous êtes invité à participer au plan de codeveloppement de "Dénomination"</p>
                        <p>Vous devez renseigner les montants et les rythmes de votre participation financière. 
                            Le ticket de participation est de xxx "dévise" par période de versement.</p>
                        <p>Choisissez pour chaque date de versement, le nombre de ickets nécessire pour atteindre 
                            le montant souhaité pour votre participation financière au plan</p>
                    </div>
                    <Button
                        color="primary"
                        className="text-white mr-2"
                    >
                        Continuer
                    </Button>
                </div>
            </DialogComponent>
        );
    }
}

export default connect(() => {}, { setRequestGlobalAction })(CodevInvitationBox);
