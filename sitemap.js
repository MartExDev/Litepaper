const fs = require("fs");
const path = require("path");

const prefix = "https://docs.shopfi.app";
const ignores = ['README.md', 'SUMMARY.md']
let sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${prefix}</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><changefreq>weekly</changefreq></url>`;

getItems(".", true).forEach(f => {
    if (!f.endsWith(".md")) return;
    if (ignores.includes(f)) return;
    let fullUrl = `${prefix}/${f.replace(".md", '')}`;
    sitemap += `<url><loc>${fullUrl}</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><changefreq>weekly</changefreq></url>`
})

getItems(".").forEach(i => {
    console.log(i);
    let files = getItems(i, true);
    files.forEach(f => {
        let fullUrl = `${prefix}/${i}/${f.replace(".md", '')}`;
        sitemap += `<url><loc>${fullUrl}</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><changefreq>weekly</changefreq></url>`
    });
})
sitemap += "</urlset>"
fs.writeFileSync("./sitemap.xml", sitemap)

function getItems(p, isFile = false) {
    const sub = fs.readdirSync(p);
    return sub.filter(item => !item.startsWith(".") && (isFile ? fs.statSync(`${p}/${item}`).isFile() : !fs.statSync(`${p}/${item}`).isFile()));
}