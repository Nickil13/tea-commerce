import React from "react";
import { Link } from "react-router-dom";

export default function AdminBar() {
    return (
        <div className="admin-bar">
            <div className="admin-links">
                <Link className="btn btn-primary" to="/admin/orders">
                    Orders
                </Link>
                <Link className="btn btn-primary" to="/admin/users">
                    {" "}
                    Users
                </Link>
                <Link className="btn btn-primary" to="/admin/products">
                    Products
                </Link>
            </div>
        </div>
    );
}
