const mongoose = require('mongoose');
const { DB_URL, DB_PORT, DB_NAME } = require('../config/dbConfig');
const {
    Category,
    Color,
    Company,
    DeliveryType,
    Order,
    Page,
    Product,
    Size,
    Store,
    Transporter,
    User,
    UserType,
} = require('../mongoose');

let db = null;
let initialized = false;

class DataBase {
    static async init () {
        if (!initialized) {
            await mongoose.connect(`${DB_URL}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true });
            db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function () {
                console.log(`we're connected!`);
            });

            initialized = true;
        }
    }



    /** ----- CATEGORIES ----- */
    static async getCategories (params = {}) {
        return Category.find(params);
    }

    static async getCategory (_id) {
        return Category.find({ _id });
    }

    static async addCategory (data = {}) {
        const category = new Category(data);
        return category.save();
    }

    static async removeCategory (id) {
        return Category.findByIdAndDelete(id);
    }




    /** ----- COLORS ----- */
    static async getColors (params = {}) {
        return Color.find(params);
    }

    static async getColor (_id) {
        return Color.find({ _id });
    }

    static async addColor (data = {}) {
        const color = new Color(data);
        return color.save();
    }

    static async removeColor (id) {
        return Color.findByIdAndDelete(id);
    }




    /** ----- COMPANIES ----- */
    static async getCompanies (params = {}) {
        return Company.find(params);
    }

    static async getCompany (_id) {
        return Company.find({ _id });
    }

    static async addCompany (data = {}) {
        const company = new Company(data);
        return company.save();
    }

    static async removeCompany (id) {
        return Company.findByIdAndDelete(id);
    }




    /** ----- DELIVERY TYPES ----- */
    static async getDeliveryTypes (params = {}) {
        return DeliveryType.find(params);
    }

    static async getDeliveryType (_id) {
        return DeliveryType.find({ _id });
    }

    static async addDeliveryType (data = {}) {
        const deliveryType = new DeliveryType(data);
        return deliveryType.save();
    }

    static async removeDeliveryType (id) {
        return DeliveryType.findByIdAndDelete(id);
    }




    /** ----- ORDERS ----- */
    static async getOrders (params = {}) {
        return Order.find(params);
    }

    static async getOrder (_id) {
        return Order.find({ _id });
    }

    static async addOrder (data = {}) {
        const order = new Order(data);
        return order.save();
    }

    static async removeOrder (id) {
        return Order.findByIdAndDelete(id);
    }




    /** ----- PRODUCTS ----- */
    static async getProducts (params = {}) {
        return Product.find(params);
    }

    static async getProduct (_id) {
        return Product.find({ _id });
    }

    static async addProduct (data = {}) {
        const product = new Product(data);
        return product.save();
    }

    static async removeProduct (id) {
        return Product.findByIdAndDelete(id);
    }




    /** ----- SIZES ----- */
    static async getSizes (params = {}) {
        return Size.find(params);
    }

    static async getSize (_id) {
        return Size.find({ _id });
    }

    static async addSize (data = {}) {
        const size = new Size(data);
        return size.save();
    }

    static async removeSize (id) {
        return Size.findByIdAndDelete(id);
    }




    /** ----- STORES ----- */
    static async getStores (params = {}) {
        return Store.find(params);
    }

    static async getStore (_id) {
        return Store.find({ _id });
    }

    static async addStore (data = {}) {
        const store = new Store(data);
        return store.save();
    }

    static async removeStore (id) {
        return Store.findByIdAndDelete(id);
    }




    /** ----- TRANSPORTERS ----- */
    static async getTransporters (params = {}) {
        return Transporter.find(params);
    }

    static async getTransporter (_id) {
        return Transporter.find({ _id });
    }

    static async addTransporter (data = {}) {
        const transporter = new Transporter(data);
        return transporter.save();
    }

    static async removeTransporter (id) {
        return Transporter.findByIdAndDelete(id);
    }




    /** ----- USERS ----- */
    static async getUsers (params = {}) {
        return User.find(params);
    }

    static async getUser (_id) {
        return User.find({ _id });
    }

    static async getUserByCreds (email, password) {
        return User.find({ email, password });
    }

    static async addUser (data) {
        const user = new User(data);
        return user.save();
    }

    static async removeUser (id) {
        return User.findByIdAndDelete(id);
    }




    /** ----- USER TYPES ----- */
    static async getUserTypes (params = {}) {
        return UserType.find(params);
    }

    static async getUserType (_id) {
        return UserType.find({ _id });
    }

    static async addUserType (data = {}) {
        const userType = new UserType(data);
        return userType.save();
    }

    static async removeUserType (id) {
        return UserType.findByIdAndDelete(id);
    }




    /** ----- PAGES ----- */
    static async getPages (params = {}) {
        return Page.find(params);
    }

    static async getPage (_id) {
        return Page.find({ _id });
    }

    static async addPage (data = {}) {
        const page = new Page(data);
        return page.save();
    }

    static async removePage (id) {
        return Page.findByIdAndDelete(id);
    }
}

module.exports = DataBase;
