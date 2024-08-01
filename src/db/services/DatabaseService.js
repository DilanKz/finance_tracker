import { collection, doc, getDocs, limit, orderBy, query, setDoc, where } from 'firebase/firestore';
import { db } from './FirebaseConfig';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subDays } from 'date-fns';

class DatabaseService {
    static async initializeDatabase() {
        // No explicit database initialization needed for Firestore
    }

    static async isDatabaseInitialized() {
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, orderBy('id'), limit(1));
            const usersSnapshot = await getDocs(q);

            if (!usersSnapshot.empty) {
                const firstUser = usersSnapshot.docs[0].data();
                return { success: true, data: firstUser };
            } else {
                return { success: false, error: 'No users found' };
            }
        } catch (error) {
            console.error('Error checking if database is initialized:', error);
            return { success: false, error: error.message };
        }
    }

    static async addUser(user) {
        try {
            console.log('Adding user:', user);
            const userRef = doc(db, 'users', user.id);
            await setDoc(userRef, user);
            console.log('User added successfully');
            return { success: true, data: user };
        } catch (error) {
            console.error('Error adding user:', error);
            return { success: false, error: error.message };
        }
    }

    static async addTransaction(transaction) {
        try {
            const transactionRef = doc(db, 'transactions', transaction.id);
            await setDoc(transactionRef, transaction);
            console.log('Transaction added successfully');
            return { success: true };
        } catch (error) {
            console.error('Error adding transaction:', error);
            return { success: false, error: error.message };
        }
    }

    static async getUsers() {
        try {
            const usersRef = collection(db, 'users');
            const usersSnapshot = await getDocs(usersRef);
            const users = usersSnapshot.docs.map(doc => doc.data());
            return { success: true, data: users };
        } catch (error) {
            console.error('Error getting users:', error);
            return { success: false, error: error.message };
        }
    }

    static async getTransactions() {
        try {
            const transactionsRef = collection(db, 'transactions');
            const transactionsSnapshot = await getDocs(transactionsRef);
            const transactions = transactionsSnapshot.docs.map(doc => doc.data());
            return { success: true, data: transactions };
        } catch (error) {
            console.error('Error getting transactions:', error);
            return { success: false, error: error.message };
        }
    }

    static async getRecentTransactions() {
        try {
            const transactionsRef = collection(db, 'transactions');
            const q = query(transactionsRef, orderBy('date', 'desc'), limit(5));
            const transactionsSnapshot = await getDocs(q);
            const transactions = transactionsSnapshot.docs.map(doc => doc.data());
            return { success: true, data: transactions };
        } catch (error) {
            console.error('Error getting recent transactions:', error);
            return { success: false, error: error.message };
        }
    }

    static async getTransactionsByPeriod(period) {
        try {
            let startDate, endDate;
            const now = new Date();

            switch (period) {
                case 'today':
                    startDate = startOfDay(now);
                    endDate = endOfDay(now);
                    break;
                case 'yesterday':
                    startDate = startOfDay(subDays(now, 1));
                    endDate = endOfDay(subDays(now, 1));
                    break;
                case 'this_week':
                    startDate = startOfWeek(now);
                    endDate = endOfWeek(now);
                    break;
                case 'this_month':
                    startDate = startOfMonth(now);
                    endDate = endOfMonth(now);
                    break;
                default:
                     throw new Error('Invalid period specified');
            }

            const transactionsRef = collection(db, 'transactions');
            const q = query(
                transactionsRef,
                where('date', '>=', startDate),
                where('date', '<=', endDate),
                orderBy('date', 'desc')
            );
            const transactionsSnapshot = await getDocs(q);
            const transactions = transactionsSnapshot.docs.map(doc => doc.data());
            return { success: true, data: transactions };
        } catch (error) {
            console.error('Error getting transactions by period:', error);
            return { success: false, error: error.message };
        }
    }
}

export default DatabaseService;
