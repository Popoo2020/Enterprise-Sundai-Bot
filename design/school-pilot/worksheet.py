#!/usr/bin/python3
"""Regenerate the four print-ready worksheets with ReportLab, fontTools[woff] and FriBidi."""
import base64
import ctypes
from ctypes.util import find_library
from io import BytesIO
from pathlib import Path
from itertools import groupby
from xml.etree import ElementTree

from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont as PdfFont
from reportlab.pdfgen.canvas import Canvas
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ASSETS = Path(__file__).resolve().parents[2] / "site" / "assets"
OUT = ASSETS / "brand-home"
WIDTH, HEIGHT = 595.28, 841.89
MARGIN = 42
CONTENT = WIDTH - 2 * MARGIN

COPY = {
    "en": {
        "sheet": "Teen Tech AI  /  Classroom worksheet",
        "title": "Would you share this clip?",
        "intro": "Work in pairs. Watch the clip once and mark your first reaction.",
        "first": "First reaction", "options": ["Share", "Hold back", "Unsure"],
        "sections": [
            ("Trace the claim", "What does the clip want you to believe?", "Who first published it, where and when? Note anything unknown."),
            ("Check another source", "Name a source independent of the original publisher. What does it say?", "Which part of the claim does that evidence support or challenge?"),
            ("Decide what to do", "Would you share the clip now? Explain using one detail you checked.", "What changed your mind, or what would you still need to know?"),
        ],
        "teacher": "For the teacher",
        "tip": "Choose a short clip and keep its original link. Let pairs record their first reaction before checking. Reuse the sheet with a different clip and compare their reasoning.",
    },
    "he": {
        "sheet": "דף פעילות לכיתה  /  Teen Tech AI",
        "title": "הייתם משתפים את הסרטון הזה?",
        "intro": "עבדו בזוגות. צפו בסרטון פעם אחת וסמנו את התגובה הראשונה שלכם.",
        "first": "תגובה ראשונה", "options": ["נשתף", "נחכה", "עדיין מתלבטים"],
        "sections": [
            ("מאתרים את הטענה", "במה הסרטון מבקש לשכנע אתכם?", "מי פרסם אותו לראשונה, היכן ומתי? ציינו גם מה לא הצלחתם לברר."),
            ("מצליבים עם מקור נוסף", "מצאו מקור שאינו תלוי במי שפרסם את הסרטון. מהו המקור ומה נאמר בו?", "באיזה חלק של הטענה המידע שמצאתם תומך, או איזה חלק הוא מעמיד בספק?"),
            ("מחליטים אם לשתף", "האם תשתפו את הסרטון עכשיו? נמקו בעזרת פרט אחד שבדקתם.", "מה שינה את דעתכם, או איזה מידע עדיין חסר לכם?"),
        ],
        "teacher": "לצוות ההוראה",
        "tip": "בחרו סרטון קצר ושמרו את הקישור המקורי. תנו לזוגות לסמן תגובה ראשונה לפני הבדיקה. חזרו על הפעילות עם סרטון אחר והשוו בין הנימוקים.",
    },
    "sv": {
        "sheet": "Teen Tech AI  /  Arbetsblad för klassen",
        "title": "Skulle ni dela klippet?",
        "intro": "Arbeta i par. Se klippet en gång och kryssa för er första reaktion.",
        "first": "Första reaktion", "options": ["Dela", "Avvakta", "Osäkra"],
        "sections": [
            ("Spåra påståendet", "Vad vill klippet få er att tro?", "Vem publicerade det först, var och när? Skriv också vad ni inte fick reda på."),
            ("Jämför med en annan källa", "Hitta en källa som är oberoende av utgivaren. Vilken källa är det och vad säger den?", "Vilken del av påståendet får stöd eller blir osäker med de nya uppgifterna?"),
            ("Bestäm hur ni vill göra", "Skulle ni dela klippet nu? Motivera med en detalj som ni har kontrollerat.", "Vad fick er att tänka om, eller vad behöver ni fortfarande veta?"),
        ],
        "teacher": "Till läraren",
        "tip": "Välj ett kort klipp och spara länken till originalet. Låt paren kryssa för sin första reaktion före källkontrollen. Prova igen med ett nytt klipp och jämför hur eleverna resonerar.",
    },
    "da": {
        "sheet": "Teen Tech AI  /  Arbejdsark til klassen",
        "title": "Ville I dele klippet?",
        "intro": "Arbejd sammen to og to. Se klippet én gang, og sæt kryds ved jeres første reaktion.",
        "first": "Første reaktion", "options": ["Dele", "Vente", "I tvivl"],
        "sections": [
            ("Find påstanden", "Hvad vil klippet have jer til at tro?", "Hvem udgav først klippet, hvor og hvornår? Skriv også, hvad I ikke kunne finde ud af."),
            ("Tjek en anden kilde", "Find en kilde, der er uafhængig af afsenderen. Hvilken kilde fandt I, og hvad siger den?", "Hvilken del af påstanden understøtter de nye oplysninger, og hvad sår de tvivl om?"),
            ("Tag stilling", "Ville I dele klippet nu? Begrund jeres valg med én detalje, I har tjekket.", "Hvad fik jer til at skifte mening, eller hvad mangler I stadig at vide?"),
        ],
        "teacher": "Til læreren",
        "tip": "Vælg et kort klip, og gem linket til originalen. Lad eleverne sætte kryds ved deres første reaktion, før de tjekker kilderne. Brug arket igen med et nyt klip, og sammenlign elevernes begrundelser.",
    },
}


