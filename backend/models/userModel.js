import mongoose from "mongoose";
const userSchema= mongoose.Schema(
        {
            email:{
                type:String,
                required:true,
            },
            password:{
                type: String,
                required: true,
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
userSchema.pre("save", function (next) {
    if (!this.cart) {
      this.cart = { items: [] };
    }
    next();
  });
export const User = mongoose.model('User',userSchema)