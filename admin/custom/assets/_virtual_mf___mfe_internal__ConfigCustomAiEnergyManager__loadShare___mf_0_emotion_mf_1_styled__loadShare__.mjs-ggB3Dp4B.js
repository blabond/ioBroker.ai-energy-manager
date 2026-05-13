import { r as e } from "./rolldown-runtime-BYbx6iT9.js";
import {
  D as t,
  S as n,
  V as r,
  _ as i,
  a,
  d as o,
  f as s,
  h as c,
  i as l,
  k as u,
  l as d,
  p as f,
  u as p,
} from "./_virtual_mf___mfe_internal__ConfigCustomAiEnergyManager__loadShare___mf_0_emotion_mf_1_react__loadShare__.mjs-Z9kjHTfK.js";
r();
var m =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  h = c(function (e) {
    return (
      m.test(e) ||
      (e.charCodeAt(0) === 111 &&
        e.charCodeAt(1) === 110 &&
        e.charCodeAt(2) < 91)
    );
  }),
  g = !1,
  _ = h,
  v = function (e) {
    return e !== `theme`;
  },
  y = function (e) {
    return typeof e == `string` && e.charCodeAt(0) > 96 ? _ : v;
  },
  b = function (e, t, n) {
    var r;
    if (t) {
      var i = t.shouldForwardProp;
      r =
        e.__emotion_forwardProp && i
          ? function (t) {
              return e.__emotion_forwardProp(t) && i(t);
            }
          : i;
    }
    return (typeof r != `function` && n && (r = e.__emotion_forwardProp), r);
  },
  x = function (e) {
    var t = e.cache,
      n = e.serialized,
      r = e.isStringTag;
    return (
      f(t, n, r),
      d(function () {
        return s(t, n, r);
      }),
      null
    );
  },
  S = function e(r, s) {
    var c = r.__emotion_real === r,
      d = (c && r.__emotion_base) || r,
      f,
      m;
    s !== void 0 && ((f = s.label), (m = s.target));
    var h = b(r, s, c),
      _ = h || y(d),
      v = !_(`as`);
    return function () {
      var S = arguments,
        C =
          c && r.__emotion_styles !== void 0 ? r.__emotion_styles.slice(0) : [];
      if (
        (f !== void 0 && C.push(`label:` + f + `;`),
        S[0] == null || S[0].raw === void 0)
      )
        C.push.apply(C, S);
      else {
        var w = S[0];
        C.push(w[0]);
        for (var T = S.length, E = 1; E < T; E++) C.push(S[E], w[E]);
      }
      var D = a(function (e, r, i) {
        var a = (v && e.as) || d,
          s = ``,
          c = [],
          f = e;
        if (e.theme == null) {
          for (var g in ((f = {}), e)) f[g] = e[g];
          f.theme = u(l);
        }
        typeof e.className == `string`
          ? (s = o(r.registered, c, e.className))
          : e.className != null && (s = e.className + ` `);
        var b = p(C.concat(c), r.registered, f);
        ((s += r.key + `-` + b.name), m !== void 0 && (s += ` ` + m));
        var S = v && h === void 0 ? y(a) : _,
          w = {};
        for (var T in e) (v && T === `as`) || (S(T) && (w[T] = e[T]));
        return (
          (w.className = s),
          i && (w.ref = i),
          n(
            t,
            null,
            n(x, {
              cache: r,
              serialized: b,
              isStringTag: typeof a == `string`,
            }),
            n(a, w),
          )
        );
      });
      return (
        (D.displayName =
          f === void 0
            ? `Styled(` +
              (typeof d == `string`
                ? d
                : d.displayName || d.name || `Component`) +
              `)`
            : f),
        (D.defaultProps = r.defaultProps),
        (D.__emotion_real = D),
        (D.__emotion_base = d),
        (D.__emotion_styles = C),
        (D.__emotion_forwardProp = h),
        Object.defineProperty(D, `toString`, {
          value: function () {
            return m === void 0 && g ? `NO_COMPONENT_SELECTOR` : `.` + m;
          },
        }),
        (D.withComponent = function (t, n) {
          return e(t, i({}, s, n, { shouldForwardProp: b(D, n, !0) })).apply(
            void 0,
            C,
          );
        }),
        D
      );
    };
  },
  C = e({ default: () => T });
r();
var w =
    `a.abbr.address.area.article.aside.audio.b.base.bdi.bdo.big.blockquote.body.br.button.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.keygen.label.legend.li.link.main.map.mark.marquee.menu.menuitem.meta.meter.nav.noscript.object.ol.optgroup.option.output.p.param.picture.pre.progress.q.rp.rt.ruby.s.samp.script.section.select.small.source.span.strong.style.sub.summary.sup.table.tbody.td.textarea.tfoot.th.thead.time.title.tr.track.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.foreignObject.g.image.line.linearGradient.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.text.tspan`.split(
      `.`,
    ),
  T = S.bind(null);
w.forEach(function (e) {
  T[e] = T(e);
});
var E = e({ default: () => D }),
  D = T ?? C,
  O = e({ __moduleExports: () => N, default: () => P }),
  k = `__mf_module_cache__`;
((globalThis[k] ||= { share: {}, remote: {} }),
  (globalThis[k].share ||= {}),
  (globalThis[k].remote ||= {}));
var A = globalThis[k],
  j = (e) => {
    let t = e;
    for (let e = 0; e < 5; e++) {
      let e = t == null ? void 0 : t.default;
      if (!e || typeof e != `object`) break;
      let n = Object.keys(t)
        .filter((e) => e !== `default`)
        .map((e) => t[e]);
      if (n.length > 0 && n.some((e) => e !== void 0)) break;
      t = e;
    }
    return t;
  },
  M = A.share[`@emotion/styled`];
M === void 0 && ((M = j(E)), (A.share[`@emotion/styled`] = M));
var N = M,
  P = M.__esModule ? M.default : (M.default ?? M);
export { O as n, E as r, P as t };
