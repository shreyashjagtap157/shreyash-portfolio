from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
O="public/Shreyash_Satish_Jagtap_Resume.pdf"
d=SimpleDocTemplate(O,pagesize=A4,leftMargin=15*mm,rightMargin=15*mm,topMargin=11*mm,bottomMargin=10*mm,title="Shreyash Satish Jagtap - Resume",author="Shreyash Satish Jagtap")
ink=colors.HexColor("#0d2a57")
N=ParagraphStyle("n",fontName="Helvetica-Bold",fontSize=21,leading=24,textColor=ink)
H=ParagraphStyle("h",fontName="Helvetica",fontSize=9.5,leading=12.5,textColor=colors.HexColor("#333333"))
S=ParagraphStyle("s",fontName="Helvetica-Bold",fontSize=10,leading=13,textColor=ink,spaceBefore=6,spaceAfter=1)
B=ParagraphStyle("b",fontName="Helvetica",fontSize=9,leading=12)
T=ParagraphStyle("t",parent=B,fontName="Helvetica-Bold")
L=ParagraphStyle("l",parent=B,leftIndent=10)
def sec(t): return [Paragraph(t.upper(),S),HRFlowable(width="100%",thickness=.6,color=ink,spaceAfter=2)]
def job(t,r): return Paragraph(f"{t}<font name='Helvetica'> | {r}</font>",T)
def bl(t): return Paragraph(t,L,bulletText="\u2022")
def pj(n,t,x): return bl(f"<b>{n}</b> ({t}): {x}")
s=[Paragraph("Shreyash Satish Jagtap",N),
Paragraph("Backend and AI Systems Developer",H),
Paragraph("Pune, Maharashtra, India | +91 80876 79022 | ssjagtap2016@gmail.com",H),
Paragraph("LinkedIn: linkedin.com/in/shreyash-jagtap-48a359356 | GitHub: github.com/shreyashjagtap157",H)]
s+=sec("Summary")+[Paragraph("Backend and full-stack developer building Django and Java services and AI-integrated systems. Independent work spans a Rust programming language (Omni), a local-first multi-agent platform (NexusAgent), an education platform (UEP) and systems and AI research projects. Targeting AI-integrated backend, agentic AI and developer-tools roles.",B)]
s+=sec("Experience")+[job("Java Full Stack Developer with Generative AI (Intern)","Puneri Pattern Pvt. Ltd., Pune | 17 Jun 2026 - Present"),
bl("Java full-stack development alongside Generative AI training and projects."),Spacer(1,3),
job("Django Backend Developer (Intern)","Chordz Technologies | Dec 2024 - Mar 2026"),
bl("Built and maintained REST APIs with Django REST Framework."),
bl("Delivered 70+ API endpoints across projects, including 30+ for the OldAgeHome application.")]
s+=sec("Selected projects")+[
pj("Omni","Rust","specification-governed programming language and toolchain, staged toward a self-hosted compiler; earlier edition also maintained."),
pj("NexusAgent","Python, Rust","local-first multi-agent platform with specialist teams, provider routing and MCP integration (alpha)."),
pj("UEP","Java, Spring Boot, React, PostgreSQL","multi-tenant education and training platform with OIDC identity, live classrooms, grading and integrations (in development)."),
pj("AetherOS","specification","capability-based operating system architecture: 41 normative RFCs and an executable reference model."),
pj("Mosaic-µ","C, Rust, Python","byte-exact universal tokenizer with Unicode support, language packs and a Python binding."),
pj("Dynamic Neural Computing","Python","formal specification and runtime for dynamic neural computation graphs."),
pj("tensor-ring-decomposition","PyTorch","tensor ring decomposition with ALS, SVD and quantization-aware training."),
pj("Kilo Code swarm extension","TypeScript","coordinator and worker agent roles with validation gates (in progress)."),
pj("Other","","ACTSConnect (alumni networking), OldAgeHome (Django REST), MilkyWay (Django), decentralized-iot-network, AI-OS prototype.")]
s+=sec("Skills")+[
Paragraph("<b>Languages:</b> Python, Java, Rust, TypeScript, JavaScript, C",B),
Paragraph("<b>Backend and web:</b> Django, Django REST Framework, Spring Boot, React, PostgreSQL, REST API design",B),
Paragraph("<b>AI:</b> LLM and MCP API integration, RAG (LangChain, LlamaIndex), PyTorch, YOLOv8, multi-agent orchestration",B),
Paragraph("<b>Tools:</b> Git, GitHub, Ansible, automated testing and CI",B)]
s+=sec("Education and certifications")+[job("B.E. Computer Science","Pune Institute of Computer Technology (PICT) | 2018 - 2022 | CGPA 8.73"),
Paragraph("Anthropic Academy: Claude 101; Building with the Claude API; Claude Code in Action; Introduction to MCP",B)]
d.build(s)
from pypdf import PdfReader
print(len(PdfReader(O).pages),"page(s)")
