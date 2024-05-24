import { connect } from 'react-redux';
import UserService from 'Services/users';
import BlogItem from './components/BlogItem';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import GroupDetails from './components/groupDetails';
import MemberDetails from './components/memberDetails';

const Members = (props) => {

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        getMembers();
    }, []);

    const getMembers = () => {
        props.setRequestGlobalAction(true);
        UserService.getBlogs()
        .then(response => setUsers(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <CustomList
                loading={false}
                list={users}
                showSearch={false}
                itemsFoundText={n => `${n} membre.s trouvé.s`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun membre.s trouvé.s
                                </h4>
                            </div>
                        ) : (
                            <div className='row'>
                                {list && list.map((item, index) => (
                                    <BlogItem 
                                        key={index}
                                        blog={item}
                                        openDetails={() => {
                                            setUser(item);
                                            setShowDetailsModal(true);
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            />
            { user && showDetailsModal && (
                <MemberDetails
                    member={user}
                    title={"Fil d'actualité"} 
                    show={showDetailsModal && user}
                    onClose={() => {
                        setUser(null);
                        setShowDetailsModal(false);
                    }}
                />
            )}
        </>
    );
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Members));