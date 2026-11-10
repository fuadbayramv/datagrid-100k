import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";

const budgetBytes = 150_000;

const html = readFileSync("dist/index.html", "utf8");
const entry = html.match(/<script[^>]+src="\/([^"]+\.js)"/)?.[1];
if (!entry) {
	throw new Error("No entry script found in dist/index.html");
}

const size = gzipSync(readFileSync(`dist/${entry}`)).byteLength;
console.log(`${entry}: ${size} bytes gzipped (budget ${budgetBytes})`);

if (size > budgetBytes) {
	console.error("Main bundle is over budget");
	process.exit(1);
}
