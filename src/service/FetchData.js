import transactions from './data/transactionData.json';

const calculateRewards = (purchaseAmount) => {
    let rewardsPoints = 0;

    if (purchaseAmount >= 50 && purchaseAmount <= 100) {
        rewardsPoints = purchaseAmount - 50;
    } else if (purchaseAmount > 100) {
        rewardsPoints = 50 + (2 * (purchaseAmount - 100))
    }
    return rewardsPoints;
};

const FetchData = () => {
    return new Promise((resolve, reject) => {
        try {
            const transformedData = transactions.map(transaction => {
                return {
                    ...transaction,
                    earnedPoints: calculateRewards(transaction.purchaseAmount),
                }
            });
            resolve(transformedData);
        } catch (err) {
            reject({ error: 'Error occured' })
        }
    });
};

export default FetchData;