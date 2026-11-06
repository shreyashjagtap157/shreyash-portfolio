from PIL import Image, ImageDraw, ImageFont
import math
W=1024; im=Image.new("RGB",(W,W),"#070b10"); d=ImageDraw.Draw(im)
for x in range(0,W,64): d.line([(x,0),(x,W)],fill="#0f1a24",width=2); d.line([(0,x),(W,x)],fill="#0f1a24",width=2)
def hexa(r,c=(512,512)): return [(c[0]+r*math.cos(math.radians(60*i-90)),c[1]+r*math.sin(math.radians(60*i-90))) for i in range(6)]
d.polygon(hexa(400),outline="#22d3ee",width=26)
d.polygon(hexa(300),fill="#0b121a",outline="#8b7cff",width=8)
f=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf",230)
d.text((512,520),"SJ",font=f,fill="#22d3ee",anchor="mm")
im.save("public/logo-profile.png")
open("public/logo.svg","w").write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#070b10"/><path d="M32 7l21.700 12.500v25L32 57 10.300 44.500v-25z" fill="none" stroke="#22d3ee" stroke-width="2.500"/><path d="M32 14l15.600 9v18L32 50 16.400 41V23z" fill="#0b121a" stroke="#8b7cff" stroke-width="1"/><text x="32" y="38" font-size="15" font-family="DejaVu Sans Mono,monospace" font-weight="700" text-anchor="middle" fill="#22d3ee">SJ</text></svg>')
