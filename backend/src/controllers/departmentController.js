const Department = require('../models/Department');

class DepartmentController {
  async getAllDepartments(req, res) {
    try {
      const departments = await Department.find();
      res.json(departments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDepartmentById(req, res) {
    try {
      const department = await Department.findById(req.params.id);
      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }
      res.json(department);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createDepartment(req, res) {
    try {
      const department = new Department(req.body);
      await department.save();
      res.status(201).json(department);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateDepartment(req, res) {
    try {
      const department = await Department.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }
      res.json(department);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteDepartment(req, res) {
    try {
      const department = await Department.findByIdAndDelete(req.params.id);
      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }
      res.json({ message: 'Department deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DepartmentController();
