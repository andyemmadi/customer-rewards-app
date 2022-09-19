import React, { useRef, useState } from 'react';
import PurchaseHistoryTable from "./PurchaseTable.component";
import PropsTypes from 'prop-types';
import FetchData from '../service/FetchData';
import * as _ from 'lodash';

const CustomerRewards = () => {

    const [allTransactions, setAllTransaction] = useState([]);
    const [filterTransaction, setFilterTransaction] = useState([]);
    const initialized = useRef('no');

    React.useEffect(() => {
        if (initialized.current !== 'yes') {
            FetchData().then(data => {
                setAllTransaction(data);
                setFilterTransaction(data);
                initialized.current = 'yes';
            }).catch(err => {
                setAllTransaction([]);
                setFilterTransaction([]);
            });
        }
    }, []);

    const getAllTransactions = () => {
        setFilterTransaction([...allTransactions]);
    };

    const getTopTransactions = (count) => {
        let tAllTrans = _.cloneDeep(allTransactions);
        const top = tAllTrans.sort((a, b) => b.purchaseAmount - a.purchaseAmount).slice(0, count);
        setFilterTransaction([...top]);
    }

    const getTransFromDay = (days) => {
        let tAllTrans = _.cloneDeep(allTransactions);
        let fromDay = new Date();
        fromDay.setDate(fromDay.getDate() - days);
        const filteredData = tAllTrans.filter(
            (transaction) => {
                return new Date(transaction.purchaseDate).getTime() >= fromDay.getTime();
            }
        );
        filteredData.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))
        setFilterTransaction(filteredData);
    };


    const getHighestRewardsTrans = (rewards) => {
        let tAllTrans = _.cloneDeep(allTransactions);
        const filteredData = tAllTrans.filter(trans => trans.earnedPoints >= rewards).sort((a, b) => b.earnedPoints - a.earnedPoints);
        setFilterTransaction(filteredData);
    }



    return <div>
        <div className='d-flex flex-row'>
            <button className="btn btn-secondary p-1 px-3 m-2" onClick={() => { getAllTransactions(); }} >All</button>
            <button className="btn btn-secondary p-1 px-3 m-2" onClick={() => { getTopTransactions(5) }}>Top 5 Transcations</button>
            <button className="btn btn-secondary p-1 px-3 m-2" onClick={() => { getTopTransactions(10) }}>Top 10 Transcations</button>
            <button className="btn btn-secondary p-1 px-3 m-2" onClick={() => getTransFromDay(7)}>Last 7 days</button>
            <button className="btn btn-secondary p-1 px-3 m-2" onClick={() => getTransFromDay(30)}>Last 30 days</button>
            <button className="btn btn-secondary p-1 px-3 m-2" onClick={() => getHighestRewardsTrans(500)}>500+ Rewards</button>
            <button className="btn btn-secondary p-1 px-3 m-2" onClick={() => getHighestRewardsTrans(1000)}>1000+ Rewards</button>
        </div>
        <PurchaseHistoryTable data={filterTransaction} />
    </div>

}

export default CustomerRewards;