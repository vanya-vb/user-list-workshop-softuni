// libraries
import { useEffect, useState } from "react";

// utilities / internal js files
import userService from "../services/userService";

// components
import Pagination from "./Pagination";
import Search from "./Search";
import UserListItem from "./UserListItem";
import UserCreate from "./UserCreate";
import UserInfo from './UserInfo'
import UserDelete from "./UserDelete";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [userIdInfo, setUserIdInfo] = useState(); // undefined
    const [userIdDelete, setUserIdDelete] = useState(null);
    const [userIdEdit, setUserIdEdit] = useState(null);

    useEffect(() => {
        userService.getAll()
            .then(result => setUsers(result))
            .catch(err => console.log(err))
    }, []);

    const createUserClickHandler = () => {
        setShowCreate(true);
    };

    const closeCreateUserClickHandler = () => {
        setShowCreate(false);
        setUserIdEdit(null);
    };

    const saveCreateUserClickHandler = async (e) => {
        e.preventDefault();

        // get form data
        const formData = new FormData(e.target.parentElement.parentElement);
        const userData = Object.fromEntries(formData);

        // create new user on server
        const newUser = await userService.create(userData);

        // update local state
        setUsers(state => [...state, newUser])

        // close modal
        setShowCreate(false);
    };

    const userInfoClickHandler = (userId) => {
        setUserIdInfo(userId);
    };

    const userInfoCloseHandler = () => {
        setUserIdInfo(null);
    };

    const userDeleteClickHandler = (userId) => {
        setUserIdDelete(userId);
    };

    const userDeleteCloseHandler = () => {
        setUserIdDelete(null);
    };

    const userDeleteHandler = async () => {
        // del request to server
        await userService.delete(userIdDelete);

        // del from local state
        setUsers(state => state.filter(user => user._id !== userIdDelete));

        // close modal
        setUserIdDelete(null);
    };

    const onEditClickHandler = (userId) => {
        setUserIdEdit(userId)
    };

    const saveEditUserClickHandler = async (e) => {
        const userId = userIdEdit;
        e.preventDefault();

        // get form data
        const formData = new FormData(e.target.parentElement.parentElement);
        const userData = Object.fromEntries(formData);

        // update user on server
        const updatedUser = await userService.update(userIdEdit, userData);

        // update local state
        setUsers(state => state.map(user => user._id === userId ? updatedUser : user))

        // close modal
        setUserIdEdit(null);
    };

    return (
        <section className="card users-container">
            <Search />
            {showCreate && (
                <UserCreate
                    onClose={closeCreateUserClickHandler}
                    onSave={saveCreateUserClickHandler}
                />
            )}

            {userIdInfo && (
                <UserInfo
                    userId={userIdInfo}
                    onClose={userInfoCloseHandler}
                />
            )}

            {userIdDelete && (
                <UserDelete
                    onClose={userDeleteCloseHandler}
                    onDelete={userDeleteHandler}
                />
            )}

            {userIdEdit && (
                <UserCreate
                    userId={userIdEdit}
                    onClose={closeCreateUserClickHandler}
                    onSave={saveCreateUserClickHandler}
                    onEdit={saveEditUserClickHandler}
                />
            )}

            {/* <!-- Table component --> */}
            <div className="table-wrapper">
                {/* <!-- Overlap components  --> */}

                {/* <!-- <div className="loading-shade"> --> */}
                {/* <!-- Loading spinner  --> */}
                {/* <!-- <div className="spinner"></div> --> */}
                {/* <!--  */}
                {/* No users added yet  --> */}

                {/* <!-- <div className="table-overlap">
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="triangle-exclamation"
                        className="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path
                            fill="currentColor"
                            d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
                        ></path>
                    </svg>
                    <h2>There is no users yet.</h2>
                </div> --> */}

                {/* <!-- No content overlap component  --> */}

                {/* <!-- <div className="table-overlap">
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="triangle-exclamation"
                        className="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path
                            fill="currentColor"
                            d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
                        ></path>
                    </svg>
                    <h2>Sorry, we couldn't find what you're looking for.</h2>
                </div> --> */}

                {/* <!-- On error overlap component  --> */}

                {/* <!-- <div className="table-overlap">
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="triangle-exclamation"
                        className="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path
                            fill="currentColor"
                            d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
                        ></path>
                    </svg>
                    <h2>Failed to fetch</h2>
                </div> --> */}
                {/* <!-- </div> --> */}

                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Image
                            </th>
                            <th>
                                First name<svg aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Last name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Email<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Phone<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Created
                                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => <UserListItem
                            key={user._id}
                            onInfoClick={userInfoClickHandler}
                            onDeleteClick={userDeleteClickHandler}
                            onEditClick={onEditClickHandler}
                            {...user}
                        />)}
                    </tbody>
                </table>
            </div>

            <button className="btn-add btn" onClick={createUserClickHandler}>Add new user</button>

            <Pagination />
        </section>
    );
}