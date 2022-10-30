const orders = require('./order-controller');
const userControl = require('./user-controller');
const eventController = require('./notification-controller')

let transactions = [

];
let Price=[
    200
];

function modifyUsers(buyer,seller,buyerPrice,sellerPrice,quantity){
    let foundB = false;
    let foundS = false;
    console.log("sellerPrice",sellerPrice);
    console.log("buyerPrice",buyerPrice);
    console.log("quantity",quantity)
    for(let i=0;i<userControl.users.length;i++){
        if(buyer===userControl.users[i].userId){
            if(buyerPrice == 1e9){
                userControl.users[i]={
                    ...userControl.users[i],
                    stockCount : parseInt(userControl.users[i].stockCount) +parseInt(quantity),
                    fiat : parseInt(userControl.users[i].fiat) +  (parseInt(-1) -parseInt(sellerPrice))*quantity
                }
            }
            else if(parseInt(sellerPrice) == -1){
                userControl.users[i]={
                    ...userControl.users[i],
                    stockCount : parseInt(userControl.users[i].stockCount) +parseInt(quantity),
                }
            }
            else {
                userControl.users[i]={
                    ...userControl.users[i],
                    stockCount : parseInt(userControl.users[i].stockCount) +parseInt(quantity),
                    fiat : parseInt(userControl.users[i].fiat) +  (parseInt(buyerPrice) -parseInt(sellerPrice))*quantity
                }
            }
            foundB=true;
            // console.log("buyer",userControl.users[i]);
        }

        if(seller===userControl.users[i].userId){
           if(sellerPrice === -1){
            userControl.users[i]={
                ...userControl.users[i],
                stockCount : parseInt(userControl.users[i].stockCount) - parseInt(quantity),
                fiat : parseInt(userControl.users[i].fiat) +parseInt(buyerPrice)*parseInt(quantity)
            } 
           }
           else{
            userControl.users[i]={
                ...userControl.users[i],
                stockCount : parseInt(userControl.users[i].stockCount) - parseInt(quantity),
                fiat : parseInt(userControl.users[i].fiat) +parseInt(sellerPrice)*parseInt(quantity)
            } 
        }
            foundS=true;
            // console.log("seller",userControl.users[i]);
        }
        if(foundB && foundS) break;
    }
}


const getTransactions=(req,res,next)=>{
    res.status(200)
        .json({
            transactions : transactions
        })
}

const currentPrice=(req,res,next)=>{
    res.status(200)
        .json({
            currentPrice : Price[Price.length-1]
        })
}

const priceHistory=(req,res,next)=>{
    res.status(200)
        .json({
            priceHistory : Price
        })
}

// const matchMarketOrder=(req,res,next)=>{
//     let {price,quantity,userId,type} = req.body;
//     if(type === "BUY"){
//         searchList = orders.sellList;
//         searchList.sort((a,b)=>a.price-b.price);
//         for(let i=0;i<searchList.length;i++){
//             if(quantity>0){
//                 transactions.push({
//                     buyer :  userId,
//                     seller : searchList[i].userId,
//                     price : searchList[i].price,
//                     quantity : Math.min(quantity,searchList[i].quantity)
//                 })
//                 modifyUsers(userId,searchList[i].userId, searchList[i].price , Math.min(quantity,searchList[i].quantity));
//                 if(parseInt(quantity)<parseInt(searchList[i].quantity)){
//                     clearOrder(orderId,"BUY");
//                     modifyOrder(searchList[i].orderId, "SELL",parseInt(searchList[i].quantity)-parseInt(quantity));
//                 }
//                 else  if(parseInt(quantity)>parseInt(searchList[i].quantity)) {
//                     clearOrder(searchList[i].orderId, "SELL");
//                     modifyOrder(orderId,"BUY",parseInt(quantity)-parseInt(searchList[i].quantity));
    
//                 }
//                 else{
//                     clearOrder(orderId,"SELL");
//                     clearOrder(searchList[i].orderId, "BUY");
//                 }
//                 quantity -= Math.min(quantity,searchList[i].quantity);
//                 Price.push(searchList[i].price); 
//             }
//             if(quantity ===0 ) break;
//         }
        
//     }
//     else if(type === "SELL"){
//         searchList = orders.buyList;
//         searchList.sort((a,b)=>b.price-a.price);
//         for(let i=0;i<searchList.length;i++){
//             if(quantity>0){
//                 transactions.push({
//                     buyer :  searchList[i].userId,
//                     seller : userId,
//                     price : price,
//                     quantity : Math.min(quantity,searchList[i].quantity)
//                  })
//                 modifyUsers(searchList[i].userId,userId, price , Math.min(quantity,searchList[i].quantity));
//                 if(parseInt(quantity)<parseInt(searchList[i].quantity)){
//                     clearOrder(orderId,"SELL");
//                     modifyOrder(searchList[i].orderId, "BUY",parseInt(searchList[i].quantity)-parseInt(quantity));
//                 }
//                 else if(parseInt(quantity)>parseInt(searchList[i].quantity)) {
//                     clearOrder(searchList[i].orderId, "BUY");
//                     modifyOrder(orderId,"SELL",parseInt(quantity)-parseInt(searchList[i].quantity));
//                 }
//                 else {
//                     clearOrder(orderId,"SELL");
//                     clearOrder(searchList[i].orderId, "BUY");
//                 }
//                 quantity -= Math.min(quantity,searchList[i].quantity);
//                 Price.push(price); 
//             }
//             if(quantity === 0 ) break;

//         }
//     }
// }

