const Purity = require("../models/Purity");
const { METALS } = require("../utils/constants");

exports.createPurity = async (req, res) => {
  try {
    const { metal, name, value } = req.body;
    if (!metal || !name || !value) {
      return res.status(404).json({ msg: "Bad request" });
    }
    if (!METALS.includes(metal))
      return res.status(400).json({ msg: "Invalid metal" });
    const purity = new Purity({ metal, name, value });
    await purity.save();
    res.json(purity);
  } catch (error) {
    return res.status(200).json({ msg: "Internal server error", code: 500 });
  }
};

exports.getPurities = async (req, res) => {
  try {
    const purities = await Purity.find();
    res.json(purities);
  } catch (error) {
    return res.status(200).json({ msg: "Internal server error", code: 500 });
  }
};

exports.updatePurity = async (req, res) => {
  try {
    const { id } = req.params;
    const { metal, name, value } = req.body;
    if (!id || !metal || !name || !value) {
      return res.status(404).json({ msg: "Bad request" });
    }
    const updated = await Purity.findByIdAndUpdate(
      id,
      { metal, name, value },
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: "Purity not found" });
    res.json(updated);
  } catch (error) {
    return res.status(200).json({ msg: "Internal server error", code: 500 });
  }
};

exports.deletePurity = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ msg: "Id not found" });
    }
    const removed = await Purity.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ msg: "Purity not found" });
    res.json({ msg: "Deleted" });
  } catch (error) {
    return res.status(200).json({ msg: "Internal server error", code: 500 });
  }
};
