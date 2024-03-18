import mongoose from 'mongoose';
const { Schema } = mongoose;

const soldProductsSchema1 = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    quantitySold: Number,
    buyerEmail: String,
    // Any other relevant information you want to store
});

const sellerSchema = new Schema({
    
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
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        proQuantity : {
            type : Number
        }
    }],
    soldProducts: [{
        soldProducts: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'soldProductsSchema1'
        },
        soldQuantity : {
            type : Number
        }
    }]
});

const Seller = mongoose.model('Seller', sellerSchema);
const soldProductsSchema = mongoose.model('sold', soldProductsSchema1);

export  {Seller, soldProductsSchema};
