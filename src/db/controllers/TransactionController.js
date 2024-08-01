import DatabaseService from '../services/DatabaseService';

class TransactionController {
    static async addTransaction(transaction) {
        return  await DatabaseService.addTransaction(transaction);
    }
    static async loadAllTransactions() {
        return  await DatabaseService.getTransactions();
    }
    static async loadRecentTransactions() {
        return  await DatabaseService.getRecentTransactions();
    }
    static async loadTransactionsWithTime(period) {
        return  await DatabaseService.getTransactionsByPeriod(period);
    }


}

export default TransactionController;
