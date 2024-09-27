// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [react()],
//     server: {
//         proxy: {
//             "/api": {
//                 target: "https://ecommerce-5-cqr9.onrender.com",
//                 secure: false,
//                 changeOrigin: true,
//             },
//         },
//     },
// });



// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//     plugins: [react()],
//     server: {
//         proxy: {
//             "/api": {
//                 target: process.env.NODE_ENV === "production"
//                     ? "https://cybernetitsolution.co.in/api" // production URL
//                     : "http://localhost:4000", // development URL
//                 secure: process.env.NODE_ENV === "production", // production માટે `true`, development માટે `false`
//                 changeOrigin: true,
//             },
//         },
//     },
// });



// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//     plugins: [react()],
//     server: {
//         proxy: {
//             "/api": {
//                 target: import.meta.env.MODE === "production"
//                     ? "https://cybernetitsolution.co.in/api" // production URL
//                     : "http://localhost:4000", // development URL
//                 secure: import.meta.env.MODE === "production", // production માટે `true`, development માટે `false`
//                 changeOrigin: true,
//             },
//         },
//     },
// });



import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
    return {
        plugins: [react()],
        server: {
            proxy: {
                "/api": {
                    target: mode === "production"
                        ? "https://ecommerce-5-cqr9.onrender.com" // production URL
                        : "http://localhost:4000", // development URL
                    secure: mode === "production", // production માટે `true`, development માટે `false`
                    changeOrigin: true,
                },
            },
        },
    };
});