def register_fonts():
    for name in ("outfit-latin", "rubik-hebrew"):
        font = TTFont(OUT / (name + ".woff2"), recalcTimestamp=False)
        for weight in (400, 600):
            static = instantiateVariableFont(font, {"wght": weight}, inplace=False)
            static.flavor = None
            static.recalcTimestamp = False
            buffer = BytesIO()
            static.save(buffer)
            buffer.seek(0)
            pdfmetrics.registerFont(PdfFont(f"{name}-{weight}", buffer))
    return TTFont(OUT / "rubik-hebrew.woff2").getBestCmap()


# FriBidi handles punctuation and mixed-script text in the visual PDF line.
fribidi = ctypes.CDLL(find_library("fribidi"))
chars = ctypes.POINTER(ctypes.c_uint32)
fribidi.fribidi_log2vis.argtypes = [chars, ctypes.c_int, chars, chars, ctypes.c_void_p, ctypes.c_void_p, ctypes.c_void_p]


def rtl_line(value):
    source = (ctypes.c_uint32 * len(value))(*map(ord, value))
    result = (ctypes.c_uint32 * len(value))()
    direction = ctypes.c_uint32(0x111)  # FRIBIDI_PAR_RTL
    if not fribidi.fribidi_log2vis(source, len(value), ctypes.byref(direction), result, None, None, None):
        raise RuntimeError("Cannot lay out a Hebrew line")
    return "".join(map(chr, result))


