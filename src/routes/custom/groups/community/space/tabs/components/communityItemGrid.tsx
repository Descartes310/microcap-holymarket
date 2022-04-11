import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { getFilePath, DEFAULT_IMAGE } from 'Helpers/helpers';

const styles = {
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};

const CommunityItemGrid = ({ classes = null, community, openDetails }) => (
    <Card className="rounded mb-30 col-md-3" onClick={() => openDetails()}>
        <CardMedia
            className={classes?.media}
            image={community.image ? getFilePath(community.image) : DEFAULT_IMAGE}
            title={`${community.label} profile image`}
        />
        <CardContent className="py-30">
            <h3 className="font-weight-bold" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%", overflow: "hidden", marginBottom: 20 }}>{community.userName}</h3>
        </CardContent>
        <CardActions className="d-flex justify-content-between border-top py-0">
            <div style={{ padding: 20, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                {
                    !community.status ?
                    <Button
                        color="primary"
                        variant="contained"
                        className="text-white font-weight-bold"
                        style={{ marginRight: 10 }}
                        //onClick={() => adhesion(community)}
                    >
                        Adhérer
                    </Button>
                    :
                    (community.status === "CONFIRMED" || community.status === "ACCEPTED") && (
                    <Button
                        color="primary"
                        variant="contained"
                        className="text-white font-weight-bold"
                        style={{ marginRight: 10 }}
                        //onClick={() => enterInCommunitySpace(community.id)}
                    >
                        Se connecter
                    </Button>
                    )                        
                }
            </div>
        </CardActions>
    </Card>
);

export default withStyles(styles)(CommunityItemGrid);