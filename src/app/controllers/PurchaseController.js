const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const Queue = require('../services/Queue')
const PurchaseMail = require('../jobs/PurchaseMail')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchase = await Purchase.create({ ...req.body })

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.json(purchase)
  }

  async accept (req, res) {
    const purchase = await Purchase.findById(req.params.id)

    const ad = await Ad.findByIdAndUpdate(purchase.ad, { purchase: req.params.id }, {
      new: true
    })

    return res.json(ad)
  }
}

module.exports = new PurchaseController()
