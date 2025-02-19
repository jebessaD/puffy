// Define the root project directory (replace with your actual path)
$rootPath = "C:\Users\Jaba\Documents\projects\puffy"

// Define all directories following Next.js 14 (App Router) structure
$directories = @(
    "$rootPath\app",
    "$rootPath\app\api",
    "$rootPath\app\api\auth",
    "$rootPath\app\api\products",
    "$rootPath\app\api\cart",
    "$rootPath\app\api\checkout",
    "$rootPath\app\api\orders",
    "$rootPath\app\products",
    "$rootPath\app\cart",
    "$rootPath\app\checkout",
    "$rootPath\app\success",
    "$rootPath\app\cancel",
    "$rootPath\app\profile",
    "$rootPath\app\wishlist",
    "$rootPath\app\components",
    "$rootPath\app\components\ui",
    "$rootPath\app\hooks",
    "$rootPath\app\lib",
    "$rootPath\app\styles",
    "$rootPath\app\types",
    "$rootPath\tests"
)

// Define files with comments for each content
$files = @{
    "$rootPath\.env" = @"
// Environment variables for your database, authentication, and Stripe keys.
DATABASE_URL=your_postgres_url
SUPABASE_URL=your_supabase_url
STRIPE_SECRET_KEY=your_stripe_secret
"@
    "$rootPath\next.config.js" = @"
// Next.js configuration file to enable reactStrictMode
module.exports = { reactStrictMode: true };
"@
    "$rootPath\app\api\auth\signup\route.ts" = @"
// API route for handling user signup logic (authentication).
// It should handle POST requests to create a new user.
"@
    "$rootPath\app\api\auth\login\route.ts" = @"
// API route for handling user login logic (authentication).
// It should handle POST requests to authenticate a user.
"@
    "$rootPath\app\api\products\route.ts" = @"
// API route to fetch all product data from the database.
// It should handle GET requests to return a list of products.
"@
    "$rootPath\app\api\cart\add\route.ts" = @"
// API route to add an item to the shopping cart.
// It should handle POST requests to add a product to the user's cart.
"@
    "$rootPath\app\api\cart\remove\route.ts" = @"
// API route to remove an item from the shopping cart.
// It should handle POST requests to remove a product from the user's cart.
"@
    "$rootPath\app\api\checkout\route.ts" = @"
// API route to handle the checkout process (e.g., payment initiation).
// It should handle POST requests to initiate a payment process.
"@
    "$rootPath\app\api\orders\route.ts" = @"
// API route to fetch order history for a user.
// It should handle GET requests to retrieve past orders.
"@
    "$rootPath\app\layout.tsx" = @"
// Layout component to wrap around your pages.
// This component should provide a common layout (e.g., header, footer) for your pages.
"@
    "$rootPath\app\page.tsx" = @"
// Main home page of your eCommerce website.
// This is where you could display an introductory message or featured products.
"@
    "$rootPath\app\products\page.tsx" = @"
// Page for displaying all available products in your eCommerce store.
// This page will list all products, possibly with filters and sorting options.
"@
    "$rootPath\app\products\[id]\page.tsx" = @"
// Dynamic product detail page based on the product ID.
// This page will display detailed information about a single product.
"@
    "$rootPath\app\cart\page.tsx" = @"
// Cart page for the user to view and manage items in the shopping cart.
// This page will show the products added to the cart and allow modification.
"@
    "$rootPath\app\checkout\page.tsx" = @"
// Checkout page for the user to proceed with payment.
// This page should gather shipping and payment details from the user.
"@
    "$rootPath\app\success\page.tsx" = @"
// Success page to show after successful payment or order completion.
// This page will confirm the payment and display order details.
"@
    "$rootPath\app\cancel\page.tsx" = @"
// Cancel page to show when payment or checkout fails.
// This page will inform the user that the payment was unsuccessful.
"@
    "$rootPath\app\profile\page.tsx" = @"
// Profile page for the logged-in user to view and edit their personal information.
// This page will allow the user to update details like name, email, and password.
"@
    "$rootPath\app\wishlist\page.tsx" = @"
// Wishlist page for the user to view products they have saved for later.
// This page will display items added to the user's wishlist.
"@
    "$rootPath\app\components\ui\button.tsx" = @"
// Button component to provide reusable UI elements for buttons throughout the app.
// This should be a customizable component for buttons with text or icons.
"@
    "$rootPath\app\components\ui\input.tsx" = @"
// Input component for reusable input fields throughout the app.
// This should handle different types of input fields such as text, email, password, etc.
"@
    "$rootPath\app\components\ui\navbar.tsx" = @"
// Navbar component to provide a top navigation bar for the website.
// This component will display links for navigation across the website.
"@
    "$rootPath\app\components\ui\footer.tsx" = @"
// Footer component to provide a bottom section with useful links and information.
// This component could display contact info, legal disclaimers, and social media links.
"@
    "$rootPath\app\hooks\useProducts.ts" = @"
// Custom hook to fetch products using SWR (or other data fetching libraries).
// This hook will fetch the list of products from the server-side API.
"@
    "$rootPath\app\hooks\useCart.ts" = @"
// Custom hook to manage cart items in the state.
// This hook should allow adding/removing items to/from the cart.
"@
    "$rootPath\app\hooks\useOrder.ts" = @"
// Custom hook to manage order state for the checkout and payment process.
// This hook will handle the submission of orders and tracking of their status.
"@
    "$rootPath\app\hooks\useAuth.ts" = @"
// Custom hook for managing authentication and session state.
// This hook will track whether the user is logged in or not.
"@
    "$rootPath\app\lib\prisma.ts" = @"
// Prisma client initialization to interact with the database.
// This will allow the app to query and update the database.
"@
    "$rootPath\app\lib\supabase.ts" = @"
// Supabase client initialization for authentication and data storage.
// This will handle the user login/logout process and interact with Supabase.
"@
    "$rootPath\app\lib\stripe.ts" = @"
// Stripe client initialization for handling payment transactions.
// This will integrate Stripe's payment processing and billing features.
"@
    "$rootPath\app\types\product.ts" = @"
// TypeScript type definition for a product object.
// This defines the structure of product data like id, name, price, etc.
"@
    "$rootPath\app\types\cart.ts" = @"
// TypeScript type definition for a cart item.
// This defines the structure of a product in the cart with quantity.
"@
    "$rootPath\app\types\order.ts" = @"
// TypeScript type definition for an order object.
// This defines the structure of an order, including status, total price, etc.
"@
    "$rootPath\app\types\user.ts" = @"
// TypeScript type definition for a user object.
// This defines the structure of user data, like user ID, email, and name.
"@
    "$rootPath\tsconfig.json" = @"
// TypeScript configuration file for enabling strict type-checking
{
  ""compilerOptions"": { ""strict"": true }
}
"@
    "$rootPath\package.json" = @"
// Project dependencies for Puffy eCommerce
{
  ""name"": ""puffy-ecommerce"",
  ""dependencies"": {
    ""next"": ""latest"",
    ""react"": ""latest"",
    ""react-dom"": ""latest"",
    ""prisma"": ""latest"",
    ""@prisma/client"": ""latest"",
    ""supabase-js"": ""latest"",
    ""stripe"": ""latest"",
    ""swr"": ""latest"",
    ""shadcn/ui"": ""latest"",
    ""tailwindcss"": ""latest"",
    ""postcss"": ""latest"",
    ""autoprefixer"": ""latest""
  }
}
"@
    "$rootPath\README.md" = @"
// Puffy eCommerce Project
This is an eCommerce website built using Next.js 14 with Prisma, Stripe, Supabase for authentication, and ShadCN UI components.
"@
}

// Create directories if they do not exist
foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
        New-Item -Path $dir -ItemType Directory -Force | Out-Null
        Write-Host "Created directory: $dir"
    }
}

// Create files with their content if they do not exist
foreach ($file in $files.Keys) {
    if (!(Test-Path $file)) {
        Set-Content -Path $file -Value $files[$file] -Force
        Write-Host "Created file: $file"
    }
}

Write-Host "Project structure created with comments"
