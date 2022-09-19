import React, { useState } from 'react';
import PropsTypes from 'prop-types';
import moment from 'moment';

const PurchaseTable = ({ data, status }) => {

    return (
        <div className='mr-3'>
            <h5>{status}</h5>
            <table className='table border-top'>
                <thead>
                    <tr>
                        <th>{'Transcation Id #'}</th>
                        <th>{'Customer Id'}</th>
                        <th>{'Customer Name'}</th>
                        <th>{'Earned Points'}</th>
                        <th>{'Purchased Amount'}</th>
                        <th>{'Purchased Date'}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(item => {
                            return <tr key={item.transctionID}>
                                <td>{item.transctionID}</td>
                                <td>{item.customerId}</td>
                                <td>{item.customerName}</td>
                                <td>{item.earnedPoints}</td>
                                <td>{item.purchaseAmount}</td>
                                <td>{moment(item.purchaseDate).format('LLL')}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

PurchaseTable.prototypes = {
    data: PropsTypes.arrayOf({
        transctionID: PropsTypes.number,
        customerName: PropsTypes.string,
        customerId: PropsTypes.string,
        purchaseDate: PropsTypes.string,
        purchaseAmount: PropsTypes.number,
        earnedPoints: PropsTypes.number
    })
};


PurchaseTable.defaultProps = {
    data: []
};

export default PurchaseTable;