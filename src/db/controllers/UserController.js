import DatabaseService from '../services/DatabaseService';

class UserController {
    static async addSampleUser(user) {
        return await DatabaseService.addUser(user);
    }

    static async isStorageInitialized() {
        return await DatabaseService.isDatabaseInitialized();
    }
}

export default UserController;
