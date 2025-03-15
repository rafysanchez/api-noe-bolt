import express from 'express';
import { body, validationResult } from 'express-validator';
import { roleMiddleware } from '../middleware/role.js';

const router = express.Router();

// Mock products database
let products = [
  { id: 1, name: 'Product 1', price: 99.99, description: 'Description 1' }
];

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Get product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// Create product (admin only)
router.post('/', 
  roleMiddleware(['admin']),
  [
    body('name').notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('description').notEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newProduct = {
      id: products.length + 1,
      ...req.body
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  }
);

// Update product (admin only)
router.put('/:id',
  roleMiddleware(['admin']),
  [
    body('name').notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('description').notEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    products[index] = {
      ...products[index],
      ...req.body
    };
    res.json(products[index]);
  }
);

// Delete product (admin only)
router.delete('/:id',
  roleMiddleware(['admin']),
  (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    products = products.filter(p => p.id !== parseInt(req.params.id));
    res.status(204).send();
  }
);

export { router as productRoutes };