// const fetch = require("node-fetch");
require("dotenv").config();

/**
 * Sends an HTTP request using node-fetch.
 * @param {string} url - The URL to send the request to.
 * @param {string} method - The HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {object} [headers={}] - Optional request headers.
 * @param {object} [body=null] - Optional request body.
 * @returns {Promise<object>} - A promise that resolves with the response data.
 */

const url = process.env.TG_URL;
const token = process.env.TG_API_TOKEN;
const baseUrl = `${url}/bot${token}`;

async function tgSendRequest(endPoint = "getMe", method = "GET", headers = {}, body = null) {
    try {
        const response = await fetch(baseUrl + "/" + endPoint, {
            method,
            headers: {
                ...headers,
            },
            body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
}

module.exports = { tgSendRequest };
