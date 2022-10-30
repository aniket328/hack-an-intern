const { v4 } = require('uuid');
const userController = require('./user-controller')
const eventController = require('./notification-controller')
let buyOrders=new Map();
let sellOrders=new Map();

let buyList = [];
let sellList = [];

const getAllBuy = (req,res,next)=>{
    res
        .status(200)
        .json({
            type : "BUY",
            orders : buyList
        })
}
const getAllSell = (req,res,next)=>{
    res
        .status(200)
        .json({
            type : "SELL",
            orders : sellList
        })
}

const getAll = (req,res,next)=>{
    res
        .status(200)
        .json({
            buyOrders : buyList,
            sellOrders : sellList
        })
}

const createOrder = async(req,res,next)=>{
    const {type,status,price,quantity,userId,userName}  =req.body;
    let orderId;
    const createdOrder = {
        userId,
        userName,
        type,
        status,
        price,
        quantity
    }

    if(type === "BUY") {
        for(let i=0;i<userController.users.length;i++){
            if(userId=== userController.users[i].userId){
                if(userController.users[i].fiat<price*quantity){
                    eventController.notifications.push({
                        message : userController.users[i].userName + " tried to buy " + quantity  
                    })
                    res
                        .status(400)
                        .json({
                            message : "Can't place order you donot have enough money"
                        })
                    return
                }
                else {
                    
                    eventController.notifications.push({
                        message : userController.users[i].userName + " place order to buy " + quantity + " stocks each at Rs."+price   
                    })
                    userController.users[i] ={
                        ...userController.users[i],
                        fiat : userController.users[i].fiat-parseInt(price)*parseInt(quantity)
                    }
                   
                }
            }
        }
        orderId = v4();
        buyOrders.set(orderId,createdOrder);
        buyList.push({...createdOrder,orderId});
    }
    if(type === "SELL"){
        for(let i=0;i<userController.users.length;i++){
            if(userId=== userController.users[i].userId){
                if(userController.users[i].stockCount<parseInt(quantity)){
                    res
                        .status(400)
                        .json({
                            message : "Can't place order you donot have enough stocks",
                            stockCount : userController.users[i].stockCount,
                            quantity : parseInt(quantity)
                        })
                    return
                }
                else {
                    eventController.notifications.push({
                        message : userController.users[i].userName + " placed order to sell " + quantity + " stocks each at Rs."+price   
                    })
                    userController.users[i] ={
                        ...userController.users[i],
                        stockCount : userController.users[i].stockCount-quantity
                    }
                }
            }
        }
        orderId= v4();
        sellOrders.set(orderId,createdOrder);
        sellList.push({...createdOrder,orderId});
    }
        res
        .status(200)
        .json({
            orderId : orderId
        })

}


exports.getAllBuy = getAllBuy;
exports.getAllSell = getAllSell;
exports.getAll = getAll;
exports.createOrder = createOrder;
exports.buyList = buyList;
exports.sellList = sellList;
exports.buyOrders = buyOrders;
exports.sellOrders = sellOrders;

