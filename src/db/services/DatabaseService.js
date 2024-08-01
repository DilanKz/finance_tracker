import { collection, doc, getDocs, limit, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from './FirebaseConfig';

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
}

export default DatabaseService;
