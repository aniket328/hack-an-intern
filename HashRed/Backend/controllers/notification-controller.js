let notifications =[]

const getAll =(req,res,next)=>{
    res
        .status(200)
        .json({
            notifications: notifications
        })
}

const addNotification =(req,res,next)=>{
    const {message} = req.body;
    notifications.push({
        message
    })
}
exports.getAll = getAll;
exports.addNotification = addNotification;
exports.notifications = notifications;
