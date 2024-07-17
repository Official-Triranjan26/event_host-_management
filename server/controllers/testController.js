
const test1=(req, res) => {
    // Admin only route to create an event
    res.send('Event for admin');
}
const test2=(req, res) => {
    // User only route to create an event
    res.send('Event for user');
}

module.exports={test1,test2};