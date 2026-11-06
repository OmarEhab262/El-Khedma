import fs from 'fs';

const mdContent = fs.readFileSync('full_book.md', 'utf8');

const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>Node.js & Backend Development</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; line-height: 1.8; padding: 40px; max-width: 900px; margin: auto; background-color: #f9f9f9; direction: rtl; color: #333; }
        h1, h2, h3 { color: #2c3e50; }
        pre { background-color: #2d3436; color: #dfe6e9; padding: 15px; border-radius: 8px; overflow-x: auto; direction: ltr; text-align: left; }
        code { font-family: 'Consolas', monospace; background: #eee; padding: 2px 4px; border-radius: 3px; color: #d63031; direction: ltr; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; background: #fff; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: right; }
        th { background-color: #3498db; color: white; }
        p, li { direction: auto; text-align: right; }
    </style>
</head>
<body>
    <div id="content"></div>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script>
        const markdownContent = \`${mdContent.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\`;
        document.getElementById('content').innerHTML = marked.parse(markdownContent);
    </script>
</body>
</html>`;

fs.writeFileSync('book.html', html, 'utf8');
console.log('HTML generated successfully!');
