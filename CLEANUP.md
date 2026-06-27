# readlens Website — File Classification for GitHub

**Three buckets**: KEEP (commit), SKIP (ignore), REVIEW (decide per preference).
All paths relative to project root `projectIbnAwwam/`.

---

## 🟢 KEEP — Required for the website or repo

These belong in GitHub. Everything the Vite app needs to build + render.

### Build system
| File | Why |
|------|-----|
| `package.json` | Declares `vite` as dependency |
| `vite.config.js` | Multi-page entry points (5 HTML files) |
| `index.html` | Home page entry |

### Source (the actual website code)
| File | Why |
|------|-----|
| `src/css/styles.css` | All styling incl. Gantt chart |
| `src/js/main.js` | Nav, sidebar, scroll, reveal logic |
| `three-header.js` | Three.js animated background |

### Pages (Vite entry points)
| File | Why |
|------|-----|
| `pageourteam/index.html` | Team page |
| `pageproblemidentification/index.html` | Problem identification page |
| `pageengineeringdesign/index.html` | Engineering design page (with inline Gantt) |
| `pagedesignrequirement/index.html` | Design requirements page |

### Content (text pages reference these directly)
| File | Why |
|------|-----|
| `pagehome/HOME.txt` | Home page content |
| `pagehome/gambardepan.webp` | Home page image |
| `pagehome/haykalhome.png` | Home page image |
| `pageourteam/Our teams.txt` | Team page content |
| `pageourteam/Adam.jpeg` | Team member photo |
| `pageourteam/Amir.jpeg` | Team member photo |
| `pageourteam/Hariz.jpeg` | Team member photo |
| `pageourteam/Haziq.jpeg` | Team member photo |
| `pageourteam/Irham.jpeg` | Team member photo |
| `pageproblemidentification/PROBLEM IDENTIFICATION.txt` | Section content |
| `pageproblemidentification/Global Impact Alignment.txt` | Section content |
| `pageproblemidentification/Benchmarking.txt` | Section content |
| `pageproblemidentification/PROJECT GOAL.txt` | Section content |
| `pageproblemidentification/Research Validation.txt` | Section content |
| `problem identification.docx` | Source document (proves origin) |
| `pagedesignrequirement/REQUIRED DESIGN FEATURES AND BASIC.txt` | Content |
| `pagedesignrequirement/DESIGN SPECIFICATION.txt` | Content |
| `pageengineeringdesign/billofprocess.txt` | Bill of process content |
| `pageengineeringdesign/haykalengineeringdesign.pdf` | Source PDF |
| `pageproblemidentification/haykalproblemidentification.pdf` | Source PDF |
| `pagedesignrequirement/haykaldesignrequirement.pdf` | Source PDF |

### Images (used by page HTML)
| File | Used in |
|------|---------|
| `pageengineeringdesign/biilingofprocess.png` | Engineering page |
| `pageengineeringdesign/flowchart.png` | Engineering page |
| `pageengineeringdesign/projecttimeline.png` | Engineering page |
| `pageengineeringdesign/circuitdiagram.png` | Engineering page |
| `pageengineeringdesign/flowchartnew.png` | Engineering page (newer version) |
| `pageengineeringdesign/testcard1.png` | Engineering page |
| `pageengineeringdesign/testcard2.png` | Engineering page |
| `pagedesignrequirement/circuitdiagram1.png` | Design req page |
| `pagedesignrequirement/designsketch.png` | Design req page |
| `pagedesignrequirement/features and functionality.png` | Design req page |
| `pageproblemidentification/blindpeoplewalking.jpg` | Problem page |
| `pageproblemidentification/blindpeoplewithcane.avif` | Problem page |
| `pageproblemidentification/blindwithbraille.JPEG` | Problem page |

### Logo (referenced by `src/js/main.js` nav)
| File | Why |
|------|-----|
| `blacklogoandtext.png` | Top-nav logo (JS injects this path) |

### Repo meta
| File | Why |
|------|-----|
| `README.md` | GitHub landing page |

---

## 🔴 SKIP — Do NOT commit to GitHub

These are build artifacts, IDE config, unrelated junk, or duplicates.

### Build / dependency artifacts (regenerate with `npm install && npm run build`)
```
node_modules/
dist/
```

### IDE & editor config
```
.claude/
.vscode/
```

### Unrelated separate project (31,000+ files, 546 MB!)
```
next-monorepo/
```

### Duplicate / obsolete files
| File | Reason |
|------|--------|
| `styles.css` (project root) | OLD duplicate of `src/css/styles.css` (15KB vs 38KB) — real one lives in src/css/ |

### Empty directory
```
src/components/
```

### Logo variants (NOT referenced anywhere — only `blacklogoandtext.png` is used)
```
logoandtexttransparent.png
logobarugaisblacktransparent.png
logobarugaishijau.png
logobarugaiswhitetransparent.png
```

