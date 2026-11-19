# patina page generator

HTML pages in the repo root are generated from these Python files so the
masthead, Contents menu and footer stay identical on every page.

    python3 _build/build.py

- `common.py`      shared head / masthead / contents / footer
- `pages_main.py`  index, about, shop
- `pages_more.py`  archive, contact, donate, request
- `pages_forms.py` request_form, lv1, lv2, lv3, collection

Edit the text here and re-run the script; editing the root HTML directly
works too, but those edits are overwritten on the next build.
GitHub Pages ignores folders starting with `_`, so this folder is not published.
