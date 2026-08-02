import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-DioYQOuF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ThemeContext = (0, import_react.createContext)({
	theme: "light",
	toggle: () => {}
});
var STORAGE_KEY = "krishi-theme";
function ThemeProvider({ children }) {
	const [theme, setTheme] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		const initial = window.localStorage.getItem(STORAGE_KEY) ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
		setTheme(initial);
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		document.documentElement.style.colorScheme = theme;
		window.localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);
	const value = (0, import_react.useMemo)(() => ({
		theme,
		toggle: () => setTheme((t) => t === "dark" ? "light" : "dark")
	}), [theme]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value,
		children
	});
}
function useTheme() {
	return (0, import_react.useContext)(ThemeContext);
}
//#endregion
export { useTheme as n, ThemeProvider as t };
