const mongoose = require('mongoose');

const binaryTreeNodeSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true
  },
  left: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BinaryTreeNode'
  },
  right: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BinaryTreeNode'
  }
});

const BinaryTreeNode = mongoose.model('BinaryTreeNode', binaryTreeNodeSchema);

module.exports = BinaryTreeNode;
