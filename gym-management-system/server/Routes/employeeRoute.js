const router = require('express').Router()
const employeeController = require('../Controller/employeeController')

router.get('/api/v1/employee-availability', employeeController.getSubmittedAvailability)
router.post('/api/v1/employee-availability', employeeController.submitAvailability)
router.put('/api/v1/employee-availability/:id', employeeController.editAvailability)
router.delete('/api/v1/employee-availability/:id', employeeController.deleteAvailability)

module.exports = router
