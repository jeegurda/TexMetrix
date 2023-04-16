Live: https://jeegurda.github.io/TexMetrix/

---

Measures font size as it's rendered in current browser using TextMetrics interface inside a canvas.

The size on the left of each line is `(W px/F px)` where `W` is the exact width of the inline element with the specifed text and `F` is its height. Note that changing line height does not affect inline element height. Also note that specified width is not the same as font actual bounding box width.

---

### Build

```bash
$ npm i
$ npm run build
$ npx serve build/  # 'serve' not included, just as an example
```

### Serve'n'dev

```bash
$ npm i
$ npm run serve  # runs at http://localhost:8000
```
