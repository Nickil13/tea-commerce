import React from 'react';

export default function OrderTable({orderItems}) {
    return (
        <table className="order-table">
             <thead>
                <tr>
                    <th className="image-table-header"></th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {orderItems.map((item)=>{
                    return(
                        <tr key={item._id} className="order-item">
                            <td className="image-table-data">
                                <img src={item.image} alt={item.name} />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
