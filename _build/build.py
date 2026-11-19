import os, sys
sys.path.insert(0, os.path.dirname(__file__))
import pages_main as m
import pages_more as p
import pages_forms as f

OUT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = {
    "index.html": m.home,
    "about.html": m.about,
    "shop.html": m.shop,
    "archive.html": p.archive,
    "contact.html": p.contact,
    "donate.html": p.donate,
    "request.html": p.request,
    "request_form.html": f.request_form,
    "request_form_lv1.html": f.lv1,
    "request_form_lv2.html": f.lv2,
    "request_form_lv3.html": f.lv3,
    "request_form_collection.html": f.collection,
}
for name, fn in PAGES.items():
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as fh:
        fh.write(fn())
    print("wrote", name)
