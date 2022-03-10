import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router";
import {
    AdminBar,
    DeleteConfirmation,
    LoadingSpinner,
    Message,
    Pagination,
    SearchBar,
    Table,
} from "../components";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { listUsers } from "../actions/userActions";
import { Helmet } from "react-helmet";

const TABLE_HEADERS = ["Id", "Name", "Role", "Edit", "Delete"];

export default function Users() {
    const [keyword, setKeyword] = useState("");
    const { isDeleteConfirmationShowing, showDeleteConfirmation } =
        useGlobalContext();
    const location = useLocation();
    const history = useHistory();
    const searchRef = useRef(null);
    const pageNumber = location.search.split("=")[1] || 1;
    const dispatch = useDispatch();

    const { users, pages, page, loading, error } = useSelector(
        (state) => state.usersSlice
    );

    useEffect(() => {
        dispatch(listUsers(pageNumber, keyword));
    }, [pageNumber, keyword, dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        setKeyword(searchRef.current.value);
        history.push("/admin/users?page=1");
    };

    const handleResetSearch = () => {
        setKeyword("");
        searchRef.current.value = "";
        history.push("/admin/users?page=1");
    };

    const handleDelete = (id, name) => {
        showDeleteConfirmation(id, name, "user");
    };

    return (
        <div>
            <Helmet>
                <title>Users | Tea-Commerce</title>
                <meta
                    name="description"
                    content="Search and manage all users as admin."
                />
            </Helmet>
            <AdminBar />
            <h1 className="page-title">Users</h1>

            <SearchBar
                handleSearch={handleSearch}
                searchRef={searchRef}
                placeholder={"filter users"}
                handleResetSearch={handleResetSearch}
            />

            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <>
                    <div className="search-container">
                        {users?.length > 0 ? (
                            <Table headers={TABLE_HEADERS}>
                                {users.map((user) => {
                                    return (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.username}</td>
                                            <td>
                                                {user.role === "admin" ? (
                                                    <span className="tag tag-admin">
                                                        admin
                                                    </span>
                                                ) : (
                                                    <span className="tag tag-user">
                                                        user
                                                    </span>
                                                )}
                                            </td>
                                            <td>
                                                <Link
                                                    className="btn"
                                                    to={`/admin/users/${user._id}/edit`}
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn"
                                                    onClick={() =>
                                                        handleDelete(
                                                            user._id,
                                                            user.username
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </Table>
                        ) : (
                            <Message>No users found.</Message>
                        )}
                    </div>
                    <Pagination page={page} pages={pages} />
                </>
            )}

            {isDeleteConfirmationShowing && <DeleteConfirmation />}
        </div>
    );
}
