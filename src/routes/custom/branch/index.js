import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';
import api from 'Api';

// Material Components
import List from '@material-ui/core/List';
import Avatar from "@material-ui/core/Avatar";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// Card wrapper
import RctAppLayout from 'Components/RctAppLayout';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

// Fake data
import moment from "moment";
import {initMoment} from "Services/momentService";
import {NETWORK} from "Url/frontendUrl";
import {BRANCH} from "Url/backendUrl";
import Can, {AbilityContext} from "Permissions/Can";
import Branch from 'Models/Branch';
import tileData from "Routes/components/grid-list/components/tileData";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import GridList from "@material-ui/core/GridList";
import BranchImage from "Components/BranchImage";
import Permission from "Enums/Permissions.tsx";

initMoment();

class BranchList extends Component {
    static contextType = AbilityContext;

    constructor(props) {
        super(props);
        this.state = {
            products: null,
            listItems,
            reviews: [],
            order: 'maxMemberNumber',
            branches: [],
            searched: '',
        };
    }

    componentDidMount() {
        this.getBranches();
    }

    // Temporary fetch it directly
    getBranches = () => {
        api.get(BRANCH.GET_ALL)
          .then(response => {
              this.setState({reviews: response.data});
          })
          .catch(error => {
             console.log("error => ", error.message);
          });
    };

    handleToggleListItems(key) {
        let items = this.state.listItems;
        items[key].status = !items[key].status;
        this.setState({ listItems: items }, () => {
            if (this.state.listItems.every(i => !i.status)) {
                this.setState({ reviews });
            } else {
                const newReviews = [];
                this.state.listItems.forEach((item, index) => {
                    if (!item.status) {
                        if (index === 0) {
                            newReviews.push(reviews[2], reviews[reviews.length - 1]);
                        } else if (index === 1) {
                            newReviews.push(reviews[1]);
                        } else {
                            newReviews.push(reviews[0], reviews[3], reviews[4]);
                        }
                    }
                });
                this.setState({ reviews: newReviews });
            }
        });
    }

    handleOrder = (value, data) => {
        if (value !== 'none') {
            // Apply order feature
            return data.sort((a, b) => Number(a[value]) - Number(b[value]));
        }

        return data;
    };

    handleSearch = (value, data) => {
        if (value && value !== '') {
            const _value = value.toLowerCase();
            return data.filter(r => {
                if (r.name.toLowerCase().includes(_value))
                    return true;
                return false;
                /*if (r.profession.toLowerCase().includes(_value))
                    return true;

                return r.message.toLowerCase().includes(_value);*/
            });
        }

        return data;
    };

    render() {
        // Apply search feature
        const searchedItems = this.handleSearch(this.state.searched, [...this.state.reviews]);

        // Initialize order feature
        let orderedItems = this.handleOrder(this.state.order, searchedItems);

        return (
            <div className="Shop-grid-wrapper">
                <div className="row">
                    <div className="col-2">
                        {this.context.can(Permission.branch.createOne.name, Permission) && (
                            <Button
                                color="primary"
                                className="mr-5 mb-10 text-white"
                                onClick={() => this.props.history.push(NETWORK.CREATE)}
                            >
                                <IntlMessages id="button.add" />
                                <i className="zmdi zmdi zmdi-plus ml-2" />
                            </Button>
                        )}
                    </div>
                </div>
                <div className="row align-items-start">
                    <div className="col-sm-12 col-md-4 col-xl-4 d-sm-full">
                        <RctCollapsibleCard>
                            <div className="shop-head">
                                <Form>
                                    <FormGroup className="has-wrapper mb-0">
                                        <Input
                                            type="search"
                                            name="search"
                                            id="search-todo"
                                            className="has-input-right input-lg-icon pl-15"
                                            placeholder="Recherchez..."
                                            value={this.state.searched}
                                            onChange={event => this.setState({searched: event.target.value})}
                                        />
                                        <i className="zmdi zmdi-search search-icon"></i>
                                    </FormGroup>
                                </Form>
                            </div>
                        </RctCollapsibleCard>
                        {/*<RctCollapsibleCard
                                // heading={<IntlMessages id="widgets.filterByDoctor" />}
                            >
                                <List className="p-0 list-divider">
                                    {this.state.listItems.map((data, key) => (
                                        <ListItem key={key} button onClick={() => this.handleToggleListItems(key)} >
                                            <Avatar alt="Remy Sharp" className="img-fluid" src={data.imageURL} />
                                            <ListItemText primary={data.itemName} />
                                            <ListItemSecondaryAction>
                                                <Checkbox
                                                    color="primary"
                                                    checked={data.status}
                                                    onChange={() => this.handleToggleListItems(key)}
                                                    disableRipple />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </List>
                            </RctCollapsibleCard>*/}
                    </div>
                    <div className="col-md-8 col-sm-12 d-sm-full">
                        <div className="row justify-content-between">
                            <div className="col-md-6 col-sm-8">
                                <div className="form-group">
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="uncontrolled-native">
                                            <IntlMessages id="list.sortBy" />
                                        </InputLabel>
                                        <Select
                                            value={this.state.order}
                                            onChange={(event) => this.setState({order: event.target.value})}
                                        >
                                            <MenuItem value="maxMemberNumber">
                                                <IntlMessages id="branch.maxMemberNumber" />
                                            </MenuItem>
                                            <MenuItem value="maxPartnerNumber">
                                                <IntlMessages id="branch.maxPartnerNumber" />
                                            </MenuItem>
                                            <MenuItem value="maxPfmNumber">
                                                <IntlMessages id="branch.maxPfmNumber" />
                                            </MenuItem>
                                            <MenuItem value="none">
                                                <IntlMessages id="general.none" />
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-4 center-holder text-right">
                                {orderedItems.length} branche(s) trouvées
                            </div>
                        </div>
                        <div className="dash-cards">
                            <div className="row">
                                {orderedItems.length === 0 ? (
                                    <RctCollapsibleCard>
                                        <h4 className="">
                                            Aucune branches trouvées
                                        </h4>
                                    </RctCollapsibleCard>
                                ) : (
                                    <>
                                        {orderedItems.map(branch => (
                                            <GridList className="col-12 mb-3" key={branch.id}>
                                                <GridListTile className="w-100">
                                                    <BranchImage logo={branch.logo} />
                                                    <GridListTileBar
                                                        title={branch.name}
                                                        actionIcon={
                                                            <IconButton>
                                                                <i className="zmdi zmdi-arrow-right text-white"></i>
                                                            </IconButton>
                                                        }
                                                    />
                                                </GridListTile>

                                            </GridList>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(BranchList);

export const listItems = [

];

export const reviews = [

];
