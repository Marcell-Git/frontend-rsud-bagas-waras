const fs = require("fs");
const path = require("path");

function walk(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (let file of list) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath, files);
    } else {
      if (
        filePath.endsWith(".jsx") ||
        filePath.endsWith(".tsx") ||
        filePath.endsWith(".js")
      ) {
        files.push(filePath);
      }
    }
  }
  return files;
}

const replacements = {
  "bg-gradient-to-br": "bg-linear-to-br",
  "bg-gradient-to-r": "bg-linear-to-r",
  "bg-gradient-to-t": "bg-linear-to-t",
  "bg-gradient-to-b": "bg-linear-to-b",
  "flex-[1]": "flex-1",
  "flex-[2]": "flex-2",
  "z-[100]": "z-100",
  "w-[1px]": "w-px",
  "flex-shrink-0": "shrink-0",
  "aspect-[3/4]": "aspect-3/4",
  "aspect-[4/3]": "aspect-4/3",
  "aspect-[4/5]": "aspect-4/5",
  "aspect-[2/1]": "aspect-2/1",
  "w-[30rem]": "w-120",
  "h-[30rem]": "h-120",
  "w-[25rem]": "w-100",
  "h-[25rem]": "h-100",
  "break-words": "wrap-break-word",
  " w-[140px]": "", // Remove the conflicting w-[140px] specifically
  "leading-relaxed leading-snug": "leading-relaxed",
  "leading-snug leading-relaxed": "leading-relaxed",
};

const srcDir = path.resolve(__dirname, "src");
console.log("Scanning directory:", srcDir);
const files = walk(srcDir);

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  let changed = false;

  for (const [key, value] of Object.entries(replacements)) {
    if (content.includes(key)) {
      content = content.replaceAll(key, value);
      changed = true;
    }
  }

  // specifically fix PengaduanKorupsi.jsx if there are any trailing spaces due to empty string replacement
  content = content.replace(/ +"/g, '"');

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated: ${path.relative(srcDir, file)}`);
  }
}

console.log("Done fixing Tailwind classes.");
