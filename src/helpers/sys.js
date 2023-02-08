const bcrypt = require("bcrypt");

exports.hashedPassword = (password) => {
    return bcrypt.hash(password, 10);
};

exports.verifyHash = (arg1, arg2) => {
    return bcrypt.compare(arg1, arg2.password);
};

exports.calculateTotal = (cart)=> {
    let total=0;
    cart.forEach( ele => {
    if(ele.salePrice) {
        total += ele.salePrice*ele.quantity;
    } else {
        total += ele.price*ele.quantity;
    }
}
)
return total
};