---

## 🟡 REVIEW — Your call

### Old images git thinks you still have (deleted in working tree)
These show as deleted in `git status` but are tracked. Decide:
- **Keep on disk** but stop tracking? → `git rm --cached <file>`
- Actually already gone? → `git add -A` to stage the deletions

```
pageproblemidentification/benchmarking.png
pageproblemidentification/global impact.png
pageproblemidentification/problem identification.png
pageproblemidentification/project goal.png
pageproblemidentification/researchvalidation.png
pagehome/project definition.png
```
Also one duplicate:
```
pageengineeringdesign/haykalengineeringdesign.pdf  (keep? already paired with haykalproblemidentification.pdf)
```
Note: `biilingofprocess.png` (in pageengineeringdesign/) is listed as 'B' (typo) in git but content is the same as `billofprocess.txt` — the PNG is still used by the page.

### Source documents (optional — prove design provenance, but bloated)
```
design specification.xlsx
```
Skip for a lean repo, keep for portfolio evidence.

### Utility script (not part of the website)
```
read_pdfs.py
```
Delete unless you want to showcase it.

### Notes
```
"Website Design suggestions.txt"
```
Personal notes — skip.

### Lockfile (standard practice debate)
```
package-lock.json
```
- **Keep**: reproducible builds (recommended for apps)
- **Skip**: if you want minimal diff noise

---

## Quick PowerShell — Run this from project root

```powershell
# === REMOVE SKIP items ===

# Separate unrelated project (546 MB!)
Remove-Item -Recurse -Force ".\next-monorepo"

# Build artifacts (regenerate anytime)
Remove-Item -Recurse -Force ".\node_modules"
Remove-Item -Recurse -Force ".\dist"

# IDE config
Remove-Item -Recurse -Force ".\.claude"
Remove-Item -Recurse -Force ".\.vscode"

# Duplicate root CSS
Remove-Item -Force ".\styles.css"

# Empty component dir
Remove-Item -Recurse -Force ".\src\components"

# Unused logo variants
Remove-Item -Force ".\logoandtexttransparent.png"
Remove-Item -Force ".\logobarugaisblacktransparent.png"
Remove-Item -Force ".\logobarugaishijau.png"
Remove-Item -Force ".\logobarugaiswhitetransparent.png"

# === REMOVE REVIEW items (uncomment to delete) ===

# Remove-Item -Force ".\read_pdfs.py"
# Remove-Item -Force ".\Website Design suggestions.txt"
# Remove-Item -Force ".\design specification.xlsx"
# Remove-Item -Force ".\package-lock.json"

# === STAGE IMAGE DELETIONS ===
git add -A

# === CREATE .gitignore ===
Set-Content -Path ".\.gitignore" -Value @"
node_modules/
dist/
.claude/
.vscode/
next-monorepo/
.DS_Store
Thumbs.db
*.log
.env
.env.local
"@

Write-Host "Cleanup done. Verify with: git status"
```

---

## After cleanup — repo tree (~40 files)

```
projectIbnAwwam/
├── .gitignore
├── README.md
├── package.json
├── vite.config.js
├── three-header.js
├── index.html
├── blacklogoandtext.png
├── src/
│   ├── css/
│   │   └── styles.css          ← All CSS (incl. Gantt chart)
│   └── js/
│       └── main.js              ← Nav, sidebar, scroll logic
├── pagehome/
│   ├── HOME.txt
│   ├── gambardepan.webp
│   └── haykalhome.png
├── pageourteam/
│   ├── index.html
│   ├── Our teams.txt
│   ├── Adam.jpeg
│   ├── Amir.jpeg
│   ├── Hariz.jpeg
│   ├── Haziq.jpeg
│   └── Irham.jpeg
├── pageproblemidentification/
│   ├── index.html
│   ├── PROBLEM IDENTIFICATION.txt
│   ├── Global Impact Alignment.txt
│   ├── Benchmarking.txt
│   ├── PROJECT GOAL.txt
│   ├── Research Validation.txt
│   ├── blindpeoplewalking.jpg
│   ├── blindpeoplewithcane.avif
│   └── blindwithbraille.JPEG
├── pageengineeringdesign/
│   ├── index.html
│   ├── billofprocess.txt
│   ├── biilingofprocess.png
│   ├── flowchart.png / flowchartnew.png
│   ├── circuitdiagram.png
│   ├── testcard1.png / testcard2.png
│   └── projecttimeline.png
└── pagedesignrequirement/
    ├── index.html
    ├── REQUIRED DESIGN FEATURES AND BASIC.txt
    ├── DESIGN SPECIFICATION.txt
    ├── circuitdiagram1.png
    ├── designsketch.png
    └── features and functionality.png
```

Run `npx vite` to verify the site still serves locally, then `git push`.
