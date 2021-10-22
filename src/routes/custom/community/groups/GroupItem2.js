/**
 * Blog Layout One
 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { getFilePath } from 'Helpers/helpers';

const styles = {
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};

const GroupItem2 = ({ classes, group, isMember, enterInCommunitySpace, adhesion, pending, activeCommunity }) => (
    <Card className="rounded mb-30">
        <CardMedia
            className={classes.media}
            image={group.image ? getFilePath(group.image) : 'https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg'}
            title={`${group.label} profile image`}
        />
        <CardContent className="py-30">
            <h3 className="font-weight-bold" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%", overflow: "hidden", marginBottom: 20 }}>{group.label}</h3>
            <p className="mb-0" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%", overflow: "hidden", marginTop: 20 }}>
                {group.description}
            </p>
        </CardContent>
        <CardActions className="d-flex justify-content-between border-top py-0">
            { !pending ?
                <div style={{ padding: 20, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    {
                        isMember ?
                            <Button
                                color="primary"
                                variant="contained"
                                className="text-white font-weight-bold bg-blue"
                                style={{ marginRight: 10 }}
                                onClick={() => enterInCommunitySpace(group.id)}
                            >
                                Rejoindre
                            </Button>
                            :
                            <Button
                                color="primary"
                                variant="contained"
                                className="text-white font-weight-bold bg-danger"
                                style={{ marginRight: 10 }}
                                onClick={() => adhesion(group)}
                            >
                                Adhérer
                            </Button>
                    }
                    <Button
                        color="primary"
                        variant="contained"
                        className="text-white font-weight-bold"
                    >
                        Consulter
                    </Button>
                </div>
                :
                <div style={{ padding: 20, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <Button
                        color="primary"
                        variant="contained"
                        className="text-white font-weight-bold"
                        onClick={() => activeCommunity()}
                    >
                        Activer
                    </Button>
                </div>
            }
        </CardActions>
    </Card>
);

export default withStyles(styles)(GroupItem2);