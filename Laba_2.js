import docx
import bitstring
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt
from MTK2 import *

def get_or_add_spacing(rPr):
    spacings = rPr.xpath("./w:spacing")
    if spacings:
        return spacings[0]
    spacing = OxmlElement("w:spacing")
    rPr.insert_element_before(
        spacing,
        *(
            "w:w",
            "w:kern",
            "w:position",
            "w:sz",
            "w:szCs",
            "w:highlight",
            "w:u",
            "w:effect",
            "w:bdr",
            "w:shd",
            "w:fitText",
            "w:vertAlign",
            "w:rtl",
            "w:cs",
            "w:em",
            "w:lang",
            "w:eastAsianLayout",
            "w:specVanish",
            "w:oMath",
        ),
    )
    return spacing

def run_set_spacing(run, value: int):
    rPr = run._r.get_or_add_rPr()
    spacing = get_or_add_spacing(rPr)
    spacing.set(qn('w:val'), str(value))

doc2 = docx.Document()
style = doc2.styles['Normal']
style.font.name = 'Times New Roman'
style.font.size = Pt(14)
doc1 = docx.Document('variant04.docx')

for i in doc1.paragraphs:
    doc2.add_paragraph()

for p in range(len(doc1.paragraphs)):
    for t in doc1.paragraphs[p].text:
        doc2.paragraphs[p].add_run(t)

print("Введите цитату для сокрытия:")
str_code = str(input())
str_byte = format(MTK2_code(str_code))
index = 0

for paragraph in doc2.paragraphs:
    for run in paragraph.runs:
        if str_byte[index] == '1':
            run_set_spacing(run, 2)
        if index < len(str_byte)-1:
            index += 1

path = "file_secret.docx"
doc2.save(path)
print()
print(str_code, "---> MTK2 encode:")
print(str_byte)
decode = format(MTK2_decode(str_byte))
print("Докедоривание:", decode)
print("\nСодержимое файла:")
print("-" * 100)

for paragraph in doc2.paragraphs:
    print(paragraph.text)

print("-" * 100)
print("\nФайл", path, "сохранен")
