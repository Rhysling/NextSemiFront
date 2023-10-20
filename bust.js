
import fs from "fs-extra";

// console.log("__dirname: ", __dirname);
let baseUrl = "https://nextsemi.com";

// fs.ensureDirSync(".\\public-busted");
// fs.emptyDirSync(".\\public-busted");
// fs.ensureDirSync(".\\public-busted\\build");

fs.readFile(".\\dist\\index.html", "utf8")
	.then((a) => {
		return a
			.replace(/(<script>\s*var\sbaseURL\s=\s")[^"]+([^<]*<\/script>)/gm, `$1${baseUrl}$2`)
			.replace(/(<script>[^]*var\sapp_isProduction\s=\s)false([^<]*<\/script>)/gm, "$1true$2");
	})
	.then((a) => {
		fs.writeFile(".\\dist\\index.html", a, "utf8");
	});

