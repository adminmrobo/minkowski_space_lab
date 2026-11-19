# 화면 점검: python3 code/shot.py 파일 [폭...]  — 콘솔 오류, 가로 넘침, 빈 캐릭터 그림을 확인하고 스크린샷을 남긴다
import sys, asyncio, pathlib
from playwright.async_api import async_playwright
async def main(f, widths):
    out=pathlib.Path('/tmp/shots'); out.mkdir(exist_ok=True)
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        for w in widths:
            pg=await b.new_page(viewport={'width':w,'height':900})
            errs=[]; pg.on('console', lambda m: errs.append(m.text) if m.type=='error' else None); pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.route('**/fonts.g*/**', lambda r: r.abort())
            await pg.goto('file://'+str(pathlib.Path(f).resolve())); await pg.wait_for_timeout(1200)
            ov=await pg.evaluate('''()=>{const W=document.documentElement.clientWidth;const bad=[];document.querySelectorAll('body *').forEach(e=>{const r=e.getBoundingClientRect();if(r.right>W+1&&r.width>0&&getComputedStyle(e).position!=='fixed'&&!e.closest('.tblwrap,.eq,pre,.links,.glog,details'))bad.push(e.tagName+'.'+e.className+' '+Math.round(r.right));});return [document.documentElement.scrollWidth>W, bad.slice(0,8)]}''')
            empty=await pg.evaluate('''()=>[...document.querySelectorAll('img')].filter(i=>!i.getAttribute('src')&&!i.closest('.cover')).map(i=>i.dataset.mood||i.className).slice(0,10)''')
            print(f, w, 'errors:', [e for e in errs if 'fonts' not in e][:5], 'overflow:', ov, 'empty imgs:', empty)
            await pg.screenshot(path=str(out/f"{pathlib.Path(f).stem}_{w}.png"), full_page=True)
            await pg.close()
        await b.close()
asyncio.run(main(sys.argv[1], [int(x) for x in sys.argv[2:]] or [390,1280]))
