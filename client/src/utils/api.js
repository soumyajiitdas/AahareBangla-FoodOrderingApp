const API_URL = 'http://localhost:3000';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

export const api = {
    // Auth endpoints
    register: async (userData) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Registration failed');
        return data;
    },

    login: async (email, password, rememberMe) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, rememberMe }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Login failed');
        return data;
    },

    getMe: async () => {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: getAuthHeaders(),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch user');
        return data;
    },

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
        const response = await fetch(`${API_URL}/cart`, {
            headers: getAuthHeaders(),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch cart');
        return data;
    },

    addToCart: async (foodId, quantity) => {
        const response = await fetch(`${API_URL}/cart`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ foodId, quantity }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to add to cart');
        return data;
    },

    updateCartItem: async (itemId, quantity) => {
        const response = await fetch(`${API_URL}/cart/${itemId}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ quantity }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to update cart');
        return data;
    },

    removeFromCart: async (itemId) => {
        const response = await fetch(`${API_URL}/cart/${itemId}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to remove item');
        return data;
    },

    clearCart: async () => {
        const response = await fetch(`${API_URL}/cart`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to clear cart');
        return data;
    },

    // Order endpoints
    placeOrder: async () => {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: getAuthHeaders(),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to place order');
        return data;
    },

    getOrders: async () => {
        const response = await fetch(`${API_URL}/orders`, {
            headers: getAuthHeaders(),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch orders');
        return data;
    },

    getOrderById: async (orderId) => {
        const response = await fetch(`${API_URL}/orders/${orderId}`, {
            headers: getAuthHeaders(),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch order');
        return data;
    },
};