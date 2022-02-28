import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router";
import {
    AdminBar,
    LoadingSpinner,
    Message,
    Pagination,
    SearchBar,
    Table,
} from "../components";
import { Link } from "react-router-dom";
import { listOrders } from "../actions/orderActions";
import Moment from "react-moment";

const TABLE_HEADERS = [
    "Id",
    "Price",
    "Date Placed",
    "Paid",
    "Delivered",
    "# Items",
    "Edit",
];

export default function Orders() {
    const [keyword, setKeyword] = useState("");

    const location = useLocation();
    const history = useHistory();
    const searchRef = useRef(null);
    const pageNumber = location.search.split("=")[1] || 1;
    const dispatch = useDispatch();

    const { orders, pages, page, loading, error } = useSelector(
        (state) => state.ordersSlice
    );

    useEffect(() => {
        dispatch(listOrders(pageNumber, keyword));
    }, [dispatch, pageNumber, keyword]);

    const handleSearch = (e) => {
        e.preventDefault();
        setKeyword(searchRef.current.value);
        history.push("/admin/orders?page=1");
    };

    const handleResetSearch = () => {
        setKeyword("");
        searchRef.current.value = "";
        history.push("/admin/orders?page=1");
    };

    return (
        <div>
            <AdminBar />

            <h1 className="page-title">Orders</h1>

            <SearchBar
                handleSearch={handleSearch}
                searchRef={searchRef}
                placeholder={"search orders by id"}
                handleResetSearch={handleResetSearch}
            />

            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <div className="search-container">
                    {orders?.length > 0 ? (
                        <Table headers={TABLE_HEADERS}>
                            {orders.map((order) => {
                                return (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            <Moment
                                                format="MMMM DD, YYYY"
                                                date={order.createdAt}
                                            />
                                        </td>
                                        <td>
                                            <span
                                                className={`tag ${
                                                    order.isPaid
                                                        ? "tag-paid"
                                                        : "tag-not"
                                                }`}
                                            >
                                                {order.isPaid
                                                    ? "paid"
                                                    : "not paid"}
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                className={`tag ${
                                                    order.isDelivered
                                                        ? "tag-delivered"
                                                        : "tag-not"
                                                }`}
                                            >
                                                {order.isDelivered
                                                    ? "delivered"
                                                    : "not delivered"}
                                            </span>
                                        </td>
                                        <td>
                                            {order.orderItems.reduce(
                                                (acc, item) =>
                                                    acc + item.quantity,
                                                0
                                            )}
                                        </td>
                                        <td>
                                            <Link
                                                className="btn"
                                                to={`/admin/orders/${order._id}/edit`}
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </Table>
                    ) : (
                        <Message>No orders found</Message>
                    )}
                </div>
            )}
            <Pagination page={page} pages={pages} />
        </div>
    );
}
