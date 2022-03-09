import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userActions";
import { useParams, useHistory } from "react-router";
import { LoadingSpinner, Message } from "../components";
import { selectedUserReset } from "../reducers/usersSlice";

export default function EditUser() {
    const {
        selectedUser: user,
        loading,
        error,
        selectedUserUpdateSuccess,
    } = useSelector((state) => state.usersSlice);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState("");

    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedUserUpdateSuccess) {
            dispatch(selectedUserReset());
            history.push("/admin/users");
        } else {
            if (!user.username || user._id !== id) {
                dispatch(getUserDetails(id));
            } else {
                setUsername(user.username);
                setEmail(user.email);
                if (user.role === "admin") {
                    setIsAdmin(true);
                }
                // setIsAdmin(user.isAdmin);
            }
        }
    }, [id, user, selectedUserUpdateSuccess, dispatch, history]);

    const handleEditUser = (e) => {
        let validEmail = true;
        e.preventDefault();
        setMessage("");
        if (email) {
            let atloc = email.indexOf("@");
            let dotloc = email.indexOf(".");
            if (atloc < 1 || dotloc - atloc < 2) {
                validEmail = false;
            }
        }
        if (validEmail) {
            const args = {
                id: user._id,
                user: {
                    username,
                    email,
                    isAdmin,
                },
            };
            dispatch(updateUser(args));
        } else {
            setMessage("Invalid email.");
        }
    };

    return (
        <div>
            <div className="page-title">
                <h1>Edit User</h1>
                <p>{user?.username}</p>
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <form className="edit-profile-form" onSubmit={handleEditUser}>
                    <div className="input-control">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input-control">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-control checkbox-control">
                        <input
                            type="checkbox"
                            id="admin-checkbox"
                            name="admin-checkbox"
                            defaultChecked={user.role === "admin"}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                        <label htmlFor="admin-checkbox">Admin</label>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Edit
                    </button>
                    {message && <Message>{message}</Message>}
                </form>
            )}
        </div>
    );
}
