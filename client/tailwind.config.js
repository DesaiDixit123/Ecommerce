/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                registerBg: {
                    400: "#161032"
                }
            },
        },
    },
    plugins: [],
};