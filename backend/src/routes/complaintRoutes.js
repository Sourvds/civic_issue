const express = require('express');
const complaintController = require('../controllers/complaintController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, complaintController.createComplaint);
router.get('/', auth, complaintController.getAllComplaints);
router.get('/stats', auth, complaintController.getStats);
router.get('/my-complaints', auth, complaintController.getUserComplaints);
router.get('/:id', auth, complaintController.getComplaintById);
router.patch('/:id/status', auth, complaintController.updateComplaintStatus);
router.patch('/:id/assign', auth, complaintController.assignComplaint);

module.exports = router;
