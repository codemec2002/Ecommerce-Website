import mongoose from 'mongoose';
const { Schema } = mongoose;

const soldProductsSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    quantitySold: Number,
    buyerEmail: String,
    // Any other relevant information you want to store
});

const sellerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    aadhar: {
        type: Number,
        required: true,
        unique: true
    },
    pan: {
        type: String,
        required: true,
        unique: true
    },
    gstNo: {
        type: String,
        required: true,
        unique: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'products'
    }],
    soldProducts: [{
        type : Schema.Types.ObjectId,
        ref : 'soldProductsSchema'
    }]
});

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;
