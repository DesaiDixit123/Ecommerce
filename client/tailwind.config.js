/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                registerBg: {
                    400: "#161032"
                },
                topnav: {
                    400: "#D8F4E2"
                },
                topnavBorderBottom: {
                    400: "#39B4AC"
                }
            },

            backgroundImage: {
                'hero-pattern': "url('../')",
                'footer-texture': "url('/img/footer-texture.png')",
            }
        },
    },
    plugins: [],
};