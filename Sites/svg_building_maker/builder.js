const { random, round, tanh } = Math
const randomInt = (min, max) => {
    return 10 * (min + round(random() * (max - min)));
}
const SVG_NS = 'http://www.w3.org/2000/svg';
const svg_container = document.getElementById("svg-container")
const form = document.getElementById("form")

const contrast = (val, n = 1) => {
    return (tanh(n * (2 * val - 1)) + 1.33) / 2
}

function createBuilding() {



    const w = randomInt(10, 20);
    const h = randomInt(10, 50);

    const wall_color = document.querySelector("input[name=wall-color]").value
    const window_color = document.querySelector("input[name=window-color]").value
    const balcony_color = document.querySelector("input[name=balcony-color]").value

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('width', w + 20);
    svg.setAttribute('height', h);
    svg.setAttribute('viewBox', `0 0 ${w + 20} ${h}`);

    const defs = document.createElementNS(SVG_NS, 'defs');
    defs.innerHTML = `
<filter id="filter" color-interpolation-filters="linearRGB" filterUnits="objectBoundingBox"
    primitiveUnits="userSpaceOnUse">
    <feTurbulence type="turbulence" baseFrequency="0.15 0.05" numOctaves="2" seed="${10*round(random())}" stitchTiles="stitch"
        x="0%" y="0%" width="100%" height="100%" result="turbulence" />
    <feComponentTransfer x="0%" y="0%" width="100%" height="100%" in="composite" result="componentTransfer">
        <feFuncR type="identity" />
        <feFuncG type="identity" />
        <feFuncB type="identity" />
        <feFuncA type="linear" slope="2.9" intercept="-0.3" />
    </feComponentTransfer>
    <feComposite in="SourceGraphic" in2="componentTransfer" operator="in" x="0%" y="0%" width="100%"
        height="100%" result="composite" />
</filter>
`;

    svg.appendChild(defs);

    const BUILDING = document.createElementNS(SVG_NS, 'g');

    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('id', 'wall')

    rect.setAttribute('width', w);
    rect.setAttribute('height', h);
    rect.setAttribute('x', 10);
    rect.setAttribute('y', 0);
    rect.setAttribute('fill', wall_color);
    rect.setAttribute('rx', '5');

    const windows = document.createElementNS(SVG_NS, 'g');
    windows.setAttribute('id', 'windows')
    windows.setAttribute('stroke', window_color);
    windows.setAttribute('stroke-width', 5);
    windows.setAttribute('filter', "url(#filter)")
    const windowType = round(random())

    if (windowType) {
        windows.setAttribute('stroke-linecap', 'round');
    }

    for (let i = 10; i < h; i += 10) {
        const line = document.createElementNS(SVG_NS, 'line');
        line.setAttribute('x1', 20)
        line.setAttribute('x2', w)
        line.setAttribute('y1', i)
        line.setAttribute('y2', i)
        if (windowType) {
            line.setAttribute('stroke-dasharray', round(10 + random() * (w - 10)));
            line.setAttribute('stroke-dashoffset', round(random() * w));
        }
        else {
            let dasharray = ""
            for (let j = 0; j < 1 + 4 * random(); j++) {
                dasharray += `5 ${5 + 10 * round(3 * contrast(i * random() / h, 5))} `;
            }
            console.log(dasharray)
            line.setAttribute('stroke-dasharray', dasharray);
            line.setAttribute('stroke-dashoffset', 10 * round(random() * 10));
        }
        windows.appendChild(line)
    }
    const balconies = document.createElementNS(SVG_NS, 'g');
    balconies.setAttribute('id', 'balconies')
    balconies.setAttribute('stroke', balcony_color);
    balconies.setAttribute('stroke-width', 5);
    const overhang = 8 + round(random() * 2)
    if (overhang < 10) {
        for (let i = 5; i <= h; i += 10) {
            const line = document.createElementNS(SVG_NS, 'line');
            line.setAttribute('x1', overhang)
            line.setAttribute('x2', w + 20 - overhang)
            line.setAttribute('y1', i)
            line.setAttribute('y2', i)
            // line.setAttribute('stroke-linecap', 'round');
            balconies.appendChild(line)
        }
    }

    BUILDING.appendChild(rect);
    BUILDING.appendChild(windows)
    if (overhang < 10) {
        BUILDING.appendChild(balconies)
    }
    svg.appendChild(BUILDING)
    svg_container.appendChild(svg);
}
form.addEventListener('submit', function (e) {
    e.preventDefault();
    svg_container.innerHTML = ""
    createBuilding()
    document.querySelector('.button-container').style.display = "flex"
})

function downloadSVG(svgElement, filename = 'image.svg') {
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);

    // Add XML declaration so editors know it's SVG
    const svgBlob = new Blob(
        ['<?xml version="1.0" standalone="no"?>\n', source],
        { type: 'image/svg+xml;charset=utf-8' }
    );

    const url = URL.createObjectURL(svgBlob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}

function downloadSVGAsPNG(svgElement, filename = 'building.png') {
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);

    const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = svgElement.width.baseVal.value * 10;
        canvas.height = svgElement.height.baseVal.value * 10;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);

        canvas.toBlob((blob) => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }, 'image/png');
    };
    img.src = url;
}

function copySVG(svgElement) {
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);
    navigator.clipboard.writeText(source)
        .then(() => console.log('SVG copied!'))
        .catch(err => console.error('Copy failed', err));
}

async function copySVGFile(svgElement) {
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);

    const blob = new Blob(
        ['<?xml version="1.0" standalone="no"?>\n', source],
        { type: 'image/svg+xml' }
    );

    const clipboardItem = new ClipboardItem({ 'image/svg+xml': blob });
    await navigator.clipboard.write([clipboardItem]);
    console.log('SVG file copied to clipboard!');
}

async function supportsClipboardSVG() {
    if (typeof ClipboardItem === 'undefined' ||
        !navigator.clipboard ||
        typeof navigator.clipboard.write !== 'function') {
        document.getElementById("copy").style.display = 'none'
        return false; // No ClipboardItem or write support at all
    }

    try {
        // Try a tiny write test
        const testBlob = new Blob(['<svg></svg>'], { type: 'image/svg+xml' });
        const testItem = new ClipboardItem({ 'image/svg+xml': testBlob });
        await navigator.clipboard.write([testItem]);
        return true;
    } catch (err) {
        if (err instanceof DOMException) {
            console.warn('Clipboard API exists but SVG MIME type is unsupported:', err.message);
        } else {
            console.error('Clipboard test failed:', err);
        }
        document.getElementById("copy").style.display = 'none'
        return false;
    }
}
window.onload=()=>{
    supportsClipboardSVG()
}

function successMessage(e){
    e.target.classList.add('success');
    setTimeout(()=>{
        e.target.classList.remove('success');
    }, 1500)
}

// Usage:
document.getElementById("svg_download").addEventListener("click", (e) => {
    downloadSVG(document.querySelector('#svg-container svg'), 'building.svg');
    successMessage(e)
})

document.getElementById("png_download").addEventListener("click", (e) => {
    downloadSVGAsPNG(document.querySelector('#svg-container svg'));
    successMessage(e)
})

document.getElementById("copy").addEventListener("click", (e) => {
    copySVGFile(document.querySelector('#svg-container svg'));
    successMessage(e)
})

document.getElementById("copy-code").addEventListener("click", (e) => {
    copySVG(document.querySelector('#svg-container svg'));
    successMessage(e)
})