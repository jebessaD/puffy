import React from 'react';

const ProductsPage: React.FC = () => {
    const products = [
        { id: 1, name: 'Product One', price: '$10' },
        { id: 2, name: 'Product Two', price: '$20' },
        { id: 3, name: 'Product Three', price: '$30' },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Products Page</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsPage;