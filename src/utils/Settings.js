// src/utils/settings.js

const API_URL = 'http://localhost:8080/api/settings'; // Adjust the URL to your backend's URL

export const fetchSettings = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

export const saveSettings = async (settings) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
    });
    return await response.json();
};
