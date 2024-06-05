const express = require('express');
const router = new express.Router();
const connectDB = require('./dbhelper');
const ObjectId = require('mongodb').ObjectId;

router.get('/sales', async (req, res) => {
  const db = await connectDB();
  let query = {}

  const search = req.query.purchaseMethod;
  if (search) {
    query = {
      purchaseMethod: search,
    }
  }
  const sales = await db.collection('sales')
    .find(query)
    .limit(50)
    .sort({ "storeLocation": -1 })
    .toArray();

  res.json(sales || []);
});

router.delete('/sales/:id', async (req, res) => {
  const id = (req.params.id);
  const objId = ObjectId.createFromHexString(id);
  const db = await connectDB();

  const sales = await db.collection('sales').deleteOne({ _id: objId });
  res.json(sales);
});

module.exports = router;
