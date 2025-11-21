const API_URL = 'http://localhost:3000';

export const api = {
    // Food endpoints
    getFoods: async () => {
        const response = await fetch(`${API_URL}/foods`);
        if (!response.ok) throw new Error('Failed to fetch foods');
        return response.json();
    },

    seedFoods: async () => {
        const response = await fetch(`${API_URL}/foods/seed`, {
            method: 'POST',
        });
        if (!response.ok) throw new Error('Failed to seed foods');
        return response.text();
    },

    // Cart endpoints
    getCart: async () => {
        const response = await fetch(`${API_URL}/cart`);
        if (!response.ok) throw new Error('Failed to fetch cart');
        return response.json();
    },

    addToCart: async (foodId, quantity) => {
        const response = await fetch(`${API_URL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ foodId, quantity }),
        });
        if (!response.ok) throw new Error('Failed to add to cart');
        return response.text();
    },

    // Order endpoints
    placeOrder: async () => {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
        });
        if (!response.ok) throw new Error('Failed to place order');
        return response.json();
    },
};