function modifyOrder(orderId , type ,quantity){
    if(type ==="BUY"){
        for(let i=0;i<orders.buyList.length;i++){
            console.log(orders.buyList[i].orderId,orderId);
            if(orders.buyList[i].orderId == orderId){
                orders.buyList[i]={
                    ...orders.buyList[i],
                    quantity : quantity
                }
            }
        }
        
    }
    else if(type === "SELL"){
    console.log(orders.sellList ,orderId);
    
        for(let i=0;i<orders.sellList.length;i++){
            console.log(orders.sellList[i].orderId,orderId);
           
            if(orders.sellList[i].orderId == orderId){
                orders.sellList[i]={
                    ...orders.sellList[i],
                    quantity : quantity
                }
            }
        }
    }
}

function clearOrder(orderId,type){

    if(type ==="BUY"){
        console.log(orders.buyList, orderId);
        for(let i=0;i<orders.buyList.length;i++){
            console.log(orders.buyList[i].orderId,orderId);
            if(orders.buyList[i].orderId == orderId){
                orders.buyList[i]={
                    ...orders.buyList[i],
                    status : "CLOSED"
                }
                console.log("found" ,orders.buyList[i]);

            }
        }
    }
    else if(type === "SELL"){
    console.log(orders.sellList ,orderId);
    
        for(let i=0;i<orders.sellList.length;i++){
            console.log(orders.sellList[i].orderId,orderId);
           
            if(orders.sellList[i].orderId == orderId){
                orders.sellList[i]={
                    ...orders.sellList[i],
                    status : "CLOSED"
                }
                console.log("found",orders.sellList[i]);
            }
        }
    }
}


const matchOrder=(req,res,next)=>{
    const {orderId,type} = req.body;
    let searchMap,price,quantity,userId,queryOrder,searchList; 

    if(type ==="BUY"){
        searchMap = orders.buyOrders;
        searchList = orders.sellList;

        queryOrder =searchMap.get(orderId); 
        price = queryOrder.price;
        quantity = queryOrder.quantity;
        userId = queryOrder.userId;
        console.log(queryOrder);
        if(price===-1) {
            price =1e9;
        }
        searchList.sort((a,b)=>a.price-b.price);
        for(let i=0;i<searchList.length;i++){
            if(searchList[i].price <= price){
                transactions.push({
                    buyer :  userId,
                    seller : searchList[i].userId,
                    price : searchList[i].price,
                    quantity : Math.min(quantity,searchList[i].quantity)
                })
                modifyUsers(userId,searchList[i].userId,price,searchList[i].price , Math.min(quantity,searchList[i].quantity));
                eventController.notifications.push({
                    message : searchList[i].userName + " traded his " + Math.min(quantity,searchList[i].quantity) + " stocks with " + queryOrder.userName + " at " + searchList[i].price + "each"
                })
                if(parseInt(quantity)<parseInt(searchList[i].quantity)){
                    clearOrder(orderId,"BUY");
                    modifyOrder(searchList[i].orderId, "SELL",parseInt(searchList[i].quantity)-parseInt(quantity));
                }
                else  if(parseInt(quantity)>parseInt(searchList[i].quantity)) {
                    clearOrder(searchList[i].orderId, "SELL");
                    modifyOrder(orderId,"BUY",parseInt(quantity)-parseInt(searchList[i].quantity));
                }
                else{
                    clearOrder(orderId,"BUY");
                    clearOrder(searchList[i].orderId, "SELL");
                }
                quantity -= Math.min(quantity,searchList[i].quantity);
                 Price.push(searchList[i].price); 
            }
            if(quantity === 0 ) break;
        }
    }
    else if(type ==="SELL") {
        searchMap = orders.sellOrders;
        searchList = orders.buyList;

        queryOrder =searchMap.get(orderId); 
        price = queryOrder.price;
        quantity = queryOrder.quantity;
        userId = queryOrder.userId;
        searchList.sort((a,b)=>b.price-a.price);
        for(let i=0;i<searchList.length;i++){
            if(searchList[i].price >= price){
                transactions.push({
                    buyer :  searchList[i].userId,
                    seller : userId,
                    price : (price===-1)?searchList[i].price:price,
                    quantity : Math.min(quantity,searchList[i].quantity)
                 })
                modifyUsers(searchList[i].userId,userId,searchList[i].price, price , Math.min(quantity,searchList[i].quantity));
                eventController.notifications.push({
                    message :  queryOrder.userName + " traded his " + Math.min(quantity,searchList[i].quantity) + " stocks with " +searchList[i].userName + " at " + price + "each"
                })
                if(parseInt(quantity)<parseInt(searchList[i].quantity)){
                    clearOrder(orderId,"SELL");
                    modifyOrder(searchList[i].orderId, "BUY",parseInt(searchList[i].quantity)-parseInt(quantity));
                }
                else if(parseInt(quantity)>parseInt(searchList[i].quantity)) {
                    clearOrder(searchList[i].orderId, "BUY");
                    modifyOrder(orderId,"SELL",parseInt(quantity)-parseInt(searchList[i].quantity));
                }
                else {
                    clearOrder(orderId,"SELL");
                    clearOrder(searchList[i].orderId, "BUY");
                }
                quantity -= Math.min(quantity,searchList[i].quantity);
               if(price === -1) Price.push(searchList[i].price);
               else Price.push(price); 
            }
            if(quantity === 0 ) break;
        }
        
    }
    res.status(200)
        .json({
            transactions : transactions,
            priceHistory : Price
        })
    
}

exports.matchOrder= matchOrder
// exports.matchMarketOrder= matchMarketOrder
exports.currentPrice = currentPrice
exports.priceHistory = priceHistory
exports.getTransactions = getTransactions
