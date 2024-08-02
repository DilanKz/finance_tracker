import { collection, doc, getDocs, limit, orderBy, query, setDoc, where, Timestamp, getDoc, updateDoc } from 'firebase/firestore';
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
            // Create a reference to the document in the 'transactions' collection
            const transactionRef = doc(db, 'transactions', transaction.id);

            // Add or update the transaction with a timestamp
            await setDoc(transactionRef, {
                ...transaction,
                timeStamp: Timestamp.fromDate(new Date(transaction.date))
            });

            // Fetch the first user document from the 'users' collection
            const usersRef = collection(db, 'users');
            const q = query(usersRef, orderBy('id'), limit(1));
            const usersSnapshot = await getDocs(q);

            if (!usersSnapshot.empty) {
                const firstUserRef = doc(db, 'users', usersSnapshot.docs[0].id);
                const userSnap = await getDoc(firstUserRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    const transactionAmount = parseFloat(transaction.amount) || 0;

                    if (transaction.type === 'income') {
                        const currentIncome = parseFloat(userData.income) || 0;
                        const newIncome = currentIncome + transactionAmount;
                        await updateDoc(firstUserRef, { income: newIncome.toString() });
                    } else if (transaction.type === 'expense') {
                        const currentExpense = parseFloat(userData.expense) || 0;
                        const newExpense = currentExpense + transactionAmount;
                        await updateDoc(firstUserRef, { expense: newExpense.toString() });
                    }

                    // Fetch the updated user data
                    const updatedUserSnap = await getDoc(firstUserRef);
                    if (updatedUserSnap.exists()) {
                        const updatedUserData = updatedUserSnap.data();
                        console.log('Transaction added and user updated successfully');
                        return { success: true, data: updatedUserData };
                    } else {
                        console.error('Updated user not found');
                        return { success: false, error: 'Updated user not found' };
                    }
                } else {
                    console.error('First user not found');
                    return { success: false, error: 'First user not found' };
                }
            } else {
                console.error('No users found');
                return { success: false, error: 'No users found' };
            }
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

    static async getTransactionsByPeriod(period, type, sort) {
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

            let q = query(
                transactionsRef,
                where('timeStamp', '>=', Timestamp.fromDate(startDate)),
                where('timeStamp', '<=', Timestamp.fromDate(endDate))
            );

            if (type) {
                q = query(q, where('type', '==', type));
            }

            switch (sort) {
                case 'highest':
                    q = query(q, orderBy('amount', 'desc'));
                    break;
                case 'lowest':
                    q = query(q, orderBy('amount', 'asc'));
                    break;
                case 'oldest':
                    q = query(q, orderBy('timeStamp', 'asc'));
                    break;
                case 'newest':
                default:
                    q = query(q, orderBy('timeStamp', 'desc'));
                    break;
            }

            const transactionsSnapshot = await getDocs(q);
            const transactions = transactionsSnapshot.docs.map(doc => doc.data());

            return { success: true, data: transactions };
        } catch (error) {
            console.error('Error getting transactions by period:', error);
            return { success: false, error: error.message };
        }
    }

    static async getTransactionAmounts(type) {
        try {
            // Create a reference to the transactions collection
            const transactionsRef = collection(db, 'transactions');

            // Create a query to filter transactions by type
            const q = type ? query(transactionsRef, where('type', '==', type)) : query(transactionsRef);

            // Fetch the transactions
            const transactionsSnapshot = await getDocs(q);

            // Extract transaction amounts
            const amounts = transactionsSnapshot.docs.map(doc => {
                const data = doc.data();
                return parseFloat(data.amount) || 0;
            });

            return { success: true, data: amounts };
        } catch (error) {
            console.error('Error getting transaction amounts:', error);
            return { success: false, error: error.message };
        }
    }

    static async getGroupedTransactions() {
        try {
            // Create a reference to the transactions collection
            const transactionsRef = collection(db, 'transactions');

            // Create a query to filter transactions by type 'expense'
            const expenseQuery = query(transactionsRef, where('type', '==', 'expense'));

            // Fetch the transactions
            const transactionsSnapshot = await getDocs(expenseQuery);

            // Process transactions to group by breakdownTitle and sum amounts
            const groupedTransactions = transactionsSnapshot.docs.reduce((acc, doc) => {
                const data = doc.data();
                const title = data.breakdownTitle;
                const amount = parseFloat(data.amount) || 0;

                if (!acc[title]) {
                    acc[title] = { title, totalAmount: 0 };
                }

                acc[title].totalAmount += amount;

                return acc;
            }, {});

            // Convert the result to an array
            const result = Object.values(groupedTransactions);

            return { success: true, data: result };
        } catch (error) {
            console.error('Error getting grouped transactions:', error);
            return { success: false, error: error.message };
        }
    }
}

export default DatabaseService;
