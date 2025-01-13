import { defineConfig } from "vite";

export default defineConfig({
	// index.html out file will start with a relative path for script
	base: "./",
	server: {
		port: 4100,
	},
	build: {
		// disable this for low bundle sizes
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks: {
					kaplay: ["kaplay"],
				},
			},
		},
	},
});
