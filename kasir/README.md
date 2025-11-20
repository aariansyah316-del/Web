# Cash Register Application

## Overview
This project is a cash register application designed to manage sales transactions efficiently. It provides a user-friendly interface for displaying products, managing a shopping cart, and processing payments.

## Project Structure
```
kasir
├── index.html          # Main HTML document
├── style.css          # Styles for the application
├── script.js          # Main JavaScript logic
├── src
│   ├── components
│   │   ├── POSDisplay.js  # Manages the display of POS information
│   │   ├── ProductList.js  # Handles rendering of product list
│   │   └── Checkout.js     # Manages the checkout process
│   ├── data
│   │   └── products.json    # Contains product data
│   ├── utils
│   │   └── calculations.js   # Utility functions for calculations
│   └── styles
│       └── variables.css     # CSS variables for consistent styling
├── tests
│   └── calculations.test.js   # Unit tests for calculations
├── package.json              # npm configuration file
├── .gitignore                # Files to be ignored by version control
└── README.md                 # Project documentation
```

## Setup Instructions
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies using npm:
   ```
   npm install
   ```
4. Open `index.html` in your web browser to view the application.

## Usage Guidelines
- Use the product list to add items to your cart.
- The total amount will be displayed in the POS display.
- Proceed to checkout to complete your purchase.

## Contributing
Contributions are welcome! Please submit a pull request for any enhancements or bug fixes.