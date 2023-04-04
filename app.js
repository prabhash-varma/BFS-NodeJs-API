const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const BinaryTreeNode = require('./models/binaryTreeNode');

const app = express();
app.use(bodyParser.json());

const uri = 'mongodb+srv://prabhash:prabhash@cluster0.yxhwowp.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.get('/bfs/:id', async (req, res) => {
  const startNode = req.params.id;

  let queue = [];
  let visited = [];

  
  queue.push(startNode);

  while (queue.length > 0) {
    
    const currentNode = queue.shift();

    
    if (!visited.includes(currentNode)) {
      visited.push(currentNode);

      const node = await BinaryTreeNode.findOne({ data: currentNode }).populate('left right');

      if (node.left) {
        queue.push(node.left.data);
      }

      if (node.right) {
        queue.push(node.right.data);
      }
    }
  }

  res.send(visited);
});




app.get('/postdata', async (req, res) => {
    
const nodeA = new BinaryTreeNode({ data: 'A' });
const nodeB = new BinaryTreeNode({ data: 'B' });
const nodeC = new BinaryTreeNode({ data: 'C' });
const nodeD = new BinaryTreeNode({ data: 'D' });
const nodeE = new BinaryTreeNode({ data: 'E' });
const nodeF = new BinaryTreeNode({ data: 'F' });
const nodeG = new BinaryTreeNode({ data: 'G' });


nodeA.left = nodeB;
nodeA.right = nodeC;
nodeB.left = nodeD;
nodeB.right = nodeE;
nodeC.left = nodeF;
nodeC.right = nodeG;


Promise.all([
  nodeA.save(),
  nodeB.save(),
  nodeC.save(),
  nodeD.save(),
  nodeE.save(),
  nodeF.save(),
  nodeG.save()
])
  .then(() => console.log('Nodes saved to database'))
  .catch((err) => console.log(err));


});


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
