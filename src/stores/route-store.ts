import { readable, writable, derived, get } from "svelte/store";

let getBaseRoutes = (): Route => {

	return {
		title: "Home",
		page: "Home",
		path: "/",
		children: [
			{
				title: "Products",
				page: "Products",
				navName: "Products",
				path: "/products",
				children: [
					{
						title: "NXT-SDX: Software-Defined Radio",
						page: "SoftwareDefinedRadio",
						navName: "NXT-SDX: Software-Defined Radio",
						path: "/software-defined-radio",
						children: []
					}, {
						title: "NXT-SoC: System-on-chip platform",
						page: "SystemOnChip",
						navName: "NXT-SoC: System-on-chip platform",
						path: "/system-on-chip",
						children: []
					},
					{
						title: "NXT-IP: Intellectual Property Cores",
						page: "IntellectualProperty",
						navName: "NXT-IP: Intellectual Property Cores",
						path: "/intellectual-property",
						children: []
					}
				]
			},
			{
				title: "Technology",
				page: "Technology",
				navName: "Technology",
				path: "/technology",
				children: []
			},
			{
				title: "About Us",
				page: "About",
				navName: "About Us",
				path: "/about-us",
				isHidden: false,
				children: []
			},
			{
				title: "Contact Us",
				page: "Contact",
				navName: "Contact Us",
				path: "/contact-us",
				isHidden: false,
				children: []
			}, {
				title: "Register",
				page: "Register",
				navName: "Register",
				path: "/register",
				isHidden: true,
				children: []
			},
			{
				title: "Admin",
				page: "Admin",
				navName: "Admin",
				path: "/admin",
				isHidden: true,
				isAdmin: true,
				children: [
					{
						title: "IP Admin",
						page: "AdminIp",
						navName: "IP Admin",
						path: "/admin-ip",
						isHidden: true,
						isAdmin: true,
						children: []
					},
					{
						title: "Contact Admin",
						page: "AdminContacts",
						navName: "Contact Admin",
						path: "/admin-contacts",
						isHidden: true,
						isAdmin: true,
						children: []
					},
					{
						title: "User Admin",
						page: "AdminUsers",
						navName: "User Admin",
						path: "/admin-users",
						isHidden: true,
						isAdmin: true,
						children: []
					}
				]
			}
		]
	};
};

function filterAdminRoutes(node: Route) {
	if (node.children)
		node.children = node.children.filter(a => a.isAdmin !== true).map(a => filterAdminRoutes(a));

	return node;
}



function findRoute(routeRoot: Route, path: string): Route | undefined {
	let cr: Route | undefined;

	function traverse(node: Route): Route | undefined {

		if (node.path === path)
			return node;

		if (node.hasParam && path.startsWith(node.path + "/")) {
			return { ...node, path };
		}

		let cr: Route | undefined;

		if (node.children && node.children.length) {
			for (let i = 0; i < node.children.length; i += 1) {
				cr = traverse(node.children[i]);

				if (cr)
					return cr;
			}
		}
	}

	cr = traverse(routeRoot);

	return cr;
}

// Stores

export const routes = readable(getBaseRoutes());

export const currentPath = writable("/");
export const currentParams = writable<any>({});
export const isShowLogin = writable<boolean>(false);


export const currentRoute = derived([routes, currentPath], ([$routes, $currentPath]) => {
	let r = findRoute($routes, $currentPath);
	if (r) return r;

	$currentPath = "/";
	return $routes;
});

export const adminRoutes = derived([routes], ([$routes]) => {
	const r1 = $routes.children?.filter(a => a.isAdmin) ?? [];
	const r2 = r1.flatMap(a => a.children?.filter(c => c.isAdmin) ?? []);
	return [...r1, ...r2];
});

// Param functions

let paramStringToObj = (inp: string) => {
	let entries = (new URLSearchParams(inp)).entries();
	let p: any = {};
	for (let [key, val] of entries) {
		switch (val) {
			case "true":
				p[key] = true;
				break;
			case "false":
				p[key] = false;
				break;
			default:
				p[key] = val;
		}
	}
	return p;
};

let objToParamString = (inp: any) => {
	if (!inp) return "";

	let entries = Object.entries(inp);

	if (!entries.length) return "";

	let p = new URLSearchParams();
	for (let [key, val] of entries) {
		if (val === null || val === undefined || val === "") continue;
		p.append(key, <string>val);
	}

	return "?" + p.toString();
};

// Public Functions

export const navFromUrl = function () {
	let pathName = window.location.pathname;
	let r = findRoute(get(routes), pathName);

	if (!r) {
		window.location.replace(window.location.origin);
		currentPath.set("/");
		return;
	}

	let p: any;

	if (r.hasParam) {
		const re = /.*\/([^\/]+)\/?$/;
		let match = pathName.match(re);
		if (!match) {
			window.location.replace(window.location.origin);
			return;
		}
		p = { id: match[1] };
	}
	else {
		p = paramStringToObj(window.location.search);
	}

	currentPath.set(pathName);
	currentParams.set(p);
	document.title = `${r.title}`;
};

export const paramsFromUrl = () => {
	const p = paramStringToObj(window.location.search);
	currentParams.set(p);
	return p;
};

export const navTo = function (e: MouseEvent | null, pathName: string, params?: any) {
	e && e.preventDefault();
	let url = window.location.origin + pathName;

	let r = findRoute(get(routes), pathName);
	if (!r) {
		window.location.replace(window.location.origin);
		currentPath.set("/");
		return;
	}

	if (r.hasParam) {
		const re = /.*\/([^\/]+)\/?$/;
		let match = pathName.match(re);
		if (!match) {
			window.location.replace(window.location.origin);
			return;
		}
		params = { id: match[1] };
		currentParams.set(params);
	}
	else {
		if (params) {
			url += objToParamString(params);
			currentParams.set(params);
		}
		else {
			currentParams.set({});
		}
	}

	currentPath.set(pathName);
	document.title = `${r.title}`;

	window.history.pushState({}, pathName, url);
};

// Back Button

window.onpopstate = () => {
	let pathName = window.location.pathname;
	let r = findRoute(get(routes), pathName);

	if (r) {
		currentPath.set(pathName);
	} else {
		window.location.replace(window.location.origin);
	}
};
