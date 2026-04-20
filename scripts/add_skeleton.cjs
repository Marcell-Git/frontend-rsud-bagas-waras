const fs = require('fs');
const path = require('path');

const adminDir = path.join('d:', 'Coding', 'website RSUD Bagas Waras', 'frontend rsud', 'src', 'pages', 'admin');

function getClosingTagIndex(content, startIndex) {
    let stack = 0;
    let i = startIndex;
    while (i < content.length) {
        if (content.substr(i, 4) === '<div') {
            stack++;
            i += 4;
        } else if (content.substr(i, 6) === '</div>') {
            stack--;
            if (stack === 0) {
                return i + 6;
            }
            i += 6;
        } else {
            i++;
        }
    }
    return -1;
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('TableSkeleton') || !content.includes('useState')) return;
    
    // Check if it has fetch function
    if (!/const fetch\w+\s*=/.test(content)) return;

    // 1. Add isLoading State
    if (!content.includes('isLoading, setIsLoading')) {
        content = content.replace(/(const \[(\w+), set\2\] = useState\([^)]*\);)/, "$1\n  const [isLoading, setIsLoading] = useState(true);");
    }

    // 2. Import TableSkeleton
    // We adjust the path depth based on how many folders deep it is from admin/
    const relativePath = path.relative(adminDir, filePath);
    const depth = relativePath.split(path.sep).length - 1; // 0 for Admin, 1 for subfolders
    let importPath = '../../../components/admin/TableSkeleton';
    if (depth === 0) importPath = '../../components/admin/TableSkeleton'; // for index.jsx which probably doesn't need it but just in case
    
    let importStatement = `import TableSkeleton from '${importPath}';\n`;
    if(content.includes('import ConfirmModal')) {
        content = content.replace(/(import ConfirmModal.*?;)/, "$1\n" + importStatement);
    } else if(content.includes('import Pagination')) {
        content = content.replace(/(import Pagination.*?;)/, "$1\n" + importStatement);
    } else if(content.includes('import Modal')) {
        content = content.replace(/(import Modal.*?;)/, "$1\n" + importStatement);
    } else {
        content = content.replace(/(import React.*?;\n)/, "$1" + importStatement);
    }

    // 3. Update fetch function
    content = content.replace(/(const fetch\w+\s*=\s*async\s*\([^)]*\)\s*=>\s*\{)/g, "$1\n    setIsLoading(true);");
    content = content.replace(/(} catch \([^)]+\) \{[\s\S]*?\n\s*\})(?!\s*finally)/g, "$1 finally {\n      setIsLoading(false);\n    }");

    // 4. Wrap table container
    // Find overflow-x-auto div
    const searchString = '<div className="overflow-x-auto">';
    let startIndex = content.indexOf(searchString);
    if (startIndex !== -1) {
        // Since we are replacing what surrounds this div to include its siblings if they are wrapped in a parent?
        // Wait, some components have <Pagination> right after overflow-x-auto, inside a parent <div className="bg-white rounded... ">
        // The safest wrapping is to wrap the parent <div className="bg-white rounded... "> children.
        // Let's find <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"> or similar parent
        
        let parentSearchStrings = [
            '<div className="bg-white rounded-[32px]',
            '<div className="bg-white rounded-3xl',
            '<div className="bg-white rounded-2xl'
        ];
        
        let pIndex = -1;
        let pString = '';
        for (let s of parentSearchStrings) {
            let idx = content.indexOf(s);
            // We want the last one before startIndex
            let lastIdx = content.lastIndexOf(s, startIndex);
            if (lastIdx !== -1) {
                pIndex = lastIdx;
                pString = s;
                break;
            }
        }

        if (pIndex !== -1) {
            let endParentTagIndex = getClosingTagIndex(content, pIndex);
            if (endParentTagIndex !== -1) {
                // Find where the div starts its children
                let innerIndex = content.indexOf('>', pIndex) + 1;
                
                let before = content.substring(0, innerIndex);
                let inner = content.substring(innerIndex, endParentTagIndex - 6);
                let after = content.substring(endParentTagIndex - 6);

                let newInner = `\n        {isLoading ? (\n          <div className="p-6">\n            <TableSkeleton />\n          </div>\n        ) : (\n          <>\n` + 
                               inner + 
                               `\n          </>\n        )}\n      `;
                
                content = before + newInner + after;
            }
        }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Processed: ${filePath}`);
}

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (fs.statSync(dirPath).isDirectory()) {
            if(f !== 'components') walkDir(dirPath, callback);
        } else {
            if (dirPath.endsWith('.jsx')) {
                callback(dirPath);
            }
        }
    });
}

walkDir(adminDir, processFile);
