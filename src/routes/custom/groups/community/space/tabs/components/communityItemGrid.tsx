import React from 'react';
import UserService from 'Services/users';
import Card from '@material-ui/core/Card';
import { setSession } from 'Helpers/tokens';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { getFilePath, DEFAULT_IMAGE } from 'Helpers/helpers';
import GroupService from 'Services/groups';

const styles = {
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};

const CommunityItemGrid = ({ classes = null, community, openDetails, onAskRequest = () => {}, size='col-md-3', showDetailsButton = false }) => {

    const likeGroup = (reference: string) => {
        GroupService.likeGroup(reference)        
        .then(() => {
            window.location.reload();
        });
    }

    const enterInCommunitySpace = (reference: string) => {
        UserService.changeUserAccessFromCommunity(reference)        
        .then(response => {
            setSession(response);
            window.location.reload();
        });
    }

    return (
    <Card className={`rounded mb-30 ${size} p-10`}>
        <CardMedia
            onClick={() => openDetails()}
            className={classes?.media}
            image={community.photo ? getFilePath(community.photo) : DEFAULT_IMAGE}
            title={`${community.label} profile image`}
        />
        <CardContent onClick={() => openDetails()} className="py-30">
            <h3 className="font-weight-bold" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%", overflow: "hidden", marginBottom: 20, cursor: 'pointer' }}>{community.userName}</h3>
        </CardContent>
        <CardActions className="d-flex justify-content-between border-top py-0">
            <div className="d-flex w-100 justify-content-between row align-items-center" style={{padding: 20}}>
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        height: '30px',
                        width: '30px',
                        borderRadius: '50%',
                        backgroundColor: '#e9eef1',
                        cursor: 'pointer'
                    }}
                    onClick={() => likeGroup(community.groupReference)}
                >
                    <i className="zmdi zmdi-favorite" style={{color: community.favorite ? 'red' : 'gray' }} />
                </div>
                <div className='d-flex'>
                    {
                        (!community.status) ?
                            <Button
                                color="primary"
                                variant="contained"
                                className="text-white font-weight-bold"
                                style={{ marginRight: 10 }}
                                onClick={() => onAskRequest()}
                            >
                                Adhérer
                            </Button>
                        :
                        (community.status === "CONFIRMED" || community.status === "ACCEPTED") && (
                            <>
                                { showDetailsButton && (
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        className="text-white font-weight-bold"
                                        style={{ marginRight: 10 }}
                                        onClick={() => openDetails()}
                                    >
                                        Détails
                                    </Button>
                                )}
                                <Button
                                    color="primary"
                                    variant="contained"
                                    className="text-white font-weight-bold ml-10"
                                    style={{ marginRight: 10 }}
                                    onClick={() => enterInCommunitySpace(community.groupReference)}
                                >
                                    Connexion
                                </Button>
                            </>
                        )                    
                    }
                </div>
            </div>
        </CardActions>
    </Card>
)};

export default withStyles(styles)(CommunityItemGrid);