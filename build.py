import pathlib, json
from PIL import Image, ImageDraw, ImageFont
root = pathlib.Path(__file__).parent
src, dist = root/'src', root
order = ['core.js','widgets_math.js','widgets_math2.js','widgets_pc.js','widgets_pc2.js','content_helpers.js','chapters.js','content_math.js','content_math2.js','content_pc.js','content_pc2.js']
css = (src/'styles.css').read_text()
scripts = '\n'.join(f'<script>\n{(src/f).read_text()}\n</script>' for f in order)
html = f'''<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Déclic 2de</title>
<meta name="description" content="Maths et physique-chimie de seconde, en images.">
<meta name="theme-color" content="#e4572e">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Déclic 2de">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="apple-touch-icon" href="icon-180.png">
<link rel="icon" type="image/png" href="icon-192.png">
<link rel="manifest" href="manifest.webmanifest">
<style>
{css}
</style>
</head>
<body>
<div id="app"></div>
{scripts}
</body>
</html>'''
(dist/'index.html').write_text(html)
(dist/'manifest.webmanifest').write_text(json.dumps({"name":"Déclic 2de","short_name":"Déclic 2de","start_url":"./","display":"standalone","background_color":"#f6f4ef","theme_color":"#e4572e","lang":"fr","icons":[{"src":"icon-192.png","sizes":"192x192","type":"image/png"},{"src":"icon-512.png","sizes":"512x512","type":"image/png"}]},ensure_ascii=False,indent=1))
def icon(n):
    im = Image.new('RGB',(n,n),'#e4572e'); d = ImageDraw.Draw(im)
    r = n*0.22
    d.ellipse([n*0.5-r, n*0.36-r, n*0.5+r, n*0.36+r], fill='#ffffff')
    d.rectangle([n*0.43, n*0.56, n*0.57, n*0.66], fill='#ffffff')
    d.rectangle([n*0.45, n*0.68, n*0.55, n*0.72], fill='#ffffff')
    try:
        f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', int(n*0.16))
    except Exception:
        f = ImageFont.load_default()
    d.text((n*0.5, n*0.86), '2de', fill='#ffffff', font=f, anchor='mm')
    im.save(dist/f'icon-{n}.png')
for n in (180,192,512): icon(n)
print('ok', len(html)//1024, 'KB')
