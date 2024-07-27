const express = require('express')
const { issueATicket, getAllTicketsByEventId, getATicketById, verifyATicketById } = require('../controllers/ticketControllers');

const Router = express.Router();

Router.post('/issueATicket',issueATicket);
Router.get('/getAllTickets/:eventId',getAllTicketsByEventId);
Router.get('/getATicket/:ticketId',getATicketById)
Router.put('/verifyTicket/:ticketId',verifyATicketById)

module.exports = Router