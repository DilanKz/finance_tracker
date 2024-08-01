import DatabaseService from '../services/DatabaseService';

class TransactionController {
    static async addSampleTransaction() {
        const transaction = {
            id: Date.now().toString(),
            amount: '100',
            date: new Date().toISOString(),
            breakdownTitle: 'Food',
            type: 'expense',
        };
        await DatabaseService.addTransaction(transaction);
    }
}

export default TransactionController;
