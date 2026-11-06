from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet
import re

def markdown_to_reportlab(md_text):
    # تحويل بسيط لـ Markdown إلى تنسيق paragraph
    lines = md_text.split('\n')
    story = []
    styles = getSampleStyleSheet()

    for line in lines:
        line = line.strip()
        if not line:
            story.append(Spacer(1, 12))
            continue
        if line.startswith('# '):
            story.append(Paragraph(line[2:], styles['Title']))
        elif line.startswith('## '):
            story.append(Paragraph(line[3:], styles['Heading1']))
        elif line.startswith('### '):
            story.append(Paragraph(line[4:], styles['Heading2']))
        elif line.startswith('* '):
            story.append(Paragraph('• ' + line[2:], styles['Normal']))
        else:
            story.append(Paragraph(line, styles['Normal']))
    return story

doc = SimpleDocTemplate("NodeJS_Backend_Book.pdf", pagesize=letter)
with open("full_book.md", "r", encoding="utf-8") as f:
    text = f.read()

story = markdown_to_reportlab(text)
doc.build(story)
print("PDF generated successfully.")
