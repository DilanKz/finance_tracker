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
    static async loadTransactionsWithTime(period, type = null, sort = 'newest') {
        return  await DatabaseService.getTransactionsByPeriod(period, type, sort);
    }
    static async loadTransactionAmounts() {
        return  await DatabaseService.getTransactionAmounts('expense');
    }
    static async loadAllCategorizedTransactions() {
        return  await DatabaseService.getGroupedTransactions();
    }

}

export default TransactionController;
