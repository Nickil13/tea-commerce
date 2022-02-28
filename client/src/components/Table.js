import React from "react";

export default function Table({ headers, children }) {
    return (
        <table className="search-table">
            <thead>
                <tr>
                    {headers?.map((header, index) => {
                        return <th key={index}>{header}</th>;
                    })}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    );
}
