const Truck = require('../models/truck');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');

module.exports = class TruckController {
  /**
   * Get all trucks
   * @param req
   * @param res
   * @returns void
   */
  static async getTrucks(req, res) {
    try {
      const trucks = await Truck.find({}, { '_id': 0, '_v': 0 }).sort('-dateAdded').exec()
      res.json(trucks);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  /**
   * Save a truck
   * @param req
   * @param res
   * @returns void
   */
  static async addTruck(req, res) {

    try {
      const { status, title, description } = req.body
      if(!status || !title || !description)
        res.status(403).end();

      const newTruck = new Truck({ status, title, description })
      
      // Let's sanitize inputs
      newTruck.title = sanitizeHtml(newTruck.title);
      newTruck.status = sanitizeHtml(newTruck.status);
      newTruck.description = sanitizeHtml(newTruck.description);

      newTruck.slug = slug(newTruck.title.toLowerCase(), { lowercase: true });
      newTruck.cuid = cuid();

      const ret = await newTruck.save()
      res.json(ret)
    } catch (err) {
      res.status(500).send(err);
    }
  }

  /**
   * Get a single truck
   * @param req
   * @param res
   * @returns void
   */
  static async getTruck(req, res) {
    try {
      const truck = await Truck.findOne({ id: req.params.id }, { '_id': 0, '_v': 0 }).exec()
      res.json(truck);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  /**
   * Delete a truck
   * @param req
   * @param res
   * @returns void
   */
  static async deleteTruck(req, res) {
    try {
      const truck = await Truck.findOne({ id: req.params.id }, { '_id': 0, '_v': 0 }).exec()
      const deleted = await truck.remove();
      res.json(deleted);
    } catch (err) {
      res.status(500).send(err);
    }
  }

}