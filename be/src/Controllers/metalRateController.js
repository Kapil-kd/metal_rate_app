const MetalRate = require("../models/MetalRate");
const Purity = require("../models/Purity");

exports.getLatestRate = async (req, res) => {
  try {
    const { metal, purityId } = req.query;
    if (!metal || !purityId) {
      return res.status(404).json({ msg: "Bad request" });
    }
    const latest = await MetalRate.findOne({ metal, purity: purityId }).sort({
      rateDate: -1,
    });
    res.json(latest);
  } catch (error) {
    return res.status(200).json({ msg: "Internal server error", code: 500 });
  }
};

exports.createRate = async (req, res) => {
  try {
    const { metal, purityId, rate, rateDate } = req.body;
    if (!rateDate || !metal || !purityId || !rate) {
      return res.status(404).json({ msg: "Bad request" });
    }
    const purity = await Purity.findById(purityId);
    if (!purity) return res.status(400).json({ msg: "Invalid purity" });
    const newRate = new MetalRate({ metal, purity: purityId, rate, rateDate });
    await newRate.save();
    res.json(newRate);
  } catch (error) {
    return res.status(200).json({ msg: "Internal server error", code: 500 });
  }
};

exports.listRates = async (req, res) => {
  try {
    const { metal, purityId, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (metal) filter.metal = metal;
    if (purityId) filter.purity = purityId;

    const rates = await MetalRate.find(filter)
      .sort({ rateDate: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("purity");
    const total = await MetalRate.countDocuments(filter);
    res.json({ rates, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    return res.status(200).json({ msg: "Internal server error", code: 500 });
  }
};
