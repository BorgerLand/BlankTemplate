import { defineConfig } from "vite";
import * as path from "path";
import basicSsl from "@vitejs/plugin-basic-ssl";
import tsconfig from "./src/tsconfig.json";
import checker from "vite-plugin-checker";

//https://vite.dev/config/
export default defineConfig({
	publicDir: "assets",
	plugins: [basicSsl(), checker({ typescript: { tsconfigPath: "src/tsconfig.json" }, enableBuild: true })],
	resolve: {
		alias: Object.fromEntries(
			Object.entries(tsconfig.compilerOptions.paths).map(([key, [value]]) => [
				key.replace(/\/\*$/, ""),
				path.resolve("src/" + value.replace(/\/\*$/, "")),
			]),
		),
	},
	server: {
		headers: {
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Embedder-Policy": "require-corp",
			"Cache-Control": "no-store, no-cache, must-revalidate",
			Pragma: "no-cache",
			Expires: "0",
			"Strict-Transport-Security": "max-age=31536000; includeSubDomains",
		},
	},
	build: {
		outDir: "release/client",
		rolldownOptions: {
			//can't bundle this because it's imported dynamically
			external: ["@borger/rs"],
		},
	},
});
