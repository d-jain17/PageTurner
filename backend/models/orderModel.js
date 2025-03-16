import mongoose from "mongoose";
const orderSchema= mongoose.Schema(
        {
            id:{
                type:String,
                required:true,
            },
            cart: {
                items: [
                    {
                        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Cats" },
                        quantity: { type: Number, default: 1 },
                    },
                ],
            },
        },
        {
            timestamps: true,
        }

);
orderSchema.pre("save", function (next) {
    if (!this.cart) {
      this.cart = { items: [] };
    }
    next();
  });
export const Order = mongoose.model('Order',orderSchema)