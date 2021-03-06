import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router";
import { listProducts } from "../actions/productActions";
import {
    AdminBar,
    DeleteConfirmation,
    LoadingSpinner,
    Message,
    Pagination,
    SearchBar,
    Table,
} from "../components";
import { teaProductCategories } from "../resources/teaInfoData";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { Helmet } from "react-helmet";

const TABLE_HEADERS = [
    "Id",
    "Name",
    "Category",
    "Product Type",
    "Quantity",
    "Edit",
    "Delete",
];

export default function Products() {
    const [category, setCategory] = useState("");
    const [productType, setProductType] = useState("select product type");
    const [keyword, setKeyword] = useState("");
    const { isDeleteConfirmationShowing, showDeleteConfirmation } =
        useGlobalContext();
    const location = useLocation();
    const history = useHistory();
    const searchRef = useRef(null);
    const pageNumber = location.search.split("=")[1] || 1;

    const dispatch = useDispatch();
    const { products, page, pages, loading, error } = useSelector(
        (state) => state.productsSlice
    );

    useEffect(() => {
        dispatch(
            listProducts(
                category === "all" ? "" : category,
                productType === "select product type" ? "" : productType,
                pageNumber,
                keyword
            )
        );
    }, [dispatch, pageNumber, category, productType, keyword]);

    const handleSearch = (e) => {
        e.preventDefault();
        setKeyword(searchRef.current.value);
        history.push("/admin/products?page=1");
    };

    const handleResetSearch = () => {
        setKeyword("");
        searchRef.current.value = "";
        setCategory("all");
        setProductType("");
        history.push("/admin/products?page=1");
    };

    const handleDelete = (id, name) => {
        showDeleteConfirmation(id, name, "product");
    };

    const handleSelectChange = (type, value) => {
        if (type === "productType") {
            setProductType(value);
            history.push("/admin/products?page=1");
        } else if (type === "category") {
            setCategory(value);
            setProductType("select product type");
            history.push("/admin/products?page=1");
        }
    };
    return (
        <div>
            <Helmet>
                <title>Products | Tea-Commerce</title>
                <meta
                    name="description"
                    content="Search and manage store products."
                />
            </Helmet>
            <AdminBar />
            <h1 className="page-title">Products</h1>

            <button
                className="btn btn-primary"
                onClick={() => history.push("/admin/products/add")}
            >
                Create a new product
            </button>

            <div className="search-bar">
                <SearchBar
                    handleSearch={handleSearch}
                    searchRef={searchRef}
                    placeholder={"filter products"}
                    handleResetSearch={handleResetSearch}
                />

                <div className="search-selects">
                    <form>
                        <select
                            name="category"
                            id="category"
                            value={category}
                            onChange={(e) =>
                                handleSelectChange("category", e.target.value)
                            }
                        >
                            {teaProductCategories.map((category) => {
                                return (
                                    <option
                                        key={category.id}
                                        value={category.type}
                                    >
                                        {category.type}
                                    </option>
                                );
                            })}
                        </select>
                    </form>
                    {category && category !== "all" && (
                        <form>
                            <select
                                name="productType"
                                id="productType"
                                value={productType}
                                onChange={(e) =>
                                    handleSelectChange(
                                        "productType",
                                        e.target.value
                                    )
                                }
                            >
                                <option value={"select product type"}>
                                    select product type
                                </option>
                                {teaProductCategories.filter(
                                    (x) => x.type === category
                                )[0] &&
                                    teaProductCategories
                                        .filter((x) => x.type === category)[0]
                                        .items.map((item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item}
                                                >
                                                    {item}
                                                </option>
                                            );
                                        })}
                            </select>
                        </form>
                    )}
                </div>
            </div>
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <>
                    <div className="search-container">
                        {products && products.length > 0 ? (
                            <Table headers={TABLE_HEADERS}>
                                {products.map((product) => {
                                    return (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>{product.productType}</td>
                                            <td>
                                                {product.countInStock === 0 ? (
                                                    <span className="tag tag-not">
                                                        out of stock
                                                    </span>
                                                ) : (
                                                    product.countInStock
                                                )}
                                            </td>
                                            <td>
                                                <Link
                                                    className="btn"
                                                    to={`/admin/products/${product._id}/edit`}
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn"
                                                    onClick={() =>
                                                        handleDelete(
                                                            product._id,
                                                            product.name
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
                            <Message>No products found.</Message>
                        )}
                    </div>
                    <Pagination page={page} pages={pages} />
                    {isDeleteConfirmationShowing && <DeleteConfirmation />}
                </>
            )}
        </div>
    );
}
