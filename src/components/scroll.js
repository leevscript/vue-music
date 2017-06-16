!function () {
  function o(o) {
    return "" === i ? o : (o = o.charAt(0).toUpperCase() + o.substr(1), i + o)
  }

  var t = Math, e = function (o) {
      return o >> 0
    }, n = document,
    i = /webkit/i.test(navigator.appVersion) ? "webkit" : /firefox/i.test(navigator.userAgent) ? "Moz" : "opera" in window ? "O" : "",
    r = n.createElement("div").style,
    s = (/android/gi.test(navigator.appVersion), /iphone|ipad/gi.test(navigator.appVersion), /playbook/gi.test(navigator.appVersion), /hp-tablet/gi.test(navigator.appVersion)),
    l = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix, a = "ontouchstart" in window && !s,
    c = i + "Transform" in document.documentElement.style, p = o("transition") in r, u = function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (o) {
          return setTimeout(o, 17)
        }
    }(), m = function () {
      return window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
    }(), d = "onorientationchange" in window ? "orientationchange" : "resize", f = a ? "touchstart" : "mousedown",
    h = a ? "touchmove" : "mousemove", b = a ? "touchend" : "mouseup", w = a ? "touchcancel" : "mouseup",
    S = "translate" + (l ? "3d(" : "("), x = l ? ",0)" : ")", v = function (o, t) {
      var e, r = this;
      r.wrapper = "object" == typeof o ? o : n.getElementById(o), r.wrapper.style.overflow = "hidden", r.scroller = r.wrapper.children[0], r.options = {
        hScroll: !0,
        vScroll: !0,
        x: 0,
        y: 0,
        bounce: !0,
        bounceLock: !1,
        momentum: !0,
        lockDirection: !0,
        useTransform: !0,
        useTransition: !0,
        onRefresh: null,
        onBeforeScrollStart: function (o) {
          o.preventDefault()
        },
        onScrollStart: null,
        onBeforeScrollMove: null,
        onScrollMove: null,
        onBeforeScrollEnd: null,
        onScrollEnd: null,
        onTouchEnd: null,
        onDestroy: null
      };
      for (e in t)r.options[e] = t[e];
      r.x = r.options.x, r.y = r.options.y, r.options.useTransform = c ? r.options.useTransform : !1, r.options.hScrollbar = r.options.hScroll && r.options.hScrollbar, r.options.vScrollbar = r.options.vScroll && r.options.vScrollbar, r.options.useTransition = p && r.options.useTransition, r.scroller.style[i + "TransitionProperty"] = r.options.useTransform ? "-" + i.toLowerCase() + "-transform" : "top left", r.scroller.style[i + "TransitionDuration"] = "0", r.scroller.style[i + "TransformOrigin"] = "0 0", r.options.useTransition && (r.scroller.style[i + "TransitionTimingFunction"] = "cubic-bezier(0.33,0.66,0.66,1)"), r.options.useTransform ? r.scroller.style[i + "Transform"] = S + r.x + "px," + r.y + "px" + x : r.scroller.style.cssText += ";position:absolute;top:" + r.y + "px;left:" + r.x + "px", r.refresh(), r._bind(d, window), r._bind(f), a || r._bind("mouseout", r.wrapper)
    };
  r = null, v.prototype = {
    enabled: !0, x: 0, y: 0, steps: [], scale: 1, handleEvent: function (o) {
      var t = this;
      switch (o.type) {
        case f:
          if (!a && 0 !== o.button)return;
          t._start(o);
          break;
        case h:
          t._move(o);
          break;
        case b:
        case w:
          t._end(o);
          break;
        case d:
          t._resize();
          break;
        case"mouseout":
          t._mouseout(o);
          break;
        case"webkitTransitionEnd":
          t._transitionEnd(o)
      }
    }, _resize: function () {
      this.refresh()
    }, _pos: function (o, t) {
      o = this.hScroll ? o : 0, t = this.vScroll ? t : 0, this.options.useTransform ? this.scroller.style[i + "Transform"] = S + o + "px," + t + "px" + x + " scale(" + this.scale + ")" : (o = e(o), t = e(t), this.scroller.style.left = o + "px", this.scroller.style.top = t + "px"), this.x = o, this.y = t
    }, _start: function (o) {
      var t, e, n, r = this, s = a ? o.touches[0] : o;
      r.enabled && (r.options.onBeforeScrollStart && r.options.onBeforeScrollStart.call(r, o), r.options.useTransition && r._transitionTime(0), r.moved = !1, r.animating = !1, r.zoomed = !1, r.distX = 0, r.distY = 0, r.absDistX = 0, r.absDistY = 0, r.dirX = 0, r.dirY = 0, r.options.momentum && (r.options.useTransform ? (t = getComputedStyle(r.scroller, null)[i + "Transform"].replace(/[^0-9-.,]/g, "").split(","), e = 1 * t[4], n = 1 * t[5]) : (e = 1 * getComputedStyle(r.scroller, null).left.replace(/[^0-9-]/g, ""), n = 1 * getComputedStyle(r.scroller, null).top.replace(/[^0-9-]/g, "")), (e != r.x || n != r.y) && (r.options.useTransition ? r._unbind("webkitTransitionEnd") : m(r.aniTime), r.steps = [], r._pos(e, n))), r.startX = r.x, r.startY = r.y, r.pointX = s.pageX, r.pointY = s.pageY, r.startTime = o.timeStamp || Date.now(), r.options.onScrollStart && r.options.onScrollStart.call(r, o), r._bind(h), r._bind(b), r._bind(w))
    }, _move: function (o) {
      if (M.slide_h)return !1;
      var e = this, n = a ? o.touches[0] : o, i = n.pageX - e.pointX, r = n.pageY - e.pointY, s = e.x + i, l = e.y + r,
        c = o.timeStamp || Date.now();
      e.options.onBeforeScrollMove && e.options.onBeforeScrollMove.call(e, o), e.pointX = n.pageX, e.pointY = n.pageY, (s > 0 || s < e.maxScrollX) && (s = e.options.bounce ? e.x + i / 2 : s >= 0 || e.maxScrollX >= 0 ? 0 : e.maxScrollX), (l > 0 || l < e.maxScrollY) && (l = e.options.bounce ? e.y + r / 2 : l >= 0 || e.maxScrollY >= 0 ? 0 : e.maxScrollY), e.distX += i, e.distY += r, e.absDistX = t.abs(e.distX), e.absDistY = t.abs(e.distY), e.absDistX < 6 && e.absDistY < 6 || (e.options.lockDirection && (e.absDistX > e.absDistY + 5 ? (l = e.y, r = 0) : e.absDistY > e.absDistX + 5 && (s = e.x, i = 0)), e.moved = !0, e._pos(s, l), e.dirX = i > 0 ? -1 : 0 > i ? 1 : 0, e.dirY = r > 0 ? -1 : 0 > r ? 1 : 0, c - e.startTime > 300 && (e.startTime = c, e.startX = e.x, e.startY = e.y), e.options.onScrollMove && e.options.onScrollMove.call(e, o))
    }, _end: function (o) {
      if (!a || 0 == o.touches.length) {
        var n, i, r, s = this, l = a ? o.changedTouches[0] : o, c = {dist: 0, time: 0}, p = {dist: 0, time: 0},
          u = (o.timeStamp || Date.now()) - s.startTime, m = s.x, d = s.y;
        if (s._unbind(h), s._unbind(b), s._unbind(w), s.options.onBeforeScrollEnd && s.options.onBeforeScrollEnd.call(s, o), !s.moved) {
          if (a) {
            for (n = l.target; 1 != n.nodeType;)n = n.parentNode;
            "SELECT" != n.tagName && "INPUT" != n.tagName && "TEXTAREA" != n.tagName && (i = document.createEvent("MouseEvents"), i.initMouseEvent("click", !0, !0, o.view, 1, l.screenX, l.screenY, l.clientX, l.clientY, o.ctrlKey, o.altKey, o.shiftKey, o.metaKey, 0, null), i._fake = !0, n.dispatchEvent(i))
          }
          return s._resetPos(200), s.options.onTouchEnd && s.options.onTouchEnd.call(s, o), void 0
        }
        if (300 > u && s.options.momentum && (c = m ? s._momentum(m - s.startX, u, -s.x, s.scrollerW - s.wrapperW + s.x, s.options.bounce ? s.wrapperW : 0) : c, p = d ? s._momentum(d - s.startY, u, -s.y, s.maxScrollY < 0 ? s.scrollerH - s.wrapperH + s.y : 0, s.options.bounce ? s.wrapperH : 0) : p, m = s.x + c.dist, d = s.y + p.dist, (s.x > 0 && m > 0 || s.x < s.maxScrollX && m < s.maxScrollX) && (c = {
            dist: 0,
            time: 0
          }), (s.y > 0 && d > 0 || s.y < s.maxScrollY && d < s.maxScrollY) && (p = {
            dist: 0,
            time: 0
          })), c.dist || p.dist)return r = t.max(t.max(c.time, p.time), 10), s.scrollTo(e(m), e(d), r), s.options.onTouchEnd && s.options.onTouchEnd.call(s, o), void 0;
        s._resetPos(200), s.options.onTouchEnd && s.options.onTouchEnd.call(s, o)
      }
    }, _resetPos: function (o) {
      var t = this, e = t.x >= 0 ? 0 : t.x < t.maxScrollX ? t.maxScrollX : t.x,
        n = t.y >= 0 || t.maxScrollY > 0 ? 0 : t.y < t.maxScrollY ? t.maxScrollY : t.y;
      return e == t.x && n == t.y ? (t.moved && (t.options.onScrollEnd && t.options.onScrollEnd.call(t), t.moved = !1), void 0) : (t.scrollTo(e, n, o || 0), void 0)
    }, _mouseout: function (o) {
      var t = o.relatedTarget;
      if (!t)return this._end(o), void 0;
      for (; t = t.parentNode;)if (t == this.wrapper)return;
      this._end(o)
    }, _transitionEnd: function (o) {
      var t = this;
      o.target == t.scroller && (t._unbind("webkitTransitionEnd"), t._startAni())
    }, _startAni: function () {
      var o, e, n, i = this, r = i.x, s = i.y, l = Date.now();
      if (!i.animating) {
        if (!i.steps.length)return i._resetPos(400), void 0;
        if (o = i.steps.shift(), o.x == r && o.y == s && (o.time = 0), i.animating = !0, i.moved = !0, i.options.useTransition)return i._transitionTime(o.time), i._pos(o.x, o.y), i.animating = !1, o.time ? i._bind("webkitTransitionEnd") : i._resetPos(0), void 0;
        n = function () {
          var a, c, p = Date.now();
          return p >= l + o.time ? (i._pos(o.x, o.y), i.animating = !1, i.options.onAnimationEnd && i.options.onAnimationEnd.call(i), i._startAni(), void 0) : (p = (p - l) / o.time - 1, e = t.sqrt(1 - p * p), a = (o.x - r) * e + r, c = (o.y - s) * e + s, i._pos(a, c), i.animating && (i.aniTime = u(n)), void 0)
        }, n()
      }
    }, _transitionTime: function (o) {
      this.scroller.style[i + "TransitionDuration"] = o + "ms"
    }, _momentum: function (o, n, i, r, s) {
      var l = 6e-4, a = t.abs(o) / n, c = a * a / (2 * l), p = 0, u = 0;
      return o > 0 && c > i ? (u = s / (6 / (c / a * l)), i += u, a = a * i / c, c = i) : 0 > o && c > r && (u = s / (6 / (c / a * l)), r += u, a = a * r / c, c = r), c *= 0 > o ? -1 : 1, p = a / l, {
        dist: c,
        time: e(p)
      }
    }, _offset: function (o) {
      for (var t = -o.offsetLeft, e = -o.offsetTop; o = o.offsetParent;)t -= o.offsetLeft, e -= o.offsetTop;
      return {left: t, top: e}
    }, _bind: function (o, t, e) {
      (t || this.scroller).addEventListener(o, this, !!e)
    }, _unbind: function (o, t, e) {
      (t || this.scroller).removeEventListener(o, this, !!e)
    }, destroy: function () {
      var o = this;
      o.scroller.style[i + "Transform"] = "", o._unbind(d, window), o._unbind(f), o._unbind(h), o._unbind(b), o._unbind(w), o._unbind("mouseout", o.wrapper), o.options.useTransition && o._unbind("webkitTransitionEnd"), o.options.onDestroy && o.options.onDestroy.call(o)
    }, refresh: function () {
      var o, t = this;
      t.wrapperW = t.wrapper.clientWidth, t.wrapperH = t.wrapper.clientHeight, t.scrollerW = t.scroller.offsetWidth, t.scrollerH = t.scroller.offsetHeight, t.maxScrollX = t.wrapperW - t.scrollerW, t.maxScrollY = t.wrapperH - t.scrollerH, t.dirX = 0, t.dirY = 0, t.hScroll = t.options.hScroll && t.maxScrollX < 0, t.vScroll = t.options.vScroll && (!t.options.bounceLock && !t.hScroll || t.scrollerH > t.wrapperH), o = t._offset(t.wrapper), t.wrapperOffsetLeft = -o.left, t.wrapperOffsetTop = -o.top, t.scroller.style[i + "TransitionDuration"] = "0", t._resetPos(200)
    }, scrollTo: function (o, t, e, n) {
      var i, r, s = this, l = o;
      for (s.stop(), l.length || (l = [{
        x: o,
        y: t,
        time: e,
        relative: n
      }]), i = 0, r = l.length; r > i; i++)l[i].relative && (l[i].x = s.x - l[i].x, l[i].y = s.y - l[i].y), s.steps.push({
        x: l[i].x,
        y: l[i].y,
        time: l[i].time || 0
      });
      s._startAni()
    }, scrollToElement: function (o, e) {
      var n, i = this;
      o = o.nodeType ? o : i.scroller.querySelector(o), o && (n = i._offset(o), n.left += i.wrapperOffsetLeft, n.top += i.wrapperOffsetTop, n.left = n.left > 0 ? 0 : n.left < i.maxScrollX ? i.maxScrollX : n.left, n.top = n.top > 0 ? 0 : n.top < i.maxScrollY ? i.maxScrollY : n.top, e = void 0 === e ? t.max(2 * t.abs(n.left), 2 * t.abs(n.top)) : e, i.scrollTo(n.left, n.top, e))
    }, disable: function () {
      this.stop(), this._resetPos(0), this.enabled = !1, this._unbind(h), this._unbind(b), this._unbind(w)
    }, enable: function () {
      this.enabled = !0
    }, stop: function () {
      m(this.aniTime), this.steps = [], this.moved = !1, this.animating = !1
    }
  }, "undefined" != typeof exports ? exports.iScroll = v : window.iScroll = v
}();