def create(locale, content, logo, hebrew_map):
    canvas = Canvas(str(OUT / f"SundAI_Class_Pilot_Worksheet_{locale.upper()}.pdf"), pagesize=(WIDTH, HEIGHT), invariant=True)
    canvas.setTitle(content["title"])
    canvas.setAuthor("SundAI")
    rtl = locale == "he"
    navy, blue, muted = "#101b38", "#3454b6", "#445064"

    def text(value, x, y, width, size, bold=False, colour=navy, align_right=None):
        right = rtl if align_right is None else align_right
        weight = 600 if bold else 400

        def runs(sentence):
            visual = rtl_line(sentence) if rtl else sentence
            return [(f"{family}-{weight}", "".join(group))
                    for family, group in groupby(visual, lambda char: "rubik-hebrew" if ord(char) in hebrew_map and rtl else "outfit-latin")]

        def line_width(sentence):
            return sum(pdfmetrics.stringWidth(part, font, size) for font, part in runs(sentence))

        lines = [""]
        for word in value.split():
            trial = (lines[-1] + " " + word).strip()
            if lines[-1] and line_width(trial) > width:
                lines.append(word)
            else:
                lines[-1] = trial
        for number, sentence in enumerate(lines):
            pen = canvas.beginText(x + width - line_width(sentence) if right else x, HEIGHT - y - size - number * 1.23 * size)
            pen.setFillColor(HexColor(colour))
            for face, part in runs(sentence):
                pen.setFont(face, size)
                pen.textOut(part)
            canvas.drawText(pen)
        return len(lines) * size * 1.23

    def shape(x, y, w, h, colour, fill=True):
        canvas.setFillColor(HexColor(colour))
        canvas.setStrokeColor(HexColor(colour))
        canvas.setLineWidth(.8)
        canvas.rect(x, HEIGHT - y - h, w, h, fill=int(fill), stroke=int(not fill))

    def line(y, colour="#aeb6c2"):
        canvas.setStrokeColor(HexColor(colour))
        canvas.setLineWidth(.65)
        canvas.line(MARGIN, HEIGHT - y, WIDTH - MARGIN, HEIGHT - y)

    # Use the original wordmark for light backgrounds and mirror the layout, never the mark.
    canvas.drawImage(logo, WIDTH - MARGIN - 84 if rtl else MARGIN, HEIGHT - 35 - 84 * 117 / 500,
                     width=84, height=84 * 117 / 500, mask="auto")
    text(content["sheet"], MARGIN if rtl else MARGIN + 100, 36, CONTENT - 100, 11, True, muted, not rtl)
    line(70, "#7280a0")
    text(content["title"], MARGIN, 82, CONTENT, 32, True)
    text(content["intro"], MARGIN, 132, CONTENT, 12)
    text(content["first"], WIDTH - MARGIN - 110 if rtl else MARGIN, 165, 110, 11.5, True)
    for i, option in enumerate(content["options"]):
        edge = MARGIN + 117 + i * 107
        bx = WIDTH - edge - 11 if rtl else edge
        shape(bx, 168, 10, 10, muted, fill=False)
        text(option, bx - 92 if rtl else bx + 15, 165, 87, 11.5)

    # Give each question two ruled lines; sufficient for a short claim, source or explanation.
    for i, (heading, first, second) in enumerate(content["sections"]):
        y = 199 + i * 171
        square_x = WIDTH - MARGIN - 20 if rtl else MARGIN
        shape(square_x, y + 2, 20, 20, blue)
        text(str(i + 1), square_x + 5, y + 2, 10, 13, True, "#ffffff", False)
        text(heading, MARGIN if rtl else MARGIN + 29, y - 1, CONTENT - 29, 17, True)
        for j, prompt in enumerate((first, second)):
            py = y + 33 + j * 64
            height = text(prompt, MARGIN, py, CONTENT, 11.6)
            if height > 29:
                raise RuntimeError(f"Prompt does not fit in {locale}: {prompt}")
            line(py + 38)
            line(py + 54)

    shape(MARGIN, 720, CONTENT, 70, "#f0f3f8")
    tx = MARGIN + 13
    text(content["teacher"], tx, 727, CONTENT - 26, 11, True, blue)
    if text(content["tip"], tx, 745, CONTENT - 26, 10.8) > 40:
        raise RuntimeError("Teacher note exceeds space")
    text("sundaibot.com", MARGIN, 801, CONTENT, 9.5, True, muted)
    canvas.showPage()
    canvas.save()


if __name__ == "__main__":
    image = ElementTree.parse(ASSETS / "sundai-wordmark-light.svg").find("{http://www.w3.org/2000/svg}image")
    logo = ImageReader(BytesIO(base64.b64decode(image.attrib["href"].split(",", 1)[1])))
    hebrew_map = register_fonts()
    for locale, content in COPY.items():
        create(locale, content, logo, hebrew_map)
