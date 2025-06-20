import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@types": path.resolve(__dirname, "./src/types"),
			"@store": path.resolve(__dirname, "./src/store"),
			"@api": path.resolve(__dirname, "./src/api"),
			"@constants": path.resolve(__dirname, "./src/constants"),
			"@utils": path.resolve(__dirname, "./src/utils"),
		},
	},
	plugins: [react(), tailwindcss()],
});
