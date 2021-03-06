/*!
 * Font Awesome Icon Picker
 * https://farbelous.github.io/fontawesome-iconpicker/
 *
 * @author Javi Aguilar, itsjavi.com
 * @license MIT License
 * @see https://github.com/farbelous/fontawesome-iconpicker/blob/master/LICENSE
 */


(function(e) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], e);
    } else {
        e(jQuery);
    }
})(function(j) {
    j.ui = j.ui || {};
    var e = j.ui.version = "1.12.1";
    (function() {
        var i, w = Math.max, x = Math.abs, r = /left|center|right/, s = /top|center|bottom/, o = /[\+\-]\d+(\.[\d]+)?%?/, c = /^\w+/, l = /%$/, t = j.fn.pos;
        function z(e, t, a) {
            return [ parseFloat(e[0]) * (l.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (l.test(e[1]) ? a / 100 : 1) ];
        }
        function q(e, t) {
            return parseInt(j.css(e, t), 10) || 0;
        }
        function a(e) {
            var t = e[0];
            if (t.nodeType === 9) {
                return {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                };
            }
            if (j.isWindow(t)) {
                return {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: e.scrollTop(),
                        left: e.scrollLeft()
                    }
                };
            }
            if (t.preventDefault) {
                return {
                    width: 0,
                    height: 0,
                    offset: {
                        top: t.pageY,
                        left: t.pageX
                    }
                };
            }
            return {
                width: e.outerWidth(),
                height: e.outerHeight(),
                offset: e.offset()
            };
        }
        j.pos = {
            scrollbarWidth: function() {
                if (i !== undefined) {
                    return i;
                }
                var e, t, a = j("<div " + "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" + "<div style='height:100px;width:auto;'></div></div>"), r = a.children()[0];
                j("body").append(a);
                e = r.offsetWidth;
                a.css("overflow", "scroll");
                t = r.offsetWidth;
                if (e === t) {
                    t = a[0].clientWidth;
                }
                a.remove();
                return i = e - t;
            },
            getScrollInfo: function(e) {
                var t = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"), a = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"), r = t === "scroll" || t === "auto" && e.width < e.element[0].scrollWidth, i = a === "scroll" || a === "auto" && e.height < e.element[0].scrollHeight;
                return {
                    width: i ? j.pos.scrollbarWidth() : 0,
                    height: r ? j.pos.scrollbarWidth() : 0
                };
            },
            getWithinInfo: function(e) {
                var t = j(e || window), a = j.isWindow(t[0]), r = !!t[0] && t[0].nodeType === 9, i = !a && !r;
                return {
                    element: t,
                    isWindow: a,
                    isDocument: r,
                    offset: i ? j(e).offset() : {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: t.scrollLeft(),
                    scrollTop: t.scrollTop(),
                    width: t.outerWidth(),
                    height: t.outerHeight()
                };
            }
        };
        j.fn.pos = function(m) {
            if (!m || !m.of) {
                return t.apply(this, arguments);
            }
            m = j.extend({}, m);
            var p, f, d, u, g, e, T = j(m.of), b = j.pos.getWithinInfo(m.within), v = j.pos.getScrollInfo(b), y = (m.collision || "flip").split(" "), k = {};
            e = a(T);
            if (T[0].preventDefault) {
                m.at = "left top";
            }
            f = e.width;
            d = e.height;
            u = e.offset;
            g = j.extend({}, u);
            j.each([ "my", "at" ], function() {
                var e = (m[this] || "").split(" "), t, a;
                if (e.length === 1) {
                    e = r.test(e[0]) ? e.concat([ "center" ]) : s.test(e[0]) ? [ "center" ].concat(e) : [ "center", "center" ];
                }
                e[0] = r.test(e[0]) ? e[0] : "center";
                e[1] = s.test(e[1]) ? e[1] : "center";
                t = o.exec(e[0]);
                a = o.exec(e[1]);
                k[this] = [ t ? t[0] : 0, a ? a[0] : 0 ];
                m[this] = [ c.exec(e[0])[0], c.exec(e[1])[0] ];
            });
            if (y.length === 1) {
                y[1] = y[0];
            }
            if (m.at[0] === "right") {
                g.left += f;
            } else if (m.at[0] === "center") {
                g.left += f / 2;
            }
            if (m.at[1] === "bottom") {
                g.top += d;
            } else if (m.at[1] === "center") {
                g.top += d / 2;
            }
            p = z(k.at, f, d);
            g.left += p[0];
            g.top += p[1];
            return this.each(function() {
                var a, e, o = j(this), c = o.outerWidth(), l = o.outerHeight(), t = q(this, "marginLeft"), r = q(this, "marginTop"), i = c + t + q(this, "marginRight") + v.width, s = l + r + q(this, "marginBottom") + v.height, n = j.extend({}, g), h = z(k.my, o.outerWidth(), o.outerHeight());
                if (m.my[0] === "right") {
                    n.left -= c;
                } else if (m.my[0] === "center") {
                    n.left -= c / 2;
                }
                if (m.my[1] === "bottom") {
                    n.top -= l;
                } else if (m.my[1] === "center") {
                    n.top -= l / 2;
                }
                n.left += h[0];
                n.top += h[1];
                a = {
                    marginLeft: t,
                    marginTop: r
                };
                j.each([ "left", "top" ], function(e, t) {
                    if (j.ui.pos[y[e]]) {
                        j.ui.pos[y[e]][t](n, {
                            targetWidth: f,
                            targetHeight: d,
                            elemWidth: c,
                            elemHeight: l,
                            collisionPosition: a,
                            collisionWidth: i,
                            collisionHeight: s,
                            offset: [ p[0] + h[0], p[1] + h[1] ],
                            my: m.my,
                            at: m.at,
                            within: b,
                            elem: o
                        });
                    }
                });
                if (m.using) {
                    e = function(e) {
                        var t = u.left - n.left, a = t + f - c, r = u.top - n.top, i = r + d - l, s = {
                            target: {
                                element: T,
                                left: u.left,
                                top: u.top,
                                width: f,
                                height: d
                            },
                            element: {
                                element: o,
                                left: n.left,
                                top: n.top,
                                width: c,
                                height: l
                            },
                            horizontal: a < 0 ? "left" : t > 0 ? "right" : "center",
                            vertical: i < 0 ? "top" : r > 0 ? "bottom" : "middle"
                        };
                        if (f < c && x(t + a) < f) {
                            s.horizontal = "center";
                        }
                        if (d < l && x(r + i) < d) {
                            s.vertical = "middle";
                        }
                        if (w(x(t), x(a)) > w(x(r), x(i))) {
                            s.important = "horizontal";
                        } else {
                            s.important = "vertical";
                        }
                        m.using.call(this, e, s);
                    };
                }
                o.offset(j.extend(n, {
                    using: e
                }));
            });
        };
        j.ui.pos = {
            _trigger: function(e, t, a, r) {
                if (t.elem) {
                    t.elem.trigger({
                        type: a,
                        position: e,
                        positionData: t,
                        triggered: r
                    });
                }
            },
            fit: {
                left: function(e, t) {
                    j.ui.pos._trigger(e, t, "posCollide", "fitLeft");
                    var a = t.within, r = a.isWindow ? a.scrollLeft : a.offset.left, i = a.width, s = e.left - t.collisionPosition.marginLeft, o = r - s, c = s + t.collisionWidth - i - r, l;
                    if (t.collisionWidth > i) {
                        if (o > 0 && c <= 0) {
                            l = e.left + o + t.collisionWidth - i - r;
                            e.left += o - l;
                        } else if (c > 0 && o <= 0) {
                            e.left = r;
                        } else {
                            if (o > c) {
                                e.left = r + i - t.collisionWidth;
                            } else {
                                e.left = r;
                            }
                        }
                    } else if (o > 0) {
                        e.left += o;
                    } else if (c > 0) {
                        e.left -= c;
                    } else {
                        e.left = w(e.left - s, e.left);
                    }
                    j.ui.pos._trigger(e, t, "posCollided", "fitLeft");
                },
                top: function(e, t) {
                    j.ui.pos._trigger(e, t, "posCollide", "fitTop");
                    var a = t.within, r = a.isWindow ? a.scrollTop : a.offset.top, i = t.within.height, s = e.top - t.collisionPosition.marginTop, o = r - s, c = s + t.collisionHeight - i - r, l;
                    if (t.collisionHeight > i) {
                        if (o > 0 && c <= 0) {
                            l = e.top + o + t.collisionHeight - i - r;
                            e.top += o - l;
                        } else if (c > 0 && o <= 0) {
                            e.top = r;
                        } else {
                            if (o > c) {
                                e.top = r + i - t.collisionHeight;
                            } else {
                                e.top = r;
                            }
                        }
                    } else if (o > 0) {
                        e.top += o;
                    } else if (c > 0) {
                        e.top -= c;
                    } else {
                        e.top = w(e.top - s, e.top);
                    }
                    j.ui.pos._trigger(e, t, "posCollided", "fitTop");
                }
            },
            flip: {
                left: function(e, t) {
                    j.ui.pos._trigger(e, t, "posCollide", "flipLeft");
                    var a = t.within, r = a.offset.left + a.scrollLeft, i = a.width, s = a.isWindow ? a.scrollLeft : a.offset.left, o = e.left - t.collisionPosition.marginLeft, c = o - s, l = o + t.collisionWidth - i - s, n = t.my[0] === "left" ? -t.elemWidth : t.my[0] === "right" ? t.elemWidth : 0, h = t.at[0] === "left" ? t.targetWidth : t.at[0] === "right" ? -t.targetWidth : 0, m = -2 * t.offset[0], p, f;
                    if (c < 0) {
                        p = e.left + n + h + m + t.collisionWidth - i - r;
                        if (p < 0 || p < x(c)) {
                            e.left += n + h + m;
                        }
                    } else if (l > 0) {
                        f = e.left - t.collisionPosition.marginLeft + n + h + m - s;
                        if (f > 0 || x(f) < l) {
                            e.left += n + h + m;
                        }
                    }
                    j.ui.pos._trigger(e, t, "posCollided", "flipLeft");
                },
                top: function(e, t) {
                    j.ui.pos._trigger(e, t, "posCollide", "flipTop");
                    var a = t.within, r = a.offset.top + a.scrollTop, i = a.height, s = a.isWindow ? a.scrollTop : a.offset.top, o = e.top - t.collisionPosition.marginTop, c = o - s, l = o + t.collisionHeight - i - s, n = t.my[1] === "top", h = n ? -t.elemHeight : t.my[1] === "bottom" ? t.elemHeight : 0, m = t.at[1] === "top" ? t.targetHeight : t.at[1] === "bottom" ? -t.targetHeight : 0, p = -2 * t.offset[1], f, d;
                    if (c < 0) {
                        d = e.top + h + m + p + t.collisionHeight - i - r;
                        if (d < 0 || d < x(c)) {
                            e.top += h + m + p;
                        }
                    } else if (l > 0) {
                        f = e.top - t.collisionPosition.marginTop + h + m + p - s;
                        if (f > 0 || x(f) < l) {
                            e.top += h + m + p;
                        }
                    }
                    j.ui.pos._trigger(e, t, "posCollided", "flipTop");
                }
            },
            flipfit: {
                left: function() {
                    j.ui.pos.flip.left.apply(this, arguments);
                    j.ui.pos.fit.left.apply(this, arguments);
                },
                top: function() {
                    j.ui.pos.flip.top.apply(this, arguments);
                    j.ui.pos.fit.top.apply(this, arguments);
                }
            }
        };
        (function() {
            var e, t, a, r, i, s = document.getElementsByTagName("body")[0], o = document.createElement("div");
            e = document.createElement(s ? "div" : "body");
            a = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            if (s) {
                j.extend(a, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
            }
            for (i in a) {
                e.style[i] = a[i];
            }
            e.appendChild(o);
            t = s || document.documentElement;
            t.insertBefore(e, t.firstChild);
            o.style.cssText = "position: absolute; left: 10.7432222px;";
            r = j(o).offset().left;
            j.support.offsetFractions = r > 10 && r < 11;
            e.innerHTML = "";
            t.removeChild(e);
        })();
    })();
    var t = j.ui.position;
});

(function(e) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], e);
    } else if (window.jQuery && !window.jQuery.fn.iconpicker) {
        e(window.jQuery);
    }
})(function(l) {
    "use strict";
    var o = {
        isEmpty: function(e) {
            return e === false || e === "" || e === null || e === undefined;
        },
        isEmptyObject: function(e) {
            return this.isEmpty(e) === true || e.length === 0;
        },
        isElement: function(e) {
            return l(e).length > 0;
        },
        isString: function(e) {
            return typeof e === "string" || e instanceof String;
        },
        isArray: function(e) {
            return l.isArray(e);
        },
        inArray: function(e, t) {
            return l.inArray(e, t) !== -1;
        },
        throwError: function(e) {
            throw "Font Awesome Icon Picker Exception: " + e;
        }
    };
    var a = function(e, t) {
        this._id = a._idCounter++;
        this.element = l(e).addClass("iconpicker-element");
        this._trigger("iconpickerCreate", {
            iconpickerValue: this.iconpickerValue
        });
        this.options = l.extend({}, a.defaultOptions, this.element.data(), t);
        this.options.templates = l.extend({}, a.defaultOptions.templates, this.options.templates);
        this.options.originalPlacement = this.options.placement;
        this.container = o.isElement(this.options.container) ? l(this.options.container) : false;
        if (this.container === false) {
            if (this.element.is(".dropdown-toggle")) {
                this.container = l("~ .dropdown-menu:first", this.element);
            } else {
                this.container = this.element.is("input,textarea,button,.btn") ? this.element.parent() : this.element;
            }
        }
        this.container.addClass("iconpicker-container");
        if (this.isDropdownMenu()) {
            this.options.placement = "inline";
        }
        this.input = this.element.is("input,textarea") ? this.element.addClass("iconpicker-input") : false;
        if (this.input === false) {
            this.input = this.container.find(this.options.input);
            if (!this.input.is("input,textarea")) {
                this.input = false;
            }
        }
        this.component = this.isDropdownMenu() ? this.container.parent().find(this.options.component) : this.container.find(this.options.component);
        if (this.component.length === 0) {
            this.component = false;
        } else {
            this.component.find("i").addClass("iconpicker-component");
        }
        this._createPopover();
        this._createIconpicker();
        if (this.getAcceptButton().length === 0) {
            this.options.mustAccept = false;
        }
        if (this.isInputGroup()) {
            this.container.parent().append(this.popover);
        } else {
            this.container.append(this.popover);
        }
        this._bindElementEvents();
        this._bindWindowEvents();
        this.update(this.options.selected);
        if (this.isInline()) {
            this.show();
        }
        this._trigger("iconpickerCreated", {
            iconpickerValue: this.iconpickerValue
        });
    };
    a._idCounter = 0;
    a.defaultOptions = {
        title: false,
        selected: false,
        defaultValue: false,
        placement: "bottom",
        collision: "none",
        animation: true,
        hideOnSelect: false,
        showFooter: false,
        searchInFooter: false,
        mustAccept: false,
        selectedCustomClass: "bg-primary",
        icons: [],
        fullClassFormatter: function(e) {
            return e;
        },
        input: "input,.iconpicker-input",
        inputSearch: false,
        container: false,
        component: ".input-group-addon,.iconpicker-component",
        templates: {
            popover: '<div class="iconpicker-popover popover"><div class="arrow"></div>' + '<div class="popover-title"></div><div class="popover-content"></div></div>',
            footer: '<div class="popover-footer"></div>',
            buttons: '<button class="iconpicker-btn iconpicker-btn-cancel btn btn-default btn-sm">Cancel</button>' + ' <button class="iconpicker-btn iconpicker-btn-accept btn btn-primary btn-sm">Accept</button>',
            search: '<input type="search" class="form-control iconpicker-search" placeholder="Type to filter" />',
            iconpicker: '<div class="iconpicker"><div class="iconpicker-items"></div></div>',
            iconpickerItem: '<a role="button" href="javascript:;" class="iconpicker-item"><i></i></a>'
        }
    };
    a.batch = function(e, t) {
        var a = Array.prototype.slice.call(arguments, 2);
        return l(e).each(function() {
            var e = l(this).data("iconpicker");
            if (!!e) {
                e[t].apply(e, a);
            }
        });
    };
    a.prototype = {
        constructor: a,
        options: {},
        _id: 0,
        _trigger: function(e, t) {
            t = t || {};
            this.element.trigger(l.extend({
                type: e,
                iconpickerInstance: this
            }, t));
        },
        _createPopover: function() {
            this.popover = l(this.options.templates.popover);
            var e = this.popover.find(".popover-title");
            if (!!this.options.title) {
                e.append(l('<div class="popover-title-text">' + this.options.title + "</div>"));
            }
            if (this.hasSeparatedSearchInput() && !this.options.searchInFooter) {
                e.append(this.options.templates.search);
            } else if (!this.options.title) {
                e.remove();
            }
            if (this.options.showFooter && !o.isEmpty(this.options.templates.footer)) {
                var t = l(this.options.templates.footer);
                if (this.hasSeparatedSearchInput() && this.options.searchInFooter) {
                    t.append(l(this.options.templates.search));
                }
                if (!o.isEmpty(this.options.templates.buttons)) {
                    t.append(l(this.options.templates.buttons));
                }
                this.popover.append(t);
            }
            if (this.options.animation === true) {
                this.popover.addClass("fade");
            }
            return this.popover;
        },
        _createIconpicker: function() {
            var a = this;
            this.iconpicker = l(this.options.templates.iconpicker);
            var e = function(e) {
                var t = l(this);
                if (t.is("i")) {
                    t = t.parent();
                }
                a._trigger("iconpickerSelect", {
                    iconpickerItem: t,
                    iconpickerValue: a.iconpickerValue
                });
                if (a.options.mustAccept === false) {
                    a.update(t.data("iconpickerValue"));
                    a._trigger("iconpickerSelected", {
                        iconpickerItem: this,
                        iconpickerValue: a.iconpickerValue
                    });
                } else {
                    a.update(t.data("iconpickerValue"), true);
                }
                if (a.options.hideOnSelect && a.options.mustAccept === false) {
                    a.hide();
                }
            };
            var t = l(this.options.templates.iconpickerItem);
            var r = [];
            for (var i in this.options.icons) {
                if (typeof this.options.icons[i].title === "string") {
                    var s = t.clone();
                    s.find("i").addClass(this.options.fullClassFormatter(this.options.icons[i].title));
                    s.data("iconpickerValue", this.options.icons[i].title).on("click.iconpicker", e);
                    s.attr("title", "." + this.options.icons[i].title);
                    if (this.options.icons[i].searchTerms.length > 0) {
                        var o = "";
                        for (var c = 0; c < this.options.icons[i].searchTerms.length; c++) {
                            o = o + this.options.icons[i].searchTerms[c] + " ";
                        }
                        s.attr("data-search-terms", o);
                    }
                    r.push(s);
                }
            }
            this.iconpicker.find(".iconpicker-items").append(r);
            this.popover.find(".popover-content").append(this.iconpicker);
            return this.iconpicker;
        },
        _isEventInsideIconpicker: function(e) {
            var t = l(e.target);
            if ((!t.hasClass("iconpicker-element") || t.hasClass("iconpicker-element") && !t.is(this.element)) && t.parents(".iconpicker-popover").length === 0) {
                return false;
            }
            return true;
        },
        _bindElementEvents: function() {
            var t = this;
            this.getSearchInput().on("keyup.iconpicker", function() {
                t.filter(l(this).val().toLowerCase());
            });
            this.getAcceptButton().on("click.iconpicker", function() {
                var e = t.iconpicker.find(".iconpicker-selected").get(0);
                t.update(t.iconpickerValue);
                t._trigger("iconpickerSelected", {
                    iconpickerItem: e,
                    iconpickerValue: t.iconpickerValue
                });
                if (!t.isInline()) {
                    t.hide();
                }
            });
            this.getCancelButton().on("click.iconpicker", function() {
                if (!t.isInline()) {
                    t.hide();
                }
            });
            this.element.on("focus.iconpicker", function(e) {
                t.show();
                e.stopPropagation();
            });
            if (this.hasComponent()) {
                this.component.on("click.iconpicker", function() {
                    t.toggle();
                });
            }
            if (this.hasInput()) {
                this.input.on("keyup.iconpicker", function(e) {
                    if (!o.inArray(e.keyCode, [ 38, 40, 37, 39, 16, 17, 18, 9, 8, 91, 93, 20, 46, 186, 190, 46, 78, 188, 44, 86 ])) {
                        t.update();
                    } else {
                        t._updateFormGroupStatus(t.getValid(this.value) !== false);
                    }
                    if (t.options.inputSearch === true) {
                        t.filter(l(this).val().toLowerCase());
                    }
                });
            }
        },
        _bindWindowEvents: function() {
            var e = l(window.document);
            var t = this;
            var a = ".iconpicker.inst" + this._id;
            l(window).on("resize.iconpicker" + a + " orientationchange.iconpicker" + a, function(e) {
                if (t.popover.hasClass("in")) {
                    t.updatePlacement();
                }
            });
            if (!t.isInline()) {
                e.on("mouseup" + a, function(e) {
                    if (!t._isEventInsideIconpicker(e) && !t.isInline()) {
                        t.hide();
                    }
                });
            }
        },
        _unbindElementEvents: function() {
            this.popover.off(".iconpicker");
            this.element.off(".iconpicker");
            if (this.hasInput()) {
                this.input.off(".iconpicker");
            }
            if (this.hasComponent()) {
                this.component.off(".iconpicker");
            }
            if (this.hasContainer()) {
                this.container.off(".iconpicker");
            }
        },
        _unbindWindowEvents: function() {
            l(window).off(".iconpicker.inst" + this._id);
            l(window.document).off(".iconpicker.inst" + this._id);
        },
        updatePlacement: function(e, t) {
            e = e || this.options.placement;
            this.options.placement = e;
            t = t || this.options.collision;
            t = t === true ? "flip" : t;
            var a = {
                at: "right bottom",
                my: "right top",
                of: this.hasInput() && !this.isInputGroup() ? this.input : this.container,
                collision: t === true ? "flip" : t,
                within: window
            };
            this.popover.removeClass("inline topLeftCorner topLeft top topRight topRightCorner " + "rightTop right rightBottom bottomRight bottomRightCorner " + "bottom bottomLeft bottomLeftCorner leftBottom left leftTop");
            if (typeof e === "object") {
                return this.popover.pos(l.extend({}, a, e));
            }
            switch (e) {
              case "inline":
                {
                    a = false;
                }
                break;

              case "topLeftCorner":
                {
                    a.my = "right bottom";
                    a.at = "left top";
                }
                break;

              case "topLeft":
                {
                    a.my = "left bottom";
                    a.at = "left top";
                }
                break;

              case "top":
                {
                    a.my = "center bottom";
                    a.at = "center top";
                }
                break;

              case "topRight":
                {
                    a.my = "right bottom";
                    a.at = "right top";
                }
                break;

              case "topRightCorner":
                {
                    a.my = "left bottom";
                    a.at = "right top";
                }
                break;

              case "rightTop":
                {
                    a.my = "left bottom";
                    a.at = "right center";
                }
                break;

              case "right":
                {
                    a.my = "left center";
                    a.at = "right center";
                }
                break;

              case "rightBottom":
                {
                    a.my = "left top";
                    a.at = "right center";
                }
                break;

              case "bottomRightCorner":
                {
                    a.my = "left top";
                    a.at = "right bottom";
                }
                break;

              case "bottomRight":
                {
                    a.my = "right top";
                    a.at = "right bottom";
                }
                break;

              case "bottom":
                {
                    a.my = "center top";
                    a.at = "center bottom";
                }
                break;

              case "bottomLeft":
                {
                    a.my = "left top";
                    a.at = "left bottom";
                }
                break;

              case "bottomLeftCorner":
                {
                    a.my = "right top";
                    a.at = "left bottom";
                }
                break;

              case "leftBottom":
                {
                    a.my = "right top";
                    a.at = "left center";
                }
                break;

              case "left":
                {
                    a.my = "right center";
                    a.at = "left center";
                }
                break;

              case "leftTop":
                {
                    a.my = "right bottom";
                    a.at = "left center";
                }
                break;

              default:
                {
                    return false;
                }
                break;
            }
            this.popover.css({
                display: this.options.placement === "inline" ? "" : "block"
            });
            if (a !== false) {
                this.popover.pos(a).css("maxWidth", l(window).width() - this.container.offset().left - 5);
            } else {
                this.popover.css({
                    top: "auto",
                    right: "auto",
                    bottom: "auto",
                    left: "auto",
                    maxWidth: "none"
                });
            }
            this.popover.addClass(this.options.placement);
            return true;
        },
        _updateComponents: function() {
            this.iconpicker.find(".iconpicker-item.iconpicker-selected").removeClass("iconpicker-selected " + this.options.selectedCustomClass);
            if (this.iconpickerValue) {
                this.iconpicker.find("." + this.options.fullClassFormatter(this.iconpickerValue).replace(/ /g, ".")).parent().addClass("iconpicker-selected " + this.options.selectedCustomClass);
            }
            if (this.hasComponent()) {
                var e = this.component.find("i");
                if (e.length > 0) {
                    e.attr("class", this.options.fullClassFormatter(this.iconpickerValue));
                } else {
                    this.component.html(this.getHtml());
                }
            }
        },
        _updateFormGroupStatus: function(e) {
            if (this.hasInput()) {
                if (e !== false) {
                    this.input.parents(".form-group:first").removeClass("has-error");
                } else {
                    this.input.parents(".form-group:first").addClass("has-error");
                }
                return true;
            }
            return false;
        },
        getValid: function(e) {
            if (!o.isString(e)) {
                e = "";
            }
            var t = e === "";
            e = l.trim(e);
            var a = false;
            for (var r = 0; r < this.options.icons.length; r++) {
                if (this.options.icons[r].title === e) {
                    a = true;
                    break;
                }
            }
            if (a || t) {
                return e;
            }
            return false;
        },
        setValue: function(e) {
            var t = this.getValid(e);
            if (t !== false) {
                this.iconpickerValue = t;
                this._trigger("iconpickerSetValue", {
                    iconpickerValue: t
                });
                return this.iconpickerValue;
            } else {
                this._trigger("iconpickerInvalid", {
                    iconpickerValue: e
                });
                return false;
            }
        },
        getHtml: function() {
            return '<i class="' + this.options.fullClassFormatter(this.iconpickerValue) + '"></i>';
        },
        setSourceValue: function(e) {
            e = this.setValue(e);
            if (e !== false && e !== "") {
                if (this.hasInput()) {
                    this.input.val(this.iconpickerValue);
                } else {
                    this.element.data("iconpickerValue", this.iconpickerValue);
                }
                this._trigger("iconpickerSetSourceValue", {
                    iconpickerValue: e
                });
            }
            return e;
        },
        getSourceValue: function(e) {
            e = e || this.options.defaultValue;
            var t = e;
            if (this.hasInput()) {
                t = this.input.val();
            } else {
                t = this.element.data("iconpickerValue");
            }
            if (t === undefined || t === "" || t === null || t === false) {
                t = e;
            }
            return t;
        },
        hasInput: function() {
            return this.input !== false;
        },
        isInputSearch: function() {
            return this.hasInput() && this.options.inputSearch === true;
        },
        isInputGroup: function() {
            return this.container.is(".input-group");
        },
        isDropdownMenu: function() {
            return this.container.is(".dropdown-menu");
        },
        hasSeparatedSearchInput: function() {
            return this.options.templates.search !== false && !this.isInputSearch();
        },
        hasComponent: function() {
            return this.component !== false;
        },
        hasContainer: function() {
            return this.container !== false;
        },
        getAcceptButton: function() {
            return this.popover.find(".iconpicker-btn-accept");
        },
        getCancelButton: function() {
            return this.popover.find(".iconpicker-btn-cancel");
        },
        getSearchInput: function() {
            return this.popover.find(".iconpicker-search");
        },
        filter: function(i) {
            if (o.isEmpty(i)) {
                this.iconpicker.find(".iconpicker-item").show();
                return l(false);
            } else {
                var s = [];
                this.iconpicker.find(".iconpicker-item").each(function() {
                    var e = l(this);
                    var t = e.attr("title").toLowerCase();
                    var a = e.attr("data-search-terms") ? e.attr("data-search-terms").toLowerCase() : "";
                    t = t + " " + a;
                    var r = false;
                    try {
                        r = new RegExp("(^|\\W)" + i, "g");
                    } catch (e) {
                        r = false;
                    }
                    if (r !== false && t.match(r)) {
                        s.push(e);
                        e.show();
                    } else {
                        e.hide();
                    }
                });
                return s;
            }
        },
        show: function() {
            if (this.popover.hasClass("in")) {
                return false;
            }
            l.iconpicker.batch(l(".iconpicker-popover.in:not(.inline)").not(this.popover), "hide");
            this._trigger("iconpickerShow", {
                iconpickerValue: this.iconpickerValue
            });
            this.updatePlacement();
            this.popover.addClass("in");
            setTimeout(l.proxy(function() {
                this.popover.css("display", this.isInline() ? "" : "block");
                this._trigger("iconpickerShown", {
                    iconpickerValue: this.iconpickerValue
                });
            }, this), this.options.animation ? 300 : 1);
        },
        hide: function() {
            if (!this.popover.hasClass("in")) {
                return false;
            }
            this._trigger("iconpickerHide", {
                iconpickerValue: this.iconpickerValue
            });
            this.popover.removeClass("in");
            setTimeout(l.proxy(function() {
                this.popover.css("display", "none");
                this.getSearchInput().val("");
                this.filter("");
                this._trigger("iconpickerHidden", {
                    iconpickerValue: this.iconpickerValue
                });
            }, this), this.options.animation ? 300 : 1);
        },
        toggle: function() {
            if (this.popover.is(":visible")) {
                this.hide();
            } else {
                this.show(true);
            }
        },
        update: function(e, t) {
            e = e ? e : this.getSourceValue(this.iconpickerValue);
            this._trigger("iconpickerUpdate", {
                iconpickerValue: this.iconpickerValue
            });
            if (t === true) {
                e = this.setValue(e);
            } else {
                e = this.setSourceValue(e);
                this._updateFormGroupStatus(e !== false);
            }
            if (e !== false) {
                this._updateComponents();
            }
            this._trigger("iconpickerUpdated", {
                iconpickerValue: this.iconpickerValue
            });
            return e;
        },
        destroy: function() {
            this._trigger("iconpickerDestroy", {
                iconpickerValue: this.iconpickerValue
            });
            this.element.removeData("iconpicker").removeData("iconpickerValue").removeClass("iconpicker-element");
            this._unbindElementEvents();
            this._unbindWindowEvents();
            l(this.popover).remove();
            this._trigger("iconpickerDestroyed", {
                iconpickerValue: this.iconpickerValue
            });
        },
        disable: function() {
            if (this.hasInput()) {
                this.input.prop("disabled", true);
                return true;
            }
            return false;
        },
        enable: function() {
            if (this.hasInput()) {
                this.input.prop("disabled", false);
                return true;
            }
            return false;
        },
        isDisabled: function() {
            if (this.hasInput()) {
                return this.input.prop("disabled") === true;
            }
            return false;
        },
        isInline: function() {
            return this.options.placement === "inline" || this.popover.hasClass("inline");
        }
    };
    l.iconpicker = a;
    l.fn.iconpicker = function(t) {
        return this.each(function() {
            var e = l(this);
            if (!e.data("iconpicker")) {
                e.data("iconpicker", new a(this, typeof t === "object" ? t : {}));
            }
        });
    };
    a.defaultOptions = l.extend(a.defaultOptions, {
        icons: [ {
            title: "fa-ad",
            searchTerms: [ "advertisement", "media", "newspaper", "promotion", "publicity" ]
        }, {
            title: "fa-address-book",
            searchTerms: [ "contact", "directory", "index", "little black book", "rolodex" ]
        }, {
            title: "fa-address-card",
            searchTerms: [ "about", "contact", "id", "identification", "postcard", "profile" ]
        }, {
            title: "fa-adjust",
            searchTerms: [ "contrast", "dark", "light", "saturation" ]
        }, {
            title: "fa-air-freshener",
            searchTerms: [ "car", "deodorize", "fresh", "pine", "scent" ]
        }, {
            title: "fa-align-center",
            searchTerms: [ "format", "middle", "paragraph", "text" ]
        }, {
            title: "fa-align-justify",
            searchTerms: [ "format", "paragraph", "text" ]
        }, {
            title: "fa-align-left",
            searchTerms: [ "format", "paragraph", "text" ]
        }, {
            title: "fa-align-right",
            searchTerms: [ "format", "paragraph", "text" ]
        }, {
            title: "fa-allergies",
            searchTerms: [ "allergy", "freckles", "hand", "hives", "pox", "skin", "spots" ]
        }, {
            title: "fa-ambulance",
            searchTerms: [ "covid-19", "emergency", "emt", "er", "help", "hospital", "support", "vehicle" ]
        }, {
            title: "fa-american-sign-language-interpreting",
            searchTerms: [ "asl", "deaf", "finger", "hand", "interpret", "speak" ]
        }, {
            title: "fa-anchor",
            searchTerms: [ "berth", "boat", "dock", "embed", "link", "maritime", "moor", "secure" ]
        }, {
            title: "fa-angle-double-down",
            searchTerms: [ "arrows", "caret", "download", "expand" ]
        }, {
            title: "fa-angle-double-left",
            searchTerms: [ "arrows", "back", "caret", "laquo", "previous", "quote" ]
        }, {
            title: "fa-angle-double-right",
            searchTerms: [ "arrows", "caret", "forward", "more", "next", "quote", "raquo" ]
        }, {
            title: "fa-angle-double-up",
            searchTerms: [ "arrows", "caret", "collapse", "upload" ]
        }, {
            title: "fa-angle-down",
            searchTerms: [ "arrow", "caret", "download", "expand" ]
        }, {
            title: "fa-angle-left",
            searchTerms: [ "arrow", "back", "caret", "less", "previous" ]
        }, {
            title: "fa-angle-right",
            searchTerms: [ "arrow", "care", "forward", "more", "next" ]
        }, {
            title: "fa-angle-up",
            searchTerms: [ "arrow", "caret", "collapse", "upload" ]
        }, {
            title: "fa-angry",
            searchTerms: [ "disapprove", "emoticon", "face", "mad", "upset" ]
        }, {
            title: "fa-ankh",
            searchTerms: [ "amulet", "copper", "coptic christianity", "copts", "crux ansata", "egypt", "venus" ]
        }, {
            title: "fa-apple-alt",
            searchTerms: [ "fall", "fruit", "fuji", "macintosh", "orchard", "seasonal", "vegan" ]
        }, {
            title: "fa-archive",
            searchTerms: [ "box", "package", "save", "storage" ]
        }, {
            title: "fa-archway",
            searchTerms: [ "arc", "monument", "road", "street", "tunnel" ]
        }, {
            title: "fa-arrow-alt-circle-down",
            searchTerms: [ "arrow-circle-o-down", "download" ]
        }, {
            title: "fa-arrow-alt-circle-left",
            searchTerms: [ "arrow-circle-o-left", "back", "previous" ]
        }, {
            title: "fa-arrow-alt-circle-right",
            searchTerms: [ "arrow-circle-o-right", "forward", "next" ]
        }, {
            title: "fa-arrow-alt-circle-up",
            searchTerms: [ "arrow-circle-o-up" ]
        }, {
            title: "fa-arrow-circle-down",
            searchTerms: [ "download" ]
        }, {
            title: "fa-arrow-circle-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fa-arrow-circle-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fa-arrow-circle-up",
            searchTerms: [ "upload" ]
        }, {
            title: "fa-arrow-down",
            searchTerms: [ "download" ]
        }, {
            title: "fa-arrow-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fa-arrow-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fa-arrow-up",
            searchTerms: [ "forward", "upload" ]
        }, {
            title: "fa-arrows-alt",
            searchTerms: [ "arrow", "arrows", "bigger", "enlarge", "expand", "fullscreen", "move", "position", "reorder", "resize" ]
        }, {
            title: "fa-arrows-alt-h",
            searchTerms: [ "arrows-h", "expand", "horizontal", "landscape", "resize", "wide" ]
        }, {
            title: "fa-arrows-alt-v",
            searchTerms: [ "arrows-v", "expand", "portrait", "resize", "tall", "vertical" ]
        }, {
            title: "fa-assistive-listening-systems",
            searchTerms: [ "amplify", "audio", "deaf", "ear", "headset", "hearing", "sound" ]
        }, {
            title: "fa-asterisk",
            searchTerms: [ "annotation", "details", "reference", "star" ]
        }, {
            title: "fa-at",
            searchTerms: [ "address", "author", "e-mail", "email", "handle" ]
        }, {
            title: "fa-atlas",
            searchTerms: [ "book", "directions", "geography", "globe", "map", "travel", "wayfinding" ]
        }, {
            title: "fa-atom",
            searchTerms: [ "atheism", "chemistry", "electron", "ion", "isotope", "neutron", "nuclear", "proton", "science" ]
        }, {
            title: "fa-audio-description",
            searchTerms: [ "blind", "narration", "video", "visual" ]
        }, {
            title: "fa-award",
            searchTerms: [ "honor", "praise", "prize", "recognition", "ribbon", "trophy" ]
        }, {
            title: "fa-baby",
            searchTerms: [ "child", "diaper", "doll", "human", "infant", "kid", "offspring", "person", "sprout" ]
        }, {
            title: "fa-baby-carriage",
            searchTerms: [ "buggy", "carrier", "infant", "push", "stroller", "transportation", "walk", "wheels" ]
        }, {
            title: "fa-backspace",
            searchTerms: [ "command", "delete", "erase", "keyboard", "undo" ]
        }, {
            title: "fa-backward",
            searchTerms: [ "previous", "rewind" ]
        }, {
            title: "fa-bacon",
            searchTerms: [ "blt", "breakfast", "ham", "lard", "meat", "pancetta", "pork", "rasher" ]
        }, {
            title: "fa-bahai",
            searchTerms: [ "bahai", "bahá'í", "star" ]
        }, {
            title: "fa-balance-scale",
            searchTerms: [ "balanced", "justice", "legal", "measure", "weight" ]
        }, {
            title: "fa-balance-scale-left",
            searchTerms: [ "justice", "legal", "measure", "unbalanced", "weight" ]
        }, {
            title: "fa-balance-scale-right",
            searchTerms: [ "justice", "legal", "measure", "unbalanced", "weight" ]
        }, {
            title: "fa-ban",
            searchTerms: [ "abort", "ban", "block", "cancel", "delete", "hide", "prohibit", "remove", "stop", "trash" ]
        }, {
            title: "fa-band-aid",
            searchTerms: [ "bandage", "boo boo", "first aid", "ouch" ]
        }, {
            title: "fa-barcode",
            searchTerms: [ "info", "laser", "price", "scan", "upc" ]
        }, {
            title: "fa-bars",
            searchTerms: [ "checklist", "drag", "hamburger", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "todo", "ul" ]
        }, {
            title: "fa-baseball-ball",
            searchTerms: [ "foul", "hardball", "league", "leather", "mlb", "softball", "sport" ]
        }, {
            title: "fa-basketball-ball",
            searchTerms: [ "dribble", "dunk", "hoop", "nba" ]
        }, {
            title: "fa-bath",
            searchTerms: [ "clean", "shower", "tub", "wash" ]
        }, {
            title: "fa-battery-empty",
            searchTerms: [ "charge", "dead", "power", "status" ]
        }, {
            title: "fa-battery-full",
            searchTerms: [ "charge", "power", "status" ]
        }, {
            title: "fa-battery-half",
            searchTerms: [ "charge", "power", "status" ]
        }, {
            title: "fa-battery-quarter",
            searchTerms: [ "charge", "low", "power", "status" ]
        }, {
            title: "fa-battery-three-quarters",
            searchTerms: [ "charge", "power", "status" ]
        }, {
            title: "fa-bed",
            searchTerms: [ "lodging", "mattress", "rest", "sleep", "travel" ]
        }, {
            title: "fa-beer",
            searchTerms: [ "alcohol", "ale", "bar", "beverage", "brewery", "drink", "lager", "liquor", "mug", "stein" ]
        }, {
            title: "fa-bell",
            searchTerms: [ "alarm", "alert", "chime", "notification", "reminder" ]
        }, {
            title: "fa-bell-slash",
            searchTerms: [ "alert", "cancel", "disabled", "notification", "off", "reminder" ]
        }, {
            title: "fa-bezier-curve",
            searchTerms: [ "curves", "illustrator", "lines", "path", "vector" ]
        }, {
            title: "fa-bible",
            searchTerms: [ "book", "catholicism", "christianity", "god", "holy" ]
        }, {
            title: "fa-bicycle",
            searchTerms: [ "bike", "gears", "pedal", "transportation", "vehicle" ]
        }, {
            title: "fa-biking",
            searchTerms: [ "bicycle", "bike", "cycle", "cycling", "ride", "wheel" ]
        }, {
            title: "fa-binoculars",
            searchTerms: [ "glasses", "magnify", "scenic", "spyglass", "view" ]
        }, {
            title: "fa-biohazard",
            searchTerms: [ "covid-19", "danger", "dangerous", "hazmat", "medical", "radioactive", "toxic", "waste", "zombie" ]
        }, {
            title: "fa-birthday-cake",
            searchTerms: [ "anniversary", "bakery", "candles", "celebration", "dessert", "frosting", "holiday", "party", "pastry" ]
        }, {
            title: "fa-blender",
            searchTerms: [ "cocktail", "milkshake", "mixer", "puree", "smoothie" ]
        }, {
            title: "fa-blender-phone",
            searchTerms: [ "appliance", "cocktail", "communication", "fantasy", "milkshake", "mixer", "puree", "silly", "smoothie" ]
        }, {
            title: "fa-blind",
            searchTerms: [ "cane", "disability", "person", "sight" ]
        }, {
            title: "fa-blog",
            searchTerms: [ "journal", "log", "online", "personal", "post", "web 2.0", "wordpress", "writing" ]
        }, {
            title: "fa-bold",
            searchTerms: [ "emphasis", "format", "text" ]
        }, {
            title: "fa-bolt",
            searchTerms: [ "electricity", "lightning", "weather", "zap" ]
        }, {
            title: "fa-bomb",
            searchTerms: [ "error", "explode", "fuse", "grenade", "warning" ]
        }, {
            title: "fa-bone",
            searchTerms: [ "calcium", "dog", "skeletal", "skeleton", "tibia" ]
        }, {
            title: "fa-bong",
            searchTerms: [ "aparatus", "cannabis", "marijuana", "pipe", "smoke", "smoking" ]
        }, {
            title: "fa-book",
            searchTerms: [ "diary", "documentation", "journal", "library", "read" ]
        }, {
            title: "fa-book-dead",
            searchTerms: [ "Dungeons & Dragons", "crossbones", "d&d", "dark arts", "death", "dnd", "documentation", "evil", "fantasy", "halloween", "holiday", "necronomicon", "read", "skull", "spell" ]
        }, {
            title: "fa-book-medical",
            searchTerms: [ "diary", "documentation", "health", "history", "journal", "library", "read", "record" ]
        }, {
            title: "fa-book-open",
            searchTerms: [ "flyer", "library", "notebook", "open book", "pamphlet", "reading" ]
        }, {
            title: "fa-book-reader",
            searchTerms: [ "flyer", "library", "notebook", "open book", "pamphlet", "reading" ]
        }, {
            title: "fa-bookmark",
            searchTerms: [ "favorite", "marker", "read", "remember", "save" ]
        }, {
            title: "fa-border-all",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fa-border-none",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fa-border-style",
            searchTerms: []
        }, {
            title: "fa-bowling-ball",
            searchTerms: [ "alley", "candlepin", "gutter", "lane", "strike", "tenpin" ]
        }, {
            title: "fa-box",
            searchTerms: [ "archive", "container", "package", "storage" ]
        }, {
            title: "fa-box-open",
            searchTerms: [ "archive", "container", "package", "storage", "unpack" ]
        }, {
            title: "fa-box-tissue",
            searchTerms: [ "cough", "covid-19", "kleenex", "mucus", "nose", "sneeze", "snot" ]
        }, {
            title: "fa-boxes",
            searchTerms: [ "archives", "inventory", "storage", "warehouse" ]
        }, {
            title: "fa-braille",
            searchTerms: [ "alphabet", "blind", "dots", "raised", "vision" ]
        }, {
            title: "fa-brain",
            searchTerms: [ "cerebellum", "gray matter", "intellect", "medulla oblongata", "mind", "noodle", "wit" ]
        }, {
            title: "fa-bread-slice",
            searchTerms: [ "bake", "bakery", "baking", "dough", "flour", "gluten", "grain", "sandwich", "sourdough", "toast", "wheat", "yeast" ]
        }, {
            title: "fa-briefcase",
            searchTerms: [ "bag", "business", "luggage", "office", "work" ]
        }, {
            title: "fa-briefcase-medical",
            searchTerms: [ "doctor", "emt", "first aid", "health" ]
        }, {
            title: "fa-broadcast-tower",
            searchTerms: [ "airwaves", "antenna", "radio", "reception", "waves" ]
        }, {
            title: "fa-broom",
            searchTerms: [ "clean", "firebolt", "fly", "halloween", "nimbus 2000", "quidditch", "sweep", "witch" ]
        }, {
            title: "fa-brush",
            searchTerms: [ "art", "bristles", "color", "handle", "paint" ]
        }, {
            title: "fa-bug",
            searchTerms: [ "beetle", "error", "insect", "report" ]
        }, {
            title: "fa-building",
            searchTerms: [ "apartment", "business", "city", "company", "office", "work" ]
        }, {
            title: "fa-bullhorn",
            searchTerms: [ "announcement", "broadcast", "louder", "megaphone", "share" ]
        }, {
            title: "fa-bullseye",
            searchTerms: [ "archery", "goal", "objective", "target" ]
        }, {
            title: "fa-burn",
            searchTerms: [ "caliente", "energy", "fire", "flame", "gas", "heat", "hot" ]
        }, {
            title: "fa-bus",
            searchTerms: [ "public transportation", "transportation", "travel", "vehicle" ]
        }, {
            title: "fa-bus-alt",
            searchTerms: [ "mta", "public transportation", "transportation", "travel", "vehicle" ]
        }, {
            title: "fa-business-time",
            searchTerms: [ "alarm", "briefcase", "business socks", "clock", "flight of the conchords", "reminder", "wednesday" ]
        }, {
            title: "fa-calculator",
            searchTerms: [ "abacus", "addition", "arithmetic", "counting", "math", "multiplication", "subtraction" ]
        }, {
            title: "fa-calendar",
            searchTerms: [ "calendar-o", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "fa-calendar-alt",
            searchTerms: [ "calendar", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "fa-calendar-check",
            searchTerms: [ "accept", "agree", "appointment", "confirm", "correct", "date", "done", "event", "ok", "schedule", "select", "success", "tick", "time", "todo", "when" ]
        }, {
            title: "fa-calendar-day",
            searchTerms: [ "date", "detail", "event", "focus", "schedule", "single day", "time", "today", "when" ]
        }, {
            title: "fa-calendar-minus",
            searchTerms: [ "calendar", "date", "delete", "event", "negative", "remove", "schedule", "time", "when" ]
        }, {
            title: "fa-calendar-plus",
            searchTerms: [ "add", "calendar", "create", "date", "event", "new", "positive", "schedule", "time", "when" ]
        }, {
            title: "fa-calendar-times",
            searchTerms: [ "archive", "calendar", "date", "delete", "event", "remove", "schedule", "time", "when", "x" ]
        }, {
            title: "fa-calendar-week",
            searchTerms: [ "date", "detail", "event", "focus", "schedule", "single week", "time", "today", "when" ]
        }, {
            title: "fa-camera",
            searchTerms: [ "image", "lens", "photo", "picture", "record", "shutter", "video" ]
        }, {
            title: "fa-camera-retro",
            searchTerms: [ "image", "lens", "photo", "picture", "record", "shutter", "video" ]
        }, {
            title: "fa-campground",
            searchTerms: [ "camping", "fall", "outdoors", "teepee", "tent", "tipi" ]
        }, {
            title: "fa-candy-cane",
            searchTerms: [ "candy", "christmas", "holiday", "mint", "peppermint", "striped", "xmas" ]
        }, {
            title: "fa-cannabis",
            searchTerms: [ "bud", "chronic", "drugs", "endica", "endo", "ganja", "marijuana", "mary jane", "pot", "reefer", "sativa", "spliff", "weed", "whacky-tabacky" ]
        }, {
            title: "fa-capsules",
            searchTerms: [ "drugs", "medicine", "pills", "prescription" ]
        }, {
            title: "fa-car",
            searchTerms: [ "auto", "automobile", "sedan", "transportation", "travel", "vehicle" ]
        }, {
            title: "fa-car-alt",
            searchTerms: [ "auto", "automobile", "sedan", "transportation", "travel", "vehicle" ]
        }, {
            title: "fa-car-battery",
            searchTerms: [ "auto", "electric", "mechanic", "power" ]
        }, {
            title: "fa-car-crash",
            searchTerms: [ "accident", "auto", "automobile", "insurance", "sedan", "transportation", "vehicle", "wreck" ]
        }, {
            title: "fa-car-side",
            searchTerms: [ "auto", "automobile", "sedan", "transportation", "travel", "vehicle" ]
        }, {
            title: "fa-caravan",
            searchTerms: [ "camper", "motor home", "rv", "trailer", "travel" ]
        }, {
            title: "fa-caret-down",
            searchTerms: [ "arrow", "dropdown", "expand", "menu", "more", "triangle" ]
        }, {
            title: "fa-caret-left",
            searchTerms: [ "arrow", "back", "previous", "triangle" ]
        }, {
            title: "fa-caret-right",
            searchTerms: [ "arrow", "forward", "next", "triangle" ]
        }, {
            title: "fa-caret-square-down",
            searchTerms: [ "arrow", "caret-square-o-down", "dropdown", "expand", "menu", "more", "triangle" ]
        }, {
            title: "fa-caret-square-left",
            searchTerms: [ "arrow", "back", "caret-square-o-left", "previous", "triangle" ]
        }, {
            title: "fa-caret-square-right",
            searchTerms: [ "arrow", "caret-square-o-right", "forward", "next", "triangle" ]
        }, {
            title: "fa-caret-square-up",
            searchTerms: [ "arrow", "caret-square-o-up", "collapse", "triangle", "upload" ]
        }, {
            title: "fa-caret-up",
            searchTerms: [ "arrow", "collapse", "triangle" ]
        }, {
            title: "fa-carrot",
            searchTerms: [ "bugs bunny", "orange", "vegan", "vegetable" ]
        }, {
            title: "fa-cart-arrow-down",
            searchTerms: [ "download", "save", "shopping" ]
        }, {
            title: "fa-cart-plus",
            searchTerms: [ "add", "create", "new", "positive", "shopping" ]
        }, {
            title: "fa-cash-register",
            searchTerms: [ "buy", "cha-ching", "change", "checkout", "commerce", "leaerboard", "machine", "pay", "payment", "purchase", "store" ]
        }, {
            title: "fa-cat",
            searchTerms: [ "feline", "halloween", "holiday", "kitten", "kitty", "meow", "pet" ]
        }, {
            title: "fa-certificate",
            searchTerms: [ "badge", "star", "verified" ]
        }, {
            title: "fa-chair",
            searchTerms: [ "furniture", "seat", "sit" ]
        }, {
            title: "fa-chalkboard",
            searchTerms: [ "blackboard", "learning", "school", "teaching", "whiteboard", "writing" ]
        }, {
            title: "fa-chalkboard-teacher",
            searchTerms: [ "blackboard", "instructor", "learning", "professor", "school", "whiteboard", "writing" ]
        }, {
            title: "fa-charging-station",
            searchTerms: [ "electric", "ev", "tesla", "vehicle" ]
        }, {
            title: "fa-chart-area",
            searchTerms: [ "analytics", "area", "chart", "graph" ]
        }, {
            title: "fa-chart-bar",
            searchTerms: [ "analytics", "bar", "chart", "graph" ]
        }, {
            title: "fa-chart-line",
            searchTerms: [ "activity", "analytics", "chart", "dashboard", "gain", "graph", "increase", "line" ]
        }, {
            title: "fa-chart-pie",
            searchTerms: [ "analytics", "chart", "diagram", "graph", "pie" ]
        }, {
            title: "fa-check",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "fa-check-circle",
            searchTerms: [ "accept", "agree", "confirm", "correct", "done", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "fa-check-double",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo" ]
        }, {
            title: "fa-check-square",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "fa-cheese",
            searchTerms: [ "cheddar", "curd", "gouda", "melt", "parmesan", "sandwich", "swiss", "wedge" ]
        }, {
            title: "fa-chess",
            searchTerms: [ "board", "castle", "checkmate", "game", "king", "rook", "strategy", "tournament" ]
        }, {
            title: "fa-chess-bishop",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fa-chess-board",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fa-chess-king",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fa-chess-knight",
            searchTerms: [ "board", "checkmate", "game", "horse", "strategy" ]
        }, {
            title: "fa-chess-pawn",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fa-chess-queen",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fa-chess-rook",
            searchTerms: [ "board", "castle", "checkmate", "game", "strategy" ]
        }, {
            title: "fa-chevron-circle-down",
            searchTerms: [ "arrow", "download", "dropdown", "menu", "more" ]
        }, {
            title: "fa-chevron-circle-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "fa-chevron-circle-right",
            searchTerms: [ "arrow", "forward", "next" ]
        }, {
            title: "fa-chevron-circle-up",
            searchTerms: [ "arrow", "collapse", "upload" ]
        }, {
            title: "fa-chevron-down",
            searchTerms: [ "arrow", "download", "expand" ]
        }, {
            title: "fa-chevron-left",
            searchTerms: [ "arrow", "back", "bracket", "previous" ]
        }, {
            title: "fa-chevron-right",
            searchTerms: [ "arrow", "bracket", "forward", "next" ]
        }, {
            title: "fa-chevron-up",
            searchTerms: [ "arrow", "collapse", "upload" ]
        }, {
            title: "fa-child",
            searchTerms: [ "boy", "girl", "kid", "toddler", "young" ]
        }, {
            title: "fa-church",
            searchTerms: [ "building", "cathedral", "chapel", "community", "religion" ]
        }, {
            title: "fa-circle",
            searchTerms: [ "circle-thin", "diameter", "dot", "ellipse", "notification", "round" ]
        }, {
            title: "fa-circle-notch",
            searchTerms: [ "circle-o-notch", "diameter", "dot", "ellipse", "round", "spinner" ]
        }, {
            title: "fa-city",
            searchTerms: [ "buildings", "busy", "skyscrapers", "urban", "windows" ]
        }, {
            title: "fa-clinic-medical",
            searchTerms: [ "covid-19", "doctor", "general practitioner", "hospital", "infirmary", "medicine", "office", "outpatient" ]
        }, {
            title: "fa-clipboard",
            searchTerms: [ "copy", "notes", "paste", "record" ]
        }, {
            title: "fa-clipboard-check",
            searchTerms: [ "accept", "agree", "confirm", "done", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "fa-clipboard-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "intinerary", "ol", "schedule", "tick", "todo", "ul" ]
        }, {
            title: "fa-clock",
            searchTerms: [ "date", "late", "schedule", "time", "timer", "timestamp", "watch" ]
        }, {
            title: "fa-clone",
            searchTerms: [ "arrange", "copy", "duplicate", "paste" ]
        }, {
            title: "fa-closed-captioning",
            searchTerms: [ "cc", "deaf", "hearing", "subtitle", "subtitling", "text", "video" ]
        }, {
            title: "fa-cloud",
            searchTerms: [ "atmosphere", "fog", "overcast", "save", "upload", "weather" ]
        }, {
            title: "fa-cloud-download-alt",
            searchTerms: [ "download", "export", "save" ]
        }, {
            title: "fa-cloud-meatball",
            searchTerms: [ "FLDSMDFR", "food", "spaghetti", "storm" ]
        }, {
            title: "fa-cloud-moon",
            searchTerms: [ "crescent", "evening", "lunar", "night", "partly cloudy", "sky" ]
        }, {
            title: "fa-cloud-moon-rain",
            searchTerms: [ "crescent", "evening", "lunar", "night", "partly cloudy", "precipitation", "rain", "sky", "storm" ]
        }, {
            title: "fa-cloud-rain",
            searchTerms: [ "precipitation", "rain", "sky", "storm" ]
        }, {
            title: "fa-cloud-showers-heavy",
            searchTerms: [ "precipitation", "rain", "sky", "storm" ]
        }, {
            title: "fa-cloud-sun",
            searchTerms: [ "clear", "day", "daytime", "fall", "outdoors", "overcast", "partly cloudy" ]
        }, {
            title: "fa-cloud-sun-rain",
            searchTerms: [ "day", "overcast", "precipitation", "storm", "summer", "sunshower" ]
        }, {
            title: "fa-cloud-upload-alt",
            searchTerms: [ "cloud-upload", "import", "save", "upload" ]
        }, {
            title: "fa-cocktail",
            searchTerms: [ "alcohol", "beverage", "drink", "gin", "glass", "margarita", "martini", "vodka" ]
        }, {
            title: "fa-code",
            searchTerms: [ "brackets", "code", "development", "html" ]
        }, {
            title: "fa-code-branch",
            searchTerms: [ "branch", "code-fork", "fork", "git", "github", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "fa-coffee",
            searchTerms: [ "beverage", "breakfast", "cafe", "drink", "fall", "morning", "mug", "seasonal", "tea" ]
        }, {
            title: "fa-cog",
            searchTerms: [ "gear", "mechanical", "settings", "sprocket", "wheel" ]
        }, {
            title: "fa-cogs",
            searchTerms: [ "gears", "mechanical", "settings", "sprocket", "wheel" ]
        }, {
            title: "fa-coins",
            searchTerms: [ "currency", "dime", "financial", "gold", "money", "penny" ]
        }, {
            title: "fa-columns",
            searchTerms: [ "browser", "dashboard", "organize", "panes", "split" ]
        }, {
            title: "fa-comment",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fa-comment-alt",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fa-comment-dollar",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "money", "note", "notification", "pay", "sms", "speech", "spend", "texting", "transfer" ]
        }, {
            title: "fa-comment-dots",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "more", "note", "notification", "reply", "sms", "speech", "texting" ]
        }, {
            title: "fa-comment-medical",
            searchTerms: [ "advice", "bubble", "chat", "commenting", "conversation", "diagnose", "feedback", "message", "note", "notification", "prescription", "sms", "speech", "texting" ]
        }, {
            title: "fa-comment-slash",
            searchTerms: [ "bubble", "cancel", "chat", "commenting", "conversation", "feedback", "message", "mute", "note", "notification", "quiet", "sms", "speech", "texting" ]
        }, {
            title: "fa-comments",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fa-comments-dollar",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "money", "note", "notification", "pay", "sms", "speech", "spend", "texting", "transfer" ]
        }, {
            title: "fa-compact-disc",
            searchTerms: [ "album", "bluray", "cd", "disc", "dvd", "media", "movie", "music", "record", "video", "vinyl" ]
        }, {
            title: "fa-compass",
            searchTerms: [ "directions", "directory", "location", "menu", "navigation", "safari", "travel" ]
        }, {
            title: "fa-compress",
            searchTerms: [ "collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller" ]
        }, {
            title: "fa-compress-alt",
            searchTerms: [ "collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller" ]
        }, {
            title: "fa-compress-arrows-alt",
            searchTerms: [ "collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller" ]
        }, {
            title: "fa-concierge-bell",
            searchTerms: [ "attention", "hotel", "receptionist", "service", "support" ]
        }, {
            title: "fa-cookie",
            searchTerms: [ "baked good", "chips", "chocolate", "eat", "snack", "sweet", "treat" ]
        }, {
            title: "fa-cookie-bite",
            searchTerms: [ "baked good", "bitten", "chips", "chocolate", "eat", "snack", "sweet", "treat" ]
        }, {
            title: "fa-copy",
            searchTerms: [ "clone", "duplicate", "file", "files-o", "paper", "paste" ]
        }, {
            title: "fa-copyright",
            searchTerms: [ "brand", "mark", "register", "trademark" ]
        }, {
            title: "fa-couch",
            searchTerms: [ "chair", "cushion", "furniture", "relax", "sofa" ]
        }, {
            title: "fa-credit-card",
            searchTerms: [ "buy", "checkout", "credit-card-alt", "debit", "money", "payment", "purchase" ]
        }, {
            title: "fa-crop",
            searchTerms: [ "design", "frame", "mask", "resize", "shrink" ]
        }, {
            title: "fa-crop-alt",
            searchTerms: [ "design", "frame", "mask", "resize", "shrink" ]
        }, {
            title: "fa-cross",
            searchTerms: [ "catholicism", "christianity", "church", "jesus" ]
        }, {
            title: "fa-crosshairs",
            searchTerms: [ "aim", "bullseye", "gpd", "picker", "position" ]
        }, {
            title: "fa-crow",
            searchTerms: [ "bird", "bullfrog", "fauna", "halloween", "holiday", "toad" ]
        }, {
            title: "fa-crown",
            searchTerms: [ "award", "favorite", "king", "queen", "royal", "tiara" ]
        }, {
            title: "fa-crutch",
            searchTerms: [ "cane", "injury", "mobility", "wheelchair" ]
        }, {
            title: "fa-cube",
            searchTerms: [ "3d", "block", "dice", "package", "square", "tesseract" ]
        }, {
            title: "fa-cubes",
            searchTerms: [ "3d", "block", "dice", "package", "pyramid", "square", "stack", "tesseract" ]
        }, {
            title: "fa-cut",
            searchTerms: [ "clip", "scissors", "snip" ]
        }, {
            title: "fa-database",
            searchTerms: [ "computer", "development", "directory", "memory", "storage" ]
        }, {
            title: "fa-deaf",
            searchTerms: [ "ear", "hearing", "sign language" ]
        }, {
            title: "fa-democrat",
            searchTerms: [ "american", "democratic party", "donkey", "election", "left", "left-wing", "liberal", "politics", "usa" ]
        }, {
            title: "fa-desktop",
            searchTerms: [ "computer", "cpu", "demo", "desktop", "device", "imac", "machine", "monitor", "pc", "screen" ]
        }, {
            title: "fa-dharmachakra",
            searchTerms: [ "buddhism", "buddhist", "wheel of dharma" ]
        }, {
            title: "fa-diagnoses",
            searchTerms: [ "analyze", "detect", "diagnosis", "examine", "medicine" ]
        }, {
            title: "fa-dice",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fa-dice-d20",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fa-dice-d6",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fa-dice-five",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fa-dice-four",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fa-dice-one",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fa-dice-six",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fa-dice-three",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fa-dice-two",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fa-digital-tachograph",
            searchTerms: [ "data", "distance", "speed", "tachometer" ]
        }, {
            title: "fa-directions",
            searchTerms: [ "map", "navigation", "sign", "turn" ]
        }, {
            title: "fa-disease",
            searchTerms: [ "bacteria", "cancer", "covid-19", "illness", "infection", "sickness", "virus" ]
        }, {
            title: "fa-divide",
            searchTerms: [ "arithmetic", "calculus", "division", "math" ]
        }, {
            title: "fa-dizzy",
            searchTerms: [ "dazed", "dead", "disapprove", "emoticon", "face" ]
        }, {
            title: "fa-dna",
            searchTerms: [ "double helix", "genetic", "helix", "molecule", "protein" ]
        }, {
            title: "fa-dog",
            searchTerms: [ "animal", "canine", "fauna", "mammal", "pet", "pooch", "puppy", "woof" ]
        }, {
            title: "fa-dollar-sign",
            searchTerms: [ "$", "cost", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "fa-dolly",
            searchTerms: [ "carry", "shipping", "transport" ]
        }, {
            title: "fa-dolly-flatbed",
            searchTerms: [ "carry", "inventory", "shipping", "transport" ]
        }, {
            title: "fa-donate",
            searchTerms: [ "contribute", "generosity", "gift", "give" ]
        }, {
            title: "fa-door-closed",
            searchTerms: [ "enter", "exit", "locked" ]
        }, {
            title: "fa-door-open",
            searchTerms: [ "enter", "exit", "welcome" ]
        }, {
            title: "fa-dot-circle",
            searchTerms: [ "bullseye", "notification", "target" ]
        }, {
            title: "fa-dove",
            searchTerms: [ "bird", "fauna", "flying", "peace", "war" ]
        }, {
            title: "fa-download",
            searchTerms: [ "export", "hard drive", "save", "transfer" ]
        }, {
            title: "fa-drafting-compass",
            searchTerms: [ "design", "map", "mechanical drawing", "plot", "plotting" ]
        }, {
            title: "fa-dragon",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "fire", "lizard", "serpent" ]
        }, {
            title: "fa-draw-polygon",
            searchTerms: [ "anchors", "lines", "object", "render", "shape" ]
        }, {
            title: "fa-drum",
            searchTerms: [ "instrument", "music", "percussion", "snare", "sound" ]
        }, {
            title: "fa-drum-steelpan",
            searchTerms: [ "calypso", "instrument", "music", "percussion", "reggae", "snare", "sound", "steel", "tropical" ]
        }, {
            title: "fa-drumstick-bite",
            searchTerms: [ "bone", "chicken", "leg", "meat", "poultry", "turkey" ]
        }, {
            title: "fa-dumbbell",
            searchTerms: [ "exercise", "gym", "strength", "weight", "weight-lifting" ]
        }, {
            title: "fa-dumpster",
            searchTerms: [ "alley", "bin", "commercial", "trash", "waste" ]
        }, {
            title: "fa-dumpster-fire",
            searchTerms: [ "alley", "bin", "commercial", "danger", "dangerous", "euphemism", "flame", "heat", "hot", "trash", "waste" ]
        }, {
            title: "fa-dungeon",
            searchTerms: [ "Dungeons & Dragons", "building", "d&d", "dnd", "door", "entrance", "fantasy", "gate" ]
        }, {
            title: "fa-edit",
            searchTerms: [ "edit", "pen", "pencil", "update", "write" ]
        }, {
            title: "fa-egg",
            searchTerms: [ "breakfast", "chicken", "easter", "shell", "yolk" ]
        }, {
            title: "fa-eject",
            searchTerms: [ "abort", "cancel", "cd", "discharge" ]
        }, {
            title: "fa-ellipsis-h",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fa-ellipsis-v",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fa-envelope",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fa-envelope-open",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fa-envelope-open-text",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fa-envelope-square",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fa-equals",
            searchTerms: [ "arithmetic", "even", "match", "math" ]
        }, {
            title: "fa-eraser",
            searchTerms: [ "art", "delete", "remove", "rubber" ]
        }, {
            title: "fa-ethernet",
            searchTerms: [ "cable", "cat 5", "cat 6", "connection", "hardware", "internet", "network", "wired" ]
        }, {
            title: "fa-euro-sign",
            searchTerms: [ "currency", "dollar", "exchange", "money" ]
        }, {
            title: "fa-exchange-alt",
            searchTerms: [ "arrow", "arrows", "exchange", "reciprocate", "return", "swap", "transfer" ]
        }, {
            title: "fa-exclamation",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fa-exclamation-circle",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fa-exclamation-triangle",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fa-expand",
            searchTerms: [ "arrow", "bigger", "enlarge", "resize" ]
        }, {
            title: "fa-expand-alt",
            searchTerms: [ "arrow", "bigger", "enlarge", "resize" ]
        }, {
            title: "fa-expand-arrows-alt",
            searchTerms: [ "arrows-alt", "bigger", "enlarge", "move", "resize" ]
        }, {
            title: "fa-external-link-alt",
            searchTerms: [ "external-link", "new", "open", "share" ]
        }, {
            title: "fa-external-link-square-alt",
            searchTerms: [ "external-link-square", "new", "open", "share" ]
        }, {
            title: "fa-eye",
            searchTerms: [ "look", "optic", "see", "seen", "show", "sight", "views", "visible" ]
        }, {
            title: "fa-eye-dropper",
            searchTerms: [ "beaker", "clone", "color", "copy", "eyedropper", "pipette" ]
        }, {
            title: "fa-eye-slash",
            searchTerms: [ "blind", "hide", "show", "toggle", "unseen", "views", "visible", "visiblity" ]
        }, {
            title: "fa-fan",
            searchTerms: [ "ac", "air conditioning", "blade", "blower", "cool", "hot" ]
        }, {
            title: "fa-fast-backward",
            searchTerms: [ "beginning", "first", "previous", "rewind", "start" ]
        }, {
            title: "fa-fast-forward",
            searchTerms: [ "end", "last", "next" ]
        }, {
            title: "fa-faucet",
            searchTerms: [ "covid-19", "drip", "house", "hygiene", "kitchen", "sink", "water" ]
        }, {
            title: "fa-fax",
            searchTerms: [ "business", "communicate", "copy", "facsimile", "send" ]
        }, {
            title: "fa-feather",
            searchTerms: [ "bird", "light", "plucked", "quill", "write" ]
        }, {
            title: "fa-feather-alt",
            searchTerms: [ "bird", "light", "plucked", "quill", "write" ]
        }, {
            title: "fa-female",
            searchTerms: [ "human", "person", "profile", "user", "woman" ]
        }, {
            title: "fa-fighter-jet",
            searchTerms: [ "airplane", "fast", "fly", "goose", "maverick", "plane", "quick", "top gun", "transportation", "travel" ]
        }, {
            title: "fa-file",
            searchTerms: [ "document", "new", "page", "pdf", "resume" ]
        }, {
            title: "fa-file-alt",
            searchTerms: [ "document", "file-text", "invoice", "new", "page", "pdf" ]
        }, {
            title: "fa-file-archive",
            searchTerms: [ ".zip", "bundle", "compress", "compression", "download", "zip" ]
        }, {
            title: "fa-file-audio",
            searchTerms: [ "document", "mp3", "music", "page", "play", "sound" ]
        }, {
            title: "fa-file-code",
            searchTerms: [ "css", "development", "document", "html" ]
        }, {
            title: "fa-file-contract",
            searchTerms: [ "agreement", "binding", "document", "legal", "signature" ]
        }, {
            title: "fa-file-csv",
            searchTerms: [ "document", "excel", "numbers", "spreadsheets", "table" ]
        }, {
            title: "fa-file-download",
            searchTerms: [ "document", "export", "save" ]
        }, {
            title: "fa-file-excel",
            searchTerms: [ "csv", "document", "numbers", "spreadsheets", "table" ]
        }, {
            title: "fa-file-export",
            searchTerms: [ "download", "save" ]
        }, {
            title: "fa-file-image",
            searchTerms: [ "document", "image", "jpg", "photo", "png" ]
        }, {
            title: "fa-file-import",
            searchTerms: [ "copy", "document", "send", "upload" ]
        }, {
            title: "fa-file-invoice",
            searchTerms: [ "account", "bill", "charge", "document", "payment", "receipt" ]
        }, {
            title: "fa-file-invoice-dollar",
            searchTerms: [ "$", "account", "bill", "charge", "document", "dollar-sign", "money", "payment", "receipt", "usd" ]
        }, {
            title: "fa-file-medical",
            searchTerms: [ "document", "health", "history", "prescription", "record" ]
        }, {
            title: "fa-file-medical-alt",
            searchTerms: [ "document", "health", "history", "prescription", "record" ]
        }, {
            title: "fa-file-pdf",
            searchTerms: [ "acrobat", "document", "preview", "save" ]
        }, {
            title: "fa-file-powerpoint",
            searchTerms: [ "display", "document", "keynote", "presentation" ]
        }, {
            title: "fa-file-prescription",
            searchTerms: [ "document", "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "fa-file-signature",
            searchTerms: [ "John Hancock", "contract", "document", "name" ]
        }, {
            title: "fa-file-upload",
            searchTerms: [ "document", "import", "page", "save" ]
        }, {
            title: "fa-file-video",
            searchTerms: [ "document", "m4v", "movie", "mp4", "play" ]
        }, {
            title: "fa-file-word",
            searchTerms: [ "document", "edit", "page", "text", "writing" ]
        }, {
            title: "fa-fill",
            searchTerms: [ "bucket", "color", "paint", "paint bucket" ]
        }, {
            title: "fa-fill-drip",
            searchTerms: [ "bucket", "color", "drop", "paint", "paint bucket", "spill" ]
        }, {
            title: "fa-film",
            searchTerms: [ "cinema", "movie", "strip", "video" ]
        }, {
            title: "fa-filter",
            searchTerms: [ "funnel", "options", "separate", "sort" ]
        }, {
            title: "fa-fingerprint",
            searchTerms: [ "human", "id", "identification", "lock", "smudge", "touch", "unique", "unlock" ]
        }, {
            title: "fa-fire",
            searchTerms: [ "burn", "caliente", "flame", "heat", "hot", "popular" ]
        }, {
            title: "fa-fire-alt",
            searchTerms: [ "burn", "caliente", "flame", "heat", "hot", "popular" ]
        }, {
            title: "fa-fire-extinguisher",
            searchTerms: [ "burn", "caliente", "fire fighter", "flame", "heat", "hot", "rescue" ]
        }, {
            title: "fa-first-aid",
            searchTerms: [ "emergency", "emt", "health", "medical", "rescue" ]
        }, {
            title: "fa-fish",
            searchTerms: [ "fauna", "gold", "seafood", "swimming" ]
        }, {
            title: "fa-fist-raised",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "hand", "ki", "monk", "resist", "strength", "unarmed combat" ]
        }, {
            title: "fa-flag",
            searchTerms: [ "country", "notice", "notification", "notify", "pole", "report", "symbol" ]
        }, {
            title: "fa-flag-checkered",
            searchTerms: [ "notice", "notification", "notify", "pole", "racing", "report", "symbol" ]
        }, {
            title: "fa-flag-usa",
            searchTerms: [ "betsy ross", "country", "old glory", "stars", "stripes", "symbol" ]
        }, {
            title: "fa-flask",
            searchTerms: [ "beaker", "experimental", "labs", "science" ]
        }, {
            title: "fa-flushed",
            searchTerms: [ "embarrassed", "emoticon", "face" ]
        }, {
            title: "fa-folder",
            searchTerms: [ "archive", "directory", "document", "file" ]
        }, {
            title: "fa-folder-minus",
            searchTerms: [ "archive", "delete", "directory", "document", "file", "negative", "remove" ]
        }, {
            title: "fa-folder-open",
            searchTerms: [ "archive", "directory", "document", "empty", "file", "new" ]
        }, {
            title: "fa-folder-plus",
            searchTerms: [ "add", "archive", "create", "directory", "document", "file", "new", "positive" ]
        }, {
            title: "fa-font",
            searchTerms: [ "alphabet", "glyph", "text", "type", "typeface" ]
        }, {
            title: "fa-font-awesome-logo-full",
            searchTerms: []
        }, {
            title: "fa-football-ball",
            searchTerms: [ "ball", "fall", "nfl", "pigskin", "seasonal" ]
        }, {
            title: "fa-forward",
            searchTerms: [ "forward", "next", "skip" ]
        }, {
            title: "fa-frog",
            searchTerms: [ "amphibian", "bullfrog", "fauna", "hop", "kermit", "kiss", "prince", "ribbit", "toad", "wart" ]
        }, {
            title: "fa-frown",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "fa-frown-open",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "fa-funnel-dollar",
            searchTerms: [ "filter", "money", "options", "separate", "sort" ]
        }, {
            title: "fa-futbol",
            searchTerms: [ "ball", "football", "mls", "soccer" ]
        }, {
            title: "fa-gamepad",
            searchTerms: [ "arcade", "controller", "d-pad", "joystick", "video", "video game" ]
        }, {
            title: "fa-gas-pump",
            searchTerms: [ "car", "fuel", "gasoline", "petrol" ]
        }, {
            title: "fa-gavel",
            searchTerms: [ "hammer", "judge", "law", "lawyer", "opinion" ]
        }, {
            title: "fa-gem",
            searchTerms: [ "diamond", "jewelry", "sapphire", "stone", "treasure" ]
        }, {
            title: "fa-genderless",
            searchTerms: [ "androgynous", "asexual", "sexless" ]
        }, {
            title: "fa-ghost",
            searchTerms: [ "apparition", "blinky", "clyde", "floating", "halloween", "holiday", "inky", "pinky", "spirit" ]
        }, {
            title: "fa-gift",
            searchTerms: [ "christmas", "generosity", "giving", "holiday", "party", "present", "wrapped", "xmas" ]
        }, {
            title: "fa-gifts",
            searchTerms: [ "christmas", "generosity", "giving", "holiday", "party", "present", "wrapped", "xmas" ]
        }, {
            title: "fa-glass-cheers",
            searchTerms: [ "alcohol", "bar", "beverage", "celebration", "champagne", "clink", "drink", "holiday", "new year's eve", "party", "toast" ]
        }, {
            title: "fa-glass-martini",
            searchTerms: [ "alcohol", "bar", "beverage", "drink", "liquor" ]
        }, {
            title: "fa-glass-martini-alt",
            searchTerms: [ "alcohol", "bar", "beverage", "drink", "liquor" ]
        }, {
            title: "fa-glass-whiskey",
            searchTerms: [ "alcohol", "bar", "beverage", "bourbon", "drink", "liquor", "neat", "rye", "scotch", "whisky" ]
        }, {
            title: "fa-glasses",
            searchTerms: [ "hipster", "nerd", "reading", "sight", "spectacles", "vision" ]
        }, {
            title: "fa-globe",
            searchTerms: [ "all", "coordinates", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fa-globe-africa",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fa-globe-americas",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fa-globe-asia",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fa-globe-europe",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fa-golf-ball",
            searchTerms: [ "caddy", "eagle", "putt", "tee" ]
        }, {
            title: "fa-gopuram",
            searchTerms: [ "building", "entrance", "hinduism", "temple", "tower" ]
        }, {
            title: "fa-graduation-cap",
            searchTerms: [ "ceremony", "college", "graduate", "learning", "school", "student" ]
        }, {
            title: "fa-greater-than",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "fa-greater-than-equal",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "fa-grimace",
            searchTerms: [ "cringe", "emoticon", "face", "teeth" ]
        }, {
            title: "fa-grin",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fa-grin-alt",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fa-grin-beam",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fa-grin-beam-sweat",
            searchTerms: [ "embarass", "emoticon", "face", "smile" ]
        }, {
            title: "fa-grin-hearts",
            searchTerms: [ "emoticon", "face", "love", "smile" ]
        }, {
            title: "fa-grin-squint",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fa-grin-squint-tears",
            searchTerms: [ "emoticon", "face", "happy", "smile" ]
        }, {
            title: "fa-grin-stars",
            searchTerms: [ "emoticon", "face", "star-struck" ]
        }, {
            title: "fa-grin-tears",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fa-grin-tongue",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fa-grin-tongue-squint",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fa-grin-tongue-wink",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fa-grin-wink",
            searchTerms: [ "emoticon", "face", "flirt", "laugh", "smile" ]
        }, {
            title: "fa-grip-horizontal",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fa-grip-lines",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fa-grip-lines-vertical",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fa-grip-vertical",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fa-guitar",
            searchTerms: [ "acoustic", "instrument", "music", "rock", "rock and roll", "song", "strings" ]
        }, {
            title: "fa-h-square",
            searchTerms: [ "directions", "emergency", "hospital", "hotel", "map" ]
        }, {
            title: "fa-hamburger",
            searchTerms: [ "bacon", "beef", "burger", "burger king", "cheeseburger", "fast food", "grill", "ground beef", "mcdonalds", "sandwich" ]
        }, {
            title: "fa-hammer",
            searchTerms: [ "admin", "fix", "repair", "settings", "tool" ]
        }, {
            title: "fa-hamsa",
            searchTerms: [ "amulet", "christianity", "islam", "jewish", "judaism", "muslim", "protection" ]
        }, {
            title: "fa-hand-holding",
            searchTerms: [ "carry", "lift" ]
        }, {
            title: "fa-hand-holding-heart",
            searchTerms: [ "carry", "charity", "gift", "lift", "package" ]
        }, {
            title: "fa-hand-holding-medical",
            searchTerms: [ "care", "covid-19", "donate", "help" ]
        }, {
            title: "fa-hand-holding-usd",
            searchTerms: [ "$", "carry", "dollar sign", "donation", "giving", "lift", "money", "price" ]
        }, {
            title: "fa-hand-holding-water",
            searchTerms: [ "carry", "covid-19", "drought", "grow", "lift" ]
        }, {
            title: "fa-hand-lizard",
            searchTerms: [ "game", "roshambo" ]
        }, {
            title: "fa-hand-middle-finger",
            searchTerms: [ "flip the bird", "gesture", "hate", "rude" ]
        }, {
            title: "fa-hand-paper",
            searchTerms: [ "game", "halt", "roshambo", "stop" ]
        }, {
            title: "fa-hand-peace",
            searchTerms: [ "rest", "truce" ]
        }, {
            title: "fa-hand-point-down",
            searchTerms: [ "finger", "hand-o-down", "point" ]
        }, {
            title: "fa-hand-point-left",
            searchTerms: [ "back", "finger", "hand-o-left", "left", "point", "previous" ]
        }, {
            title: "fa-hand-point-right",
            searchTerms: [ "finger", "forward", "hand-o-right", "next", "point", "right" ]
        }, {
            title: "fa-hand-point-up",
            searchTerms: [ "finger", "hand-o-up", "point" ]
        }, {
            title: "fa-hand-pointer",
            searchTerms: [ "arrow", "cursor", "select" ]
        }, {
            title: "fa-hand-rock",
            searchTerms: [ "fist", "game", "roshambo" ]
        }, {
            title: "fa-hand-scissors",
            searchTerms: [ "cut", "game", "roshambo" ]
        }, {
            title: "fa-hand-sparkles",
            searchTerms: [ "clean", "covid-19", "hygiene", "magic", "soap", "wash" ]
        }, {
            title: "fa-hand-spock",
            searchTerms: [ "live long", "prosper", "salute", "star trek", "vulcan" ]
        }, {
            title: "fa-hands",
            searchTerms: [ "carry", "hold", "lift" ]
        }, {
            title: "fa-hands-helping",
            searchTerms: [ "aid", "assistance", "handshake", "partnership", "volunteering" ]
        }, {
            title: "fa-hands-wash",
            searchTerms: [ "covid-19", "hygiene", "soap", "wash" ]
        }, {
            title: "fa-handshake",
            searchTerms: [ "agreement", "greeting", "meeting", "partnership" ]
        }, {
            title: "fa-handshake-alt-slash",
            searchTerms: [ "broken", "covid-19", "social distance" ]
        }, {
            title: "fa-handshake-slash",
            searchTerms: [ "broken", "covid-19", "social distance" ]
        }, {
            title: "fa-hanukiah",
            searchTerms: [ "candle", "hanukkah", "jewish", "judaism", "light" ]
        }, {
            title: "fa-hard-hat",
            searchTerms: [ "construction", "hardhat", "helmet", "safety" ]
        }, {
            title: "fa-hashtag",
            searchTerms: [ "Twitter", "instagram", "pound", "social media", "tag" ]
        }, {
            title: "fa-hat-cowboy",
            searchTerms: [ "buckaroo", "horse", "jackeroo", "john b.", "old west", "pardner", "ranch", "rancher", "rodeo", "western", "wrangler" ]
        }, {
            title: "fa-hat-cowboy-side",
            searchTerms: [ "buckaroo", "horse", "jackeroo", "john b.", "old west", "pardner", "ranch", "rancher", "rodeo", "western", "wrangler" ]
        }, {
            title: "fa-hat-wizard",
            searchTerms: [ "Dungeons & Dragons", "accessory", "buckle", "clothing", "d&d", "dnd", "fantasy", "halloween", "head", "holiday", "mage", "magic", "pointy", "witch" ]
        }, {
            title: "fa-hdd",
            searchTerms: [ "cpu", "hard drive", "harddrive", "machine", "save", "storage" ]
        }, {
            title: "fa-head-side-cough",
            searchTerms: [ "cough", "covid-19", "germs", "lungs", "respiratory", "sick" ]
        }, {
            title: "fa-head-side-cough-slash",
            searchTerms: [ "cough", "covid-19", "germs", "lungs", "respiratory", "sick" ]
        }, {
            title: "fa-head-side-mask",
            searchTerms: [ "breath", "covid-19", "filter", "respirator", "virus" ]
        }, {
            title: "fa-head-side-virus",
            searchTerms: [ "cold", "covid-19", "flu", "sick" ]
        }, {
            title: "fa-heading",
            searchTerms: [ "format", "header", "text", "title" ]
        }, {
            title: "fa-headphones",
            searchTerms: [ "audio", "listen", "music", "sound", "speaker" ]
        }, {
            title: "fa-headphones-alt",
            searchTerms: [ "audio", "listen", "music", "sound", "speaker" ]
        }, {
            title: "fa-headset",
            searchTerms: [ "audio", "gamer", "gaming", "listen", "live chat", "microphone", "shot caller", "sound", "support", "telemarketer" ]
        }, {
            title: "fa-heart",
            searchTerms: [ "favorite", "like", "love", "relationship", "valentine" ]
        }, {
            title: "fa-heart-broken",
            searchTerms: [ "breakup", "crushed", "dislike", "dumped", "grief", "love", "lovesick", "relationship", "sad" ]
        }, {
            title: "fa-heartbeat",
            searchTerms: [ "ekg", "electrocardiogram", "health", "lifeline", "vital signs" ]
        }, {
            title: "fa-helicopter",
            searchTerms: [ "airwolf", "apache", "chopper", "flight", "fly", "travel" ]
        }, {
            title: "fa-highlighter",
            searchTerms: [ "edit", "marker", "sharpie", "update", "write" ]
        }, {
            title: "fa-hiking",
            searchTerms: [ "activity", "backpack", "fall", "fitness", "outdoors", "person", "seasonal", "walking" ]
        }, {
            title: "fa-hippo",
            searchTerms: [ "animal", "fauna", "hippopotamus", "hungry", "mammal" ]
        }, {
            title: "fa-history",
            searchTerms: [ "Rewind", "clock", "reverse", "time", "time machine" ]
        }, {
            title: "fa-hockey-puck",
            searchTerms: [ "ice", "nhl", "sport" ]
        }, {
            title: "fa-holly-berry",
            searchTerms: [ "catwoman", "christmas", "decoration", "flora", "halle", "holiday", "ororo munroe", "plant", "storm", "xmas" ]
        }, {
            title: "fa-home",
            searchTerms: [ "abode", "building", "house", "main" ]
        }, {
            title: "fa-horse",
            searchTerms: [ "equus", "fauna", "mammmal", "mare", "neigh", "pony" ]
        }, {
            title: "fa-horse-head",
            searchTerms: [ "equus", "fauna", "mammmal", "mare", "neigh", "pony" ]
        }, {
            title: "fa-hospital",
            searchTerms: [ "building", "covid-19", "emergency room", "medical center" ]
        }, {
            title: "fa-hospital-alt",
            searchTerms: [ "building", "covid-19", "emergency room", "medical center" ]
        }, {
            title: "fa-hospital-symbol",
            searchTerms: [ "clinic", "covid-19", "emergency", "map" ]
        }, {
            title: "fa-hospital-user",
            searchTerms: [ "covid-19", "doctor", "network", "patient", "primary care" ]
        }, {
            title: "fa-hot-tub",
            searchTerms: [ "bath", "jacuzzi", "massage", "sauna", "spa" ]
        }, {
            title: "fa-hotdog",
            searchTerms: [ "bun", "chili", "frankfurt", "frankfurter", "kosher", "polish", "sandwich", "sausage", "vienna", "weiner" ]
        }, {
            title: "fa-hotel",
            searchTerms: [ "building", "inn", "lodging", "motel", "resort", "travel" ]
        }, {
            title: "fa-hourglass",
            searchTerms: [ "hour", "minute", "sand", "stopwatch", "time" ]
        }, {
            title: "fa-hourglass-end",
            searchTerms: [ "hour", "minute", "sand", "stopwatch", "time" ]
        }, {
            title: "fa-hourglass-half",
            searchTerms: [ "hour", "minute", "sand", "stopwatch", "time" ]
        }, {
            title: "fa-hourglass-start",
            searchTerms: [ "hour", "minute", "sand", "stopwatch", "time" ]
        }, {
            title: "fa-house-damage",
            searchTerms: [ "building", "devastation", "disaster", "home", "insurance" ]
        }, {
            title: "fa-house-user",
            searchTerms: [ "covid-19", "home", "isolation", "quarantine" ]
        }, {
            title: "fa-hryvnia",
            searchTerms: [ "currency", "money", "ukraine", "ukrainian" ]
        }, {
            title: "fa-i-cursor",
            searchTerms: [ "editing", "i-beam", "type", "writing" ]
        }, {
            title: "fa-ice-cream",
            searchTerms: [ "chocolate", "cone", "dessert", "frozen", "scoop", "sorbet", "vanilla", "yogurt" ]
        }, {
            title: "fa-icicles",
            searchTerms: [ "cold", "frozen", "hanging", "ice", "seasonal", "sharp" ]
        }, {
            title: "fa-icons",
            searchTerms: [ "bolt", "emoji", "heart", "image", "music", "photo", "symbols" ]
        }, {
            title: "fa-id-badge",
            searchTerms: [ "address", "contact", "identification", "license", "profile" ]
        }, {
            title: "fa-id-card",
            searchTerms: [ "contact", "demographics", "document", "identification", "issued", "profile" ]
        }, {
            title: "fa-id-card-alt",
            searchTerms: [ "contact", "demographics", "document", "identification", "issued", "profile" ]
        }, {
            title: "fa-igloo",
            searchTerms: [ "dome", "dwelling", "eskimo", "home", "house", "ice", "snow" ]
        }, {
            title: "fa-image",
            searchTerms: [ "album", "landscape", "photo", "picture" ]
        }, {
            title: "fa-images",
            searchTerms: [ "album", "landscape", "photo", "picture" ]
        }, {
            title: "fa-inbox",
            searchTerms: [ "archive", "desk", "email", "mail", "message" ]
        }, {
            title: "fa-indent",
            searchTerms: [ "align", "justify", "paragraph", "tab" ]
        }, {
            title: "fa-industry",
            searchTerms: [ "building", "factory", "industrial", "manufacturing", "mill", "warehouse" ]
        }, {
            title: "fa-infinity",
            searchTerms: [ "eternity", "forever", "math" ]
        }, {
            title: "fa-info",
            searchTerms: [ "details", "help", "information", "more", "support" ]
        }, {
            title: "fa-info-circle",
            searchTerms: [ "details", "help", "information", "more", "support" ]
        }, {
            title: "fa-italic",
            searchTerms: [ "edit", "emphasis", "font", "format", "text", "type" ]
        }, {
            title: "fa-jedi",
            searchTerms: [ "crest", "force", "sith", "skywalker", "star wars", "yoda" ]
        }, {
            title: "fa-joint",
            searchTerms: [ "blunt", "cannabis", "doobie", "drugs", "marijuana", "roach", "smoke", "smoking", "spliff" ]
        }, {
            title: "fa-journal-whills",
            searchTerms: [ "book", "force", "jedi", "sith", "star wars", "yoda" ]
        }, {
            title: "fa-kaaba",
            searchTerms: [ "building", "cube", "islam", "muslim" ]
        }, {
            title: "fa-key",
            searchTerms: [ "lock", "password", "private", "secret", "unlock" ]
        }, {
            title: "fa-keyboard",
            searchTerms: [ "accessory", "edit", "input", "text", "type", "write" ]
        }, {
            title: "fa-khanda",
            searchTerms: [ "chakkar", "sikh", "sikhism", "sword" ]
        }, {
            title: "fa-kiss",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fa-kiss-beam",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fa-kiss-wink-heart",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fa-kiwi-bird",
            searchTerms: [ "bird", "fauna", "new zealand" ]
        }, {
            title: "fa-landmark",
            searchTerms: [ "building", "historic", "memorable", "monument", "politics" ]
        }, {
            title: "fa-language",
            searchTerms: [ "dialect", "idiom", "localize", "speech", "translate", "vernacular" ]
        }, {
            title: "fa-laptop",
            searchTerms: [ "computer", "cpu", "dell", "demo", "device", "mac", "macbook", "machine", "pc" ]
        }, {
            title: "fa-laptop-code",
            searchTerms: [ "computer", "cpu", "dell", "demo", "develop", "device", "mac", "macbook", "machine", "pc" ]
        }, {
            title: "fa-laptop-house",
            searchTerms: [ "computer", "covid-19", "device", "office", "remote", "work from home" ]
        }, {
            title: "fa-laptop-medical",
            searchTerms: [ "computer", "device", "ehr", "electronic health records", "history" ]
        }, {
            title: "fa-laugh",
            searchTerms: [ "LOL", "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fa-laugh-beam",
            searchTerms: [ "LOL", "emoticon", "face", "happy", "smile" ]
        }, {
            title: "fa-laugh-squint",
            searchTerms: [ "LOL", "emoticon", "face", "happy", "smile" ]
        }, {
            title: "fa-laugh-wink",
            searchTerms: [ "LOL", "emoticon", "face", "happy", "smile" ]
        }, {
            title: "fa-layer-group",
            searchTerms: [ "arrange", "develop", "layers", "map", "stack" ]
        }, {
            title: "fa-leaf",
            searchTerms: [ "eco", "flora", "nature", "plant", "vegan" ]
        }, {
            title: "fa-lemon",
            searchTerms: [ "citrus", "lemonade", "lime", "tart" ]
        }, {
            title: "fa-less-than",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "fa-less-than-equal",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "fa-level-down-alt",
            searchTerms: [ "arrow", "level-down" ]
        }, {
            title: "fa-level-up-alt",
            searchTerms: [ "arrow", "level-up" ]
        }, {
            title: "fa-life-ring",
            searchTerms: [ "coast guard", "help", "overboard", "save", "support" ]
        }, {
            title: "fa-lightbulb",
            searchTerms: [ "energy", "idea", "inspiration", "light" ]
        }, {
            title: "fa-link",
            searchTerms: [ "attach", "attachment", "chain", "connect" ]
        }, {
            title: "fa-lira-sign",
            searchTerms: [ "currency", "money", "try", "turkish" ]
        }, {
            title: "fa-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fa-list-alt",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fa-list-ol",
            searchTerms: [ "checklist", "completed", "done", "finished", "numbers", "ol", "todo", "ul" ]
        }, {
            title: "fa-list-ul",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fa-location-arrow",
            searchTerms: [ "address", "compass", "coordinate", "direction", "gps", "map", "navigation", "place" ]
        }, {
            title: "fa-lock",
            searchTerms: [ "admin", "lock", "open", "password", "private", "protect", "security" ]
        }, {
            title: "fa-lock-open",
            searchTerms: [ "admin", "lock", "open", "password", "private", "protect", "security" ]
        }, {
            title: "fa-long-arrow-alt-down",
            searchTerms: [ "download", "long-arrow-down" ]
        }, {
            title: "fa-long-arrow-alt-left",
            searchTerms: [ "back", "long-arrow-left", "previous" ]
        }, {
            title: "fa-long-arrow-alt-right",
            searchTerms: [ "forward", "long-arrow-right", "next" ]
        }, {
            title: "fa-long-arrow-alt-up",
            searchTerms: [ "long-arrow-up", "upload" ]
        }, {
            title: "fa-low-vision",
            searchTerms: [ "blind", "eye", "sight" ]
        }, {
            title: "fa-luggage-cart",
            searchTerms: [ "bag", "baggage", "suitcase", "travel" ]
        }, {
            title: "fa-lungs",
            searchTerms: [ "air", "breath", "covid-19", "organ", "respiratory" ]
        }, {
            title: "fa-lungs-virus",
            searchTerms: [ "breath", "covid-19", "respiratory", "sick" ]
        }, {
            title: "fa-magic",
            searchTerms: [ "autocomplete", "automatic", "mage", "magic", "spell", "wand", "witch", "wizard" ]
        }, {
            title: "fa-magnet",
            searchTerms: [ "Attract", "lodestone", "tool" ]
        }, {
            title: "fa-mail-bulk",
            searchTerms: [ "archive", "envelope", "letter", "post office", "postal", "postcard", "send", "stamp", "usps" ]
        }, {
            title: "fa-male",
            searchTerms: [ "human", "man", "person", "profile", "user" ]
        }, {
            title: "fa-map",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "fa-map-marked",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "fa-map-marked-alt",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "fa-map-marker",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "fa-map-marker-alt",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "fa-map-pin",
            searchTerms: [ "address", "agree", "coordinates", "destination", "gps", "localize", "location", "map", "marker", "navigation", "pin", "place", "position", "travel" ]
        }, {
            title: "fa-map-signs",
            searchTerms: [ "directions", "directory", "map", "signage", "wayfinding" ]
        }, {
            title: "fa-marker",
            searchTerms: [ "design", "edit", "sharpie", "update", "write" ]
        }, {
            title: "fa-mars",
            searchTerms: [ "male" ]
        }, {
            title: "fa-mars-double",
            searchTerms: []
        }, {
            title: "fa-mars-stroke",
            searchTerms: []
        }, {
            title: "fa-mars-stroke-h",
            searchTerms: []
        }, {
            title: "fa-mars-stroke-v",
            searchTerms: []
        }, {
            title: "fa-mask",
            searchTerms: [ "carnivale", "costume", "disguise", "halloween", "secret", "super hero" ]
        }, {
            title: "fa-medal",
            searchTerms: [ "award", "ribbon", "star", "trophy" ]
        }, {
            title: "fa-medkit",
            searchTerms: [ "first aid", "firstaid", "health", "help", "support" ]
        }, {
            title: "fa-meh",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fa-meh-blank",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fa-meh-rolling-eyes",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fa-memory",
            searchTerms: [ "DIMM", "RAM", "hardware", "storage", "technology" ]
        }, {
            title: "fa-menorah",
            searchTerms: [ "candle", "hanukkah", "jewish", "judaism", "light" ]
        }, {
            title: "fa-mercury",
            searchTerms: [ "transgender" ]
        }, {
            title: "fa-meteor",
            searchTerms: [ "armageddon", "asteroid", "comet", "shooting star", "space" ]
        }, {
            title: "fa-microchip",
            searchTerms: [ "cpu", "hardware", "processor", "technology" ]
        }, {
            title: "fa-microphone",
            searchTerms: [ "audio", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "fa-microphone-alt",
            searchTerms: [ "audio", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "fa-microphone-alt-slash",
            searchTerms: [ "audio", "disable", "mute", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "fa-microphone-slash",
            searchTerms: [ "audio", "disable", "mute", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "fa-microscope",
            searchTerms: [ "covid-19", "electron", "lens", "optics", "science", "shrink" ]
        }, {
            title: "fa-minus",
            searchTerms: [ "collapse", "delete", "hide", "minify", "negative", "remove", "trash" ]
        }, {
            title: "fa-minus-circle",
            searchTerms: [ "delete", "hide", "negative", "remove", "shape", "trash" ]
        }, {
            title: "fa-minus-square",
            searchTerms: [ "collapse", "delete", "hide", "minify", "negative", "remove", "shape", "trash" ]
        }, {
            title: "fa-mitten",
            searchTerms: [ "clothing", "cold", "glove", "hands", "knitted", "seasonal", "warmth" ]
        }, {
            title: "fa-mobile",
            searchTerms: [ "apple", "call", "cell phone", "cellphone", "device", "iphone", "number", "screen", "telephone" ]
        }, {
            title: "fa-mobile-alt",
            searchTerms: [ "apple", "call", "cell phone", "cellphone", "device", "iphone", "number", "screen", "telephone" ]
        }, {
            title: "fa-money-bill",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fa-money-bill-alt",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fa-money-bill-wave",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fa-money-bill-wave-alt",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fa-money-check",
            searchTerms: [ "bank check", "buy", "checkout", "cheque", "money", "payment", "price", "purchase" ]
        }, {
            title: "fa-money-check-alt",
            searchTerms: [ "bank check", "buy", "checkout", "cheque", "money", "payment", "price", "purchase" ]
        }, {
            title: "fa-monument",
            searchTerms: [ "building", "historic", "landmark", "memorable" ]
        }, {
            title: "fa-moon",
            searchTerms: [ "contrast", "crescent", "dark", "lunar", "night" ]
        }, {
            title: "fa-mortar-pestle",
            searchTerms: [ "crush", "culinary", "grind", "medical", "mix", "pharmacy", "prescription", "spices" ]
        }, {
            title: "fa-mosque",
            searchTerms: [ "building", "islam", "landmark", "muslim" ]
        }, {
            title: "fa-motorcycle",
            searchTerms: [ "bike", "machine", "transportation", "vehicle" ]
        }, {
            title: "fa-mountain",
            searchTerms: [ "glacier", "hiking", "hill", "landscape", "travel", "view" ]
        }, {
            title: "fa-mouse",
            searchTerms: [ "click", "computer", "cursor", "input", "peripheral" ]
        }, {
            title: "fa-mouse-pointer",
            searchTerms: [ "arrow", "cursor", "select" ]
        }, {
            title: "fa-mug-hot",
            searchTerms: [ "caliente", "cocoa", "coffee", "cup", "drink", "holiday", "hot chocolate", "steam", "tea", "warmth" ]
        }, {
            title: "fa-music",
            searchTerms: [ "lyrics", "melody", "note", "sing", "sound" ]
        }, {
            title: "fa-network-wired",
            searchTerms: [ "computer", "connect", "ethernet", "internet", "intranet" ]
        }, {
            title: "fa-neuter",
            searchTerms: []
        }, {
            title: "fa-newspaper",
            searchTerms: [ "article", "editorial", "headline", "journal", "journalism", "news", "press" ]
        }, {
            title: "fa-not-equal",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "fa-notes-medical",
            searchTerms: [ "clipboard", "doctor", "ehr", "health", "history", "records" ]
        }, {
            title: "fa-object-group",
            searchTerms: [ "combine", "copy", "design", "merge", "select" ]
        }, {
            title: "fa-object-ungroup",
            searchTerms: [ "copy", "design", "merge", "select", "separate" ]
        }, {
            title: "fa-oil-can",
            searchTerms: [ "auto", "crude", "gasoline", "grease", "lubricate", "petroleum" ]
        }, {
            title: "fa-om",
            searchTerms: [ "buddhism", "hinduism", "jainism", "mantra" ]
        }, {
            title: "fa-otter",
            searchTerms: [ "animal", "badger", "fauna", "fur", "mammal", "marten" ]
        }, {
            title: "fa-outdent",
            searchTerms: [ "align", "justify", "paragraph", "tab" ]
        }, {
            title: "fa-pager",
            searchTerms: [ "beeper", "cellphone", "communication" ]
        }, {
            title: "fa-paint-brush",
            searchTerms: [ "acrylic", "art", "brush", "color", "fill", "paint", "pigment", "watercolor" ]
        }, {
            title: "fa-paint-roller",
            searchTerms: [ "acrylic", "art", "brush", "color", "fill", "paint", "pigment", "watercolor" ]
        }, {
            title: "fa-palette",
            searchTerms: [ "acrylic", "art", "brush", "color", "fill", "paint", "pigment", "watercolor" ]
        }, {
            title: "fa-pallet",
            searchTerms: [ "archive", "box", "inventory", "shipping", "warehouse" ]
        }, {
            title: "fa-paper-plane",
            searchTerms: [ "air", "float", "fold", "mail", "paper", "send" ]
        }, {
            title: "fa-paperclip",
            searchTerms: [ "attach", "attachment", "connect", "link" ]
        }, {
            title: "fa-parachute-box",
            searchTerms: [ "aid", "assistance", "rescue", "supplies" ]
        }, {
            title: "fa-paragraph",
            searchTerms: [ "edit", "format", "text", "writing" ]
        }, {
            title: "fa-parking",
            searchTerms: [ "auto", "car", "garage", "meter" ]
        }, {
            title: "fa-passport",
            searchTerms: [ "document", "id", "identification", "issued", "travel" ]
        }, {
            title: "fa-pastafarianism",
            searchTerms: [ "agnosticism", "atheism", "flying spaghetti monster", "fsm" ]
        }, {
            title: "fa-paste",
            searchTerms: [ "clipboard", "copy", "document", "paper" ]
        }, {
            title: "fa-pause",
            searchTerms: [ "hold", "wait" ]
        }, {
            title: "fa-pause-circle",
            searchTerms: [ "hold", "wait" ]
        }, {
            title: "fa-paw",
            searchTerms: [ "animal", "cat", "dog", "pet", "print" ]
        }, {
            title: "fa-peace",
            searchTerms: [ "serenity", "tranquility", "truce", "war" ]
        }, {
            title: "fa-pen",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fa-pen-alt",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fa-pen-fancy",
            searchTerms: [ "design", "edit", "fountain pen", "update", "write" ]
        }, {
            title: "fa-pen-nib",
            searchTerms: [ "design", "edit", "fountain pen", "update", "write" ]
        }, {
            title: "fa-pen-square",
            searchTerms: [ "edit", "pencil-square", "update", "write" ]
        }, {
            title: "fa-pencil-alt",
            searchTerms: [ "design", "edit", "pencil", "update", "write" ]
        }, {
            title: "fa-pencil-ruler",
            searchTerms: [ "design", "draft", "draw", "pencil" ]
        }, {
            title: "fa-people-arrows",
            searchTerms: [ "covid-19", "personal space", "social distance", "space", "spread", "users" ]
        }, {
            title: "fa-people-carry",
            searchTerms: [ "box", "carry", "fragile", "help", "movers", "package" ]
        }, {
            title: "fa-pepper-hot",
            searchTerms: [ "buffalo wings", "capsicum", "chili", "chilli", "habanero", "jalapeno", "mexican", "spicy", "tabasco", "vegetable" ]
        }, {
            title: "fa-percent",
            searchTerms: [ "discount", "fraction", "proportion", "rate", "ratio" ]
        }, {
            title: "fa-percentage",
            searchTerms: [ "discount", "fraction", "proportion", "rate", "ratio" ]
        }, {
            title: "fa-person-booth",
            searchTerms: [ "changing", "changing room", "election", "human", "person", "vote", "voting" ]
        }, {
            title: "fa-phone",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "fa-phone-alt",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "fa-phone-slash",
            searchTerms: [ "call", "cancel", "earphone", "mute", "number", "support", "telephone", "voice" ]
        }, {
            title: "fa-phone-square",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "fa-phone-square-alt",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "fa-phone-volume",
            searchTerms: [ "call", "earphone", "number", "sound", "support", "telephone", "voice", "volume-control-phone" ]
        }, {
            title: "fa-photo-video",
            searchTerms: [ "av", "film", "image", "library", "media" ]
        }, {
            title: "fa-piggy-bank",
            searchTerms: [ "bank", "save", "savings" ]
        }, {
            title: "fa-pills",
            searchTerms: [ "drugs", "medicine", "prescription", "tablets" ]
        }, {
            title: "fa-pizza-slice",
            searchTerms: [ "cheese", "chicago", "italian", "mozzarella", "new york", "pepperoni", "pie", "slice", "teenage mutant ninja turtles", "tomato" ]
        }, {
            title: "fa-place-of-worship",
            searchTerms: [ "building", "church", "holy", "mosque", "synagogue" ]
        }, {
            title: "fa-plane",
            searchTerms: [ "airplane", "destination", "fly", "location", "mode", "travel", "trip" ]
        }, {
            title: "fa-plane-arrival",
            searchTerms: [ "airplane", "arriving", "destination", "fly", "land", "landing", "location", "mode", "travel", "trip" ]
        }, {
            title: "fa-plane-departure",
            searchTerms: [ "airplane", "departing", "destination", "fly", "location", "mode", "take off", "taking off", "travel", "trip" ]
        }, {
            title: "fa-plane-slash",
            searchTerms: [ "airplane mode", "canceled", "covid-19", "delayed", "grounded", "travel" ]
        }, {
            title: "fa-play",
            searchTerms: [ "audio", "music", "playing", "sound", "start", "video" ]
        }, {
            title: "fa-play-circle",
            searchTerms: [ "audio", "music", "playing", "sound", "start", "video" ]
        }, {
            title: "fa-plug",
            searchTerms: [ "connect", "electric", "online", "power" ]
        }, {
            title: "fa-plus",
            searchTerms: [ "add", "create", "expand", "new", "positive", "shape" ]
        }, {
            title: "fa-plus-circle",
            searchTerms: [ "add", "create", "expand", "new", "positive", "shape" ]
        }, {
            title: "fa-plus-square",
            searchTerms: [ "add", "create", "expand", "new", "positive", "shape" ]
        }, {
            title: "fa-podcast",
            searchTerms: [ "audio", "broadcast", "music", "sound" ]
        }, {
            title: "fa-poll",
            searchTerms: [ "results", "survey", "trend", "vote", "voting" ]
        }, {
            title: "fa-poll-h",
            searchTerms: [ "results", "survey", "trend", "vote", "voting" ]
        }, {
            title: "fa-poo",
            searchTerms: [ "crap", "poop", "shit", "smile", "turd" ]
        }, {
            title: "fa-poo-storm",
            searchTerms: [ "bolt", "cloud", "euphemism", "lightning", "mess", "poop", "shit", "turd" ]
        }, {
            title: "fa-poop",
            searchTerms: [ "crap", "poop", "shit", "smile", "turd" ]
        }, {
            title: "fa-portrait",
            searchTerms: [ "id", "image", "photo", "picture", "selfie" ]
        }, {
            title: "fa-pound-sign",
            searchTerms: [ "currency", "gbp", "money" ]
        }, {
            title: "fa-power-off",
            searchTerms: [ "cancel", "computer", "on", "reboot", "restart" ]
        }, {
            title: "fa-pray",
            searchTerms: [ "kneel", "preach", "religion", "worship" ]
        }, {
            title: "fa-praying-hands",
            searchTerms: [ "kneel", "preach", "religion", "worship" ]
        }, {
            title: "fa-prescription",
            searchTerms: [ "drugs", "medical", "medicine", "pharmacy", "rx" ]
        }, {
            title: "fa-prescription-bottle",
            searchTerms: [ "drugs", "medical", "medicine", "pharmacy", "rx" ]
        }, {
            title: "fa-prescription-bottle-alt",
            searchTerms: [ "drugs", "medical", "medicine", "pharmacy", "rx" ]
        }, {
            title: "fa-print",
            searchTerms: [ "business", "copy", "document", "office", "paper" ]
        }, {
            title: "fa-procedures",
            searchTerms: [ "EKG", "bed", "electrocardiogram", "health", "hospital", "life", "patient", "vital" ]
        }, {
            title: "fa-project-diagram",
            searchTerms: [ "chart", "graph", "network", "pert" ]
        }, {
            title: "fa-pump-medical",
            searchTerms: [ "anti-bacterial", "clean", "covid-19", "disinfect", "hygiene", "medical grade", "sanitizer", "soap" ]
        }, {
            title: "fa-pump-soap",
            searchTerms: [ "anti-bacterial", "clean", "covid-19", "disinfect", "hygiene", "sanitizer", "soap" ]
        }, {
            title: "fa-puzzle-piece",
            searchTerms: [ "add-on", "addon", "game", "section" ]
        }, {
            title: "fa-qrcode",
            searchTerms: [ "barcode", "info", "information", "scan" ]
        }, {
            title: "fa-question",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fa-question-circle",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fa-quidditch",
            searchTerms: [ "ball", "bludger", "broom", "golden snitch", "harry potter", "hogwarts", "quaffle", "sport", "wizard" ]
        }, {
            title: "fa-quote-left",
            searchTerms: [ "mention", "note", "phrase", "text", "type" ]
        }, {
            title: "fa-quote-right",
            searchTerms: [ "mention", "note", "phrase", "text", "type" ]
        }, {
            title: "fa-quran",
            searchTerms: [ "book", "islam", "muslim", "religion" ]
        }, {
            title: "fa-radiation",
            searchTerms: [ "danger", "dangerous", "deadly", "hazard", "nuclear", "radioactive", "warning" ]
        }, {
            title: "fa-radiation-alt",
            searchTerms: [ "danger", "dangerous", "deadly", "hazard", "nuclear", "radioactive", "warning" ]
        }, {
            title: "fa-rainbow",
            searchTerms: [ "gold", "leprechaun", "prism", "rain", "sky" ]
        }, {
            title: "fa-random",
            searchTerms: [ "arrows", "shuffle", "sort", "swap", "switch", "transfer" ]
        }, {
            title: "fa-receipt",
            searchTerms: [ "check", "invoice", "money", "pay", "table" ]
        }, {
            title: "fa-record-vinyl",
            searchTerms: [ "LP", "album", "analog", "music", "phonograph", "sound" ]
        }, {
            title: "fa-recycle",
            searchTerms: [ "Waste", "compost", "garbage", "reuse", "trash" ]
        }, {
            title: "fa-redo",
            searchTerms: [ "forward", "refresh", "reload", "repeat" ]
        }, {
            title: "fa-redo-alt",
            searchTerms: [ "forward", "refresh", "reload", "repeat" ]
        }, {
            title: "fa-registered",
            searchTerms: [ "copyright", "mark", "trademark" ]
        }, {
            title: "fa-remove-format",
            searchTerms: [ "cancel", "font", "format", "remove", "style", "text" ]
        }, {
            title: "fa-reply",
            searchTerms: [ "mail", "message", "respond" ]
        }, {
            title: "fa-reply-all",
            searchTerms: [ "mail", "message", "respond" ]
        }, {
            title: "fa-republican",
            searchTerms: [ "american", "conservative", "election", "elephant", "politics", "republican party", "right", "right-wing", "usa" ]
        }, {
            title: "fa-restroom",
            searchTerms: [ "bathroom", "john", "loo", "potty", "washroom", "waste", "wc" ]
        }, {
            title: "fa-retweet",
            searchTerms: [ "refresh", "reload", "share", "swap" ]
        }, {
            title: "fa-ribbon",
            searchTerms: [ "badge", "cause", "lapel", "pin" ]
        }, {
            title: "fa-ring",
            searchTerms: [ "Dungeons & Dragons", "Gollum", "band", "binding", "d&d", "dnd", "engagement", "fantasy", "gold", "jewelry", "marriage", "precious" ]
        }, {
            title: "fa-road",
            searchTerms: [ "highway", "map", "pavement", "route", "street", "travel" ]
        }, {
            title: "fa-robot",
            searchTerms: [ "android", "automate", "computer", "cyborg" ]
        }, {
            title: "fa-rocket",
            searchTerms: [ "aircraft", "app", "jet", "launch", "nasa", "space" ]
        }, {
            title: "fa-route",
            searchTerms: [ "directions", "navigation", "travel" ]
        }, {
            title: "fa-rss",
            searchTerms: [ "blog", "feed", "journal", "news", "writing" ]
        }, {
            title: "fa-rss-square",
            searchTerms: [ "blog", "feed", "journal", "news", "writing" ]
        }, {
            title: "fa-ruble-sign",
            searchTerms: [ "currency", "money", "rub" ]
        }, {
            title: "fa-ruler",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "fa-ruler-combined",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "fa-ruler-horizontal",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "fa-ruler-vertical",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "fa-running",
            searchTerms: [ "exercise", "health", "jog", "person", "run", "sport", "sprint" ]
        }, {
            title: "fa-rupee-sign",
            searchTerms: [ "currency", "indian", "inr", "money" ]
        }, {
            title: "fa-sad-cry",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "fa-sad-tear",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "fa-satellite",
            searchTerms: [ "communications", "hardware", "orbit", "space" ]
        }, {
            title: "fa-satellite-dish",
            searchTerms: [ "SETI", "communications", "hardware", "receiver", "saucer", "signal", "space" ]
        }, {
            title: "fa-save",
            searchTerms: [ "disk", "download", "floppy", "floppy-o" ]
        }, {
            title: "fa-school",
            searchTerms: [ "building", "education", "learn", "student", "teacher" ]
        }, {
            title: "fa-screwdriver",
            searchTerms: [ "admin", "fix", "mechanic", "repair", "settings", "tool" ]
        }, {
            title: "fa-scroll",
            searchTerms: [ "Dungeons & Dragons", "announcement", "d&d", "dnd", "fantasy", "paper", "script" ]
        }, {
            title: "fa-sd-card",
            searchTerms: [ "image", "memory", "photo", "save" ]
        }, {
            title: "fa-search",
            searchTerms: [ "bigger", "enlarge", "find", "magnify", "preview", "zoom" ]
        }, {
            title: "fa-search-dollar",
            searchTerms: [ "bigger", "enlarge", "find", "magnify", "money", "preview", "zoom" ]
        }, {
            title: "fa-search-location",
            searchTerms: [ "bigger", "enlarge", "find", "magnify", "preview", "zoom" ]
        }, {
            title: "fa-search-minus",
            searchTerms: [ "minify", "negative", "smaller", "zoom", "zoom out" ]
        }, {
            title: "fa-search-plus",
            searchTerms: [ "bigger", "enlarge", "magnify", "positive", "zoom", "zoom in" ]
        }, {
            title: "fa-seedling",
            searchTerms: [ "flora", "grow", "plant", "vegan" ]
        }, {
            title: "fa-server",
            searchTerms: [ "computer", "cpu", "database", "hardware", "network" ]
        }, {
            title: "fa-shapes",
            searchTerms: [ "blocks", "build", "circle", "square", "triangle" ]
        }, {
            title: "fa-share",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "fa-share-alt",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "fa-share-alt-square",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "fa-share-square",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "fa-shekel-sign",
            searchTerms: [ "currency", "ils", "money" ]
        }, {
            title: "fa-shield-alt",
            searchTerms: [ "achievement", "award", "block", "defend", "security", "winner" ]
        }, {
            title: "fa-shield-virus",
            searchTerms: [ "antibodies", "barrier", "covid-19", "health", "protect" ]
        }, {
            title: "fa-ship",
            searchTerms: [ "boat", "sea", "water" ]
        }, {
            title: "fa-shipping-fast",
            searchTerms: [ "express", "fedex", "mail", "overnight", "package", "ups" ]
        }, {
            title: "fa-shoe-prints",
            searchTerms: [ "feet", "footprints", "steps", "walk" ]
        }, {
            title: "fa-shopping-bag",
            searchTerms: [ "buy", "checkout", "grocery", "payment", "purchase" ]
        }, {
            title: "fa-shopping-basket",
            searchTerms: [ "buy", "checkout", "grocery", "payment", "purchase" ]
        }, {
            title: "fa-shopping-cart",
            searchTerms: [ "buy", "checkout", "grocery", "payment", "purchase" ]
        }, {
            title: "fa-shower",
            searchTerms: [ "bath", "clean", "faucet", "water" ]
        }, {
            title: "fa-shuttle-van",
            searchTerms: [ "airport", "machine", "public-transportation", "transportation", "travel", "vehicle" ]
        }, {
            title: "fa-sign",
            searchTerms: [ "directions", "real estate", "signage", "wayfinding" ]
        }, {
            title: "fa-sign-in-alt",
            searchTerms: [ "arrow", "enter", "join", "log in", "login", "sign in", "sign up", "sign-in", "signin", "signup" ]
        }, {
            title: "fa-sign-language",
            searchTerms: [ "Translate", "asl", "deaf", "hands" ]
        }, {
            title: "fa-sign-out-alt",
            searchTerms: [ "arrow", "exit", "leave", "log out", "logout", "sign-out" ]
        }, {
            title: "fa-signal",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fa-signature",
            searchTerms: [ "John Hancock", "cursive", "name", "writing" ]
        }, {
            title: "fa-sim-card",
            searchTerms: [ "hard drive", "hardware", "portable", "storage", "technology", "tiny" ]
        }, {
            title: "fa-sitemap",
            searchTerms: [ "directory", "hierarchy", "ia", "information architecture", "organization" ]
        }, {
            title: "fa-skating",
            searchTerms: [ "activity", "figure skating", "fitness", "ice", "person", "winter" ]
        }, {
            title: "fa-skiing",
            searchTerms: [ "activity", "downhill", "fast", "fitness", "olympics", "outdoors", "person", "seasonal", "slalom" ]
        }, {
            title: "fa-skiing-nordic",
            searchTerms: [ "activity", "cross country", "fitness", "outdoors", "person", "seasonal" ]
        }, {
            title: "fa-skull",
            searchTerms: [ "bones", "skeleton", "x-ray", "yorick" ]
        }, {
            title: "fa-skull-crossbones",
            searchTerms: [ "Dungeons & Dragons", "alert", "bones", "d&d", "danger", "dead", "deadly", "death", "dnd", "fantasy", "halloween", "holiday", "jolly-roger", "pirate", "poison", "skeleton", "warning" ]
        }, {
            title: "fa-slash",
            searchTerms: [ "cancel", "close", "mute", "off", "stop", "x" ]
        }, {
            title: "fa-sleigh",
            searchTerms: [ "christmas", "claus", "fly", "holiday", "santa", "sled", "snow", "xmas" ]
        }, {
            title: "fa-sliders-h",
            searchTerms: [ "adjust", "settings", "sliders", "toggle" ]
        }, {
            title: "fa-smile",
            searchTerms: [ "approve", "emoticon", "face", "happy", "rating", "satisfied" ]
        }, {
            title: "fa-smile-beam",
            searchTerms: [ "emoticon", "face", "happy", "positive" ]
        }, {
            title: "fa-smile-wink",
            searchTerms: [ "emoticon", "face", "happy", "hint", "joke" ]
        }, {
            title: "fa-smog",
            searchTerms: [ "dragon", "fog", "haze", "pollution", "smoke", "weather" ]
        }, {
            title: "fa-smoking",
            searchTerms: [ "cancer", "cigarette", "nicotine", "smoking status", "tobacco" ]
        }, {
            title: "fa-smoking-ban",
            searchTerms: [ "ban", "cancel", "no smoking", "non-smoking" ]
        }, {
            title: "fa-sms",
            searchTerms: [ "chat", "conversation", "message", "mobile", "notification", "phone", "sms", "texting" ]
        }, {
            title: "fa-snowboarding",
            searchTerms: [ "activity", "fitness", "olympics", "outdoors", "person" ]
        }, {
            title: "fa-snowflake",
            searchTerms: [ "precipitation", "rain", "winter" ]
        }, {
            title: "fa-snowman",
            searchTerms: [ "decoration", "frost", "frosty", "holiday" ]
        }, {
            title: "fa-snowplow",
            searchTerms: [ "clean up", "cold", "road", "storm", "winter" ]
        }, {
            title: "fa-soap",
            searchTerms: [ "bubbles", "clean", "covid-19", "hygiene", "wash" ]
        }, {
            title: "fa-socks",
            searchTerms: [ "business socks", "business time", "clothing", "feet", "flight of the conchords", "wednesday" ]
        }, {
            title: "fa-solar-panel",
            searchTerms: [ "clean", "eco-friendly", "energy", "green", "sun" ]
        }, {
            title: "fa-sort",
            searchTerms: [ "filter", "order" ]
        }, {
            title: "fa-sort-alpha-down",
            searchTerms: [ "alphabetical", "arrange", "filter", "order", "sort-alpha-asc" ]
        }, {
            title: "fa-sort-alpha-down-alt",
            searchTerms: [ "alphabetical", "arrange", "filter", "order", "sort-alpha-asc" ]
        }, {
            title: "fa-sort-alpha-up",
            searchTerms: [ "alphabetical", "arrange", "filter", "order", "sort-alpha-desc" ]
        }, {
            title: "fa-sort-alpha-up-alt",
            searchTerms: [ "alphabetical", "arrange", "filter", "order", "sort-alpha-desc" ]
        }, {
            title: "fa-sort-amount-down",
            searchTerms: [ "arrange", "filter", "number", "order", "sort-amount-asc" ]
        }, {
            title: "fa-sort-amount-down-alt",
            searchTerms: [ "arrange", "filter", "order", "sort-amount-asc" ]
        }, {
            title: "fa-sort-amount-up",
            searchTerms: [ "arrange", "filter", "order", "sort-amount-desc" ]
        }, {
            title: "fa-sort-amount-up-alt",
            searchTerms: [ "arrange", "filter", "order", "sort-amount-desc" ]
        }, {
            title: "fa-sort-down",
            searchTerms: [ "arrow", "descending", "filter", "order", "sort-desc" ]
        }, {
            title: "fa-sort-numeric-down",
            searchTerms: [ "arrange", "filter", "numbers", "order", "sort-numeric-asc" ]
        }, {
            title: "fa-sort-numeric-down-alt",
            searchTerms: [ "arrange", "filter", "numbers", "order", "sort-numeric-asc" ]
        }, {
            title: "fa-sort-numeric-up",
            searchTerms: [ "arrange", "filter", "numbers", "order", "sort-numeric-desc" ]
        }, {
            title: "fa-sort-numeric-up-alt",
            searchTerms: [ "arrange", "filter", "numbers", "order", "sort-numeric-desc" ]
        }, {
            title: "fa-sort-up",
            searchTerms: [ "arrow", "ascending", "filter", "order", "sort-asc" ]
        }, {
            title: "fa-spa",
            searchTerms: [ "flora", "massage", "mindfulness", "plant", "wellness" ]
        }, {
            title: "fa-space-shuttle",
            searchTerms: [ "astronaut", "machine", "nasa", "rocket", "space", "transportation" ]
        }, {
            title: "fa-spell-check",
            searchTerms: [ "dictionary", "edit", "editor", "grammar", "text" ]
        }, {
            title: "fa-spider",
            searchTerms: [ "arachnid", "bug", "charlotte", "crawl", "eight", "halloween" ]
        }, {
            title: "fa-spinner",
            searchTerms: [ "circle", "loading", "progress" ]
        }, {
            title: "fa-splotch",
            searchTerms: [ "Ink", "blob", "blotch", "glob", "stain" ]
        }, {
            title: "fa-spray-can",
            searchTerms: [ "Paint", "aerosol", "design", "graffiti", "tag" ]
        }, {
            title: "fa-square",
            searchTerms: [ "block", "box", "shape" ]
        }, {
            title: "fa-square-full",
            searchTerms: [ "block", "box", "shape" ]
        }, {
            title: "fa-square-root-alt",
            searchTerms: [ "arithmetic", "calculus", "division", "math" ]
        }, {
            title: "fa-stamp",
            searchTerms: [ "art", "certificate", "imprint", "rubber", "seal" ]
        }, {
            title: "fa-star",
            searchTerms: [ "achievement", "award", "favorite", "important", "night", "rating", "score" ]
        }, {
            title: "fa-star-and-crescent",
            searchTerms: [ "islam", "muslim", "religion" ]
        }, {
            title: "fa-star-half",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "fa-star-half-alt",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "fa-star-of-david",
            searchTerms: [ "jewish", "judaism", "religion" ]
        }, {
            title: "fa-star-of-life",
            searchTerms: [ "doctor", "emt", "first aid", "health", "medical" ]
        }, {
            title: "fa-step-backward",
            searchTerms: [ "beginning", "first", "previous", "rewind", "start" ]
        }, {
            title: "fa-step-forward",
            searchTerms: [ "end", "last", "next" ]
        }, {
            title: "fa-stethoscope",
            searchTerms: [ "covid-19", "diagnosis", "doctor", "general practitioner", "hospital", "infirmary", "medicine", "office", "outpatient" ]
        }, {
            title: "fa-sticky-note",
            searchTerms: [ "message", "note", "paper", "reminder", "sticker" ]
        }, {
            title: "fa-stop",
            searchTerms: [ "block", "box", "square" ]
        }, {
            title: "fa-stop-circle",
            searchTerms: [ "block", "box", "circle", "square" ]
        }, {
            title: "fa-stopwatch",
            searchTerms: [ "clock", "reminder", "time" ]
        }, {
            title: "fa-stopwatch-20",
            searchTerms: [ "ABCs", "countdown", "covid-19", "happy birthday", "i will survive", "reminder", "seconds", "time", "timer" ]
        }, {
            title: "fa-store",
            searchTerms: [ "building", "buy", "purchase", "shopping" ]
        }, {
            title: "fa-store-alt",
            searchTerms: [ "building", "buy", "purchase", "shopping" ]
        }, {
            title: "fa-store-alt-slash",
            searchTerms: [ "building", "buy", "closed", "covid-19", "purchase", "shopping" ]
        }, {
            title: "fa-store-slash",
            searchTerms: [ "building", "buy", "closed", "covid-19", "purchase", "shopping" ]
        }, {
            title: "fa-stream",
            searchTerms: [ "flow", "list", "timeline" ]
        }, {
            title: "fa-street-view",
            searchTerms: [ "directions", "location", "map", "navigation" ]
        }, {
            title: "fa-strikethrough",
            searchTerms: [ "cancel", "edit", "font", "format", "text", "type" ]
        }, {
            title: "fa-stroopwafel",
            searchTerms: [ "caramel", "cookie", "dessert", "sweets", "waffle" ]
        }, {
            title: "fa-subscript",
            searchTerms: [ "edit", "font", "format", "text", "type" ]
        }, {
            title: "fa-subway",
            searchTerms: [ "machine", "railway", "train", "transportation", "vehicle" ]
        }, {
            title: "fa-suitcase",
            searchTerms: [ "baggage", "luggage", "move", "suitcase", "travel", "trip" ]
        }, {
            title: "fa-suitcase-rolling",
            searchTerms: [ "baggage", "luggage", "move", "suitcase", "travel", "trip" ]
        }, {
            title: "fa-sun",
            searchTerms: [ "brighten", "contrast", "day", "lighter", "sol", "solar", "star", "weather" ]
        }, {
            title: "fa-superscript",
            searchTerms: [ "edit", "exponential", "font", "format", "text", "type" ]
        }, {
            title: "fa-surprise",
            searchTerms: [ "emoticon", "face", "shocked" ]
        }, {
            title: "fa-swatchbook",
            searchTerms: [ "Pantone", "color", "design", "hue", "palette" ]
        }, {
            title: "fa-swimmer",
            searchTerms: [ "athlete", "head", "man", "olympics", "person", "pool", "water" ]
        }, {
            title: "fa-swimming-pool",
            searchTerms: [ "ladder", "recreation", "swim", "water" ]
        }, {
            title: "fa-synagogue",
            searchTerms: [ "building", "jewish", "judaism", "religion", "star of david", "temple" ]
        }, {
            title: "fa-sync",
            searchTerms: [ "exchange", "refresh", "reload", "rotate", "swap" ]
        }, {
            title: "fa-sync-alt",
            searchTerms: [ "exchange", "refresh", "reload", "rotate", "swap" ]
        }, {
            title: "fa-syringe",
            searchTerms: [ "covid-19", "doctor", "immunizations", "medical", "needle" ]
        }, {
            title: "fa-table",
            searchTerms: [ "data", "excel", "spreadsheet" ]
        }, {
            title: "fa-table-tennis",
            searchTerms: [ "ball", "paddle", "ping pong" ]
        }, {
            title: "fa-tablet",
            searchTerms: [ "apple", "device", "ipad", "kindle", "screen" ]
        }, {
            title: "fa-tablet-alt",
            searchTerms: [ "apple", "device", "ipad", "kindle", "screen" ]
        }, {
            title: "fa-tablets",
            searchTerms: [ "drugs", "medicine", "pills", "prescription" ]
        }, {
            title: "fa-tachometer-alt",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fa-tag",
            searchTerms: [ "discount", "label", "price", "shopping" ]
        }, {
            title: "fa-tags",
            searchTerms: [ "discount", "label", "price", "shopping" ]
        }, {
            title: "fa-tape",
            searchTerms: [ "design", "package", "sticky" ]
        }, {
            title: "fa-tasks",
            searchTerms: [ "checklist", "downloading", "downloads", "loading", "progress", "project management", "settings", "to do" ]
        }, {
            title: "fa-taxi",
            searchTerms: [ "cab", "cabbie", "car", "car service", "lyft", "machine", "transportation", "travel", "uber", "vehicle" ]
        }, {
            title: "fa-teeth",
            searchTerms: [ "bite", "dental", "dentist", "gums", "mouth", "smile", "tooth" ]
        }, {
            title: "fa-teeth-open",
            searchTerms: [ "dental", "dentist", "gums bite", "mouth", "smile", "tooth" ]
        }, {
            title: "fa-temperature-high",
            searchTerms: [ "cook", "covid-19", "mercury", "summer", "thermometer", "warm" ]
        }, {
            title: "fa-temperature-low",
            searchTerms: [ "cold", "cool", "covid-19", "mercury", "thermometer", "winter" ]
        }, {
            title: "fa-tenge",
            searchTerms: [ "currency", "kazakhstan", "money", "price" ]
        }, {
            title: "fa-terminal",
            searchTerms: [ "code", "command", "console", "development", "prompt" ]
        }, {
            title: "fa-text-height",
            searchTerms: [ "edit", "font", "format", "text", "type" ]
        }, {
            title: "fa-text-width",
            searchTerms: [ "edit", "font", "format", "text", "type" ]
        }, {
            title: "fa-th",
            searchTerms: [ "blocks", "boxes", "grid", "squares" ]
        }, {
            title: "fa-th-large",
            searchTerms: [ "blocks", "boxes", "grid", "squares" ]
        }, {
            title: "fa-th-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fa-theater-masks",
            searchTerms: [ "comedy", "perform", "theatre", "tragedy" ]
        }, {
            title: "fa-thermometer",
            searchTerms: [ "covid-19", "mercury", "status", "temperature" ]
        }, {
            title: "fa-thermometer-empty",
            searchTerms: [ "cold", "mercury", "status", "temperature" ]
        }, {
            title: "fa-thermometer-full",
            searchTerms: [ "fever", "hot", "mercury", "status", "temperature" ]
        }, {
            title: "fa-thermometer-half",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fa-thermometer-quarter",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fa-thermometer-three-quarters",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fa-thumbs-down",
            searchTerms: [ "disagree", "disapprove", "dislike", "hand", "social", "thumbs-o-down" ]
        }, {
            title: "fa-thumbs-up",
            searchTerms: [ "agree", "approve", "favorite", "hand", "like", "ok", "okay", "social", "success", "thumbs-o-up", "yes", "you got it dude" ]
        }, {
            title: "fa-thumbtack",
            searchTerms: [ "coordinates", "location", "marker", "pin", "thumb-tack" ]
        }, {
            title: "fa-ticket-alt",
            searchTerms: [ "movie", "pass", "support", "ticket" ]
        }, {
            title: "fa-times",
            searchTerms: [ "close", "cross", "error", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fa-times-circle",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fa-tint",
            searchTerms: [ "color", "drop", "droplet", "raindrop", "waterdrop" ]
        }, {
            title: "fa-tint-slash",
            searchTerms: [ "color", "drop", "droplet", "raindrop", "waterdrop" ]
        }, {
            title: "fa-tired",
            searchTerms: [ "angry", "emoticon", "face", "grumpy", "upset" ]
        }, {
            title: "fa-toggle-off",
            searchTerms: [ "switch" ]
        }, {
            title: "fa-toggle-on",
            searchTerms: [ "switch" ]
        }, {
            title: "fa-toilet",
            searchTerms: [ "bathroom", "flush", "john", "loo", "pee", "plumbing", "poop", "porcelain", "potty", "restroom", "throne", "washroom", "waste", "wc" ]
        }, {
            title: "fa-toilet-paper",
            searchTerms: [ "bathroom", "covid-19", "halloween", "holiday", "lavatory", "prank", "restroom", "roll" ]
        }, {
            title: "fa-toilet-paper-slash",
            searchTerms: [ "bathroom", "covid-19", "halloween", "holiday", "lavatory", "leaves", "prank", "restroom", "roll", "trouble", "ut oh" ]
        }, {
            title: "fa-toolbox",
            searchTerms: [ "admin", "container", "fix", "repair", "settings", "tools" ]
        }, {
            title: "fa-tools",
            searchTerms: [ "admin", "fix", "repair", "screwdriver", "settings", "tools", "wrench" ]
        }, {
            title: "fa-tooth",
            searchTerms: [ "bicuspid", "dental", "dentist", "molar", "mouth", "teeth" ]
        }, {
            title: "fa-torah",
            searchTerms: [ "book", "jewish", "judaism", "religion", "scroll" ]
        }, {
            title: "fa-torii-gate",
            searchTerms: [ "building", "shintoism" ]
        }, {
            title: "fa-tractor",
            searchTerms: [ "agriculture", "farm", "vehicle" ]
        }, {
            title: "fa-trademark",
            searchTerms: [ "copyright", "register", "symbol" ]
        }, {
            title: "fa-traffic-light",
            searchTerms: [ "direction", "road", "signal", "travel" ]
        }, {
            title: "fa-trailer",
            searchTerms: [ "carry", "haul", "moving", "travel" ]
        }, {
            title: "fa-train",
            searchTerms: [ "bullet", "commute", "locomotive", "railway", "subway" ]
        }, {
            title: "fa-tram",
            searchTerms: [ "crossing", "machine", "mountains", "seasonal", "transportation" ]
        }, {
            title: "fa-transgender",
            searchTerms: [ "intersex" ]
        }, {
            title: "fa-transgender-alt",
            searchTerms: [ "intersex" ]
        }, {
            title: "fa-trash",
            searchTerms: [ "delete", "garbage", "hide", "remove" ]
        }, {
            title: "fa-trash-alt",
            searchTerms: [ "delete", "garbage", "hide", "remove", "trash-o" ]
        }, {
            title: "fa-trash-restore",
            searchTerms: [ "back", "control z", "oops", "undo" ]
        }, {
            title: "fa-trash-restore-alt",
            searchTerms: [ "back", "control z", "oops", "undo" ]
        }, {
            title: "fa-tree",
            searchTerms: [ "bark", "fall", "flora", "forest", "nature", "plant", "seasonal" ]
        }, {
            title: "fa-trophy",
            searchTerms: [ "achievement", "award", "cup", "game", "winner" ]
        }, {
            title: "fa-truck",
            searchTerms: [ "cargo", "delivery", "shipping", "vehicle" ]
        }, {
            title: "fa-truck-loading",
            searchTerms: [ "box", "cargo", "delivery", "inventory", "moving", "rental", "vehicle" ]
        }, {
            title: "fa-truck-monster",
            searchTerms: [ "offroad", "vehicle", "wheel" ]
        }, {
            title: "fa-truck-moving",
            searchTerms: [ "cargo", "inventory", "rental", "vehicle" ]
        }, {
            title: "fa-truck-pickup",
            searchTerms: [ "cargo", "vehicle" ]
        }, {
            title: "fa-tshirt",
            searchTerms: [ "clothing", "fashion", "garment", "shirt" ]
        }, {
            title: "fa-tty",
            searchTerms: [ "communication", "deaf", "telephone", "teletypewriter", "text" ]
        }, {
            title: "fa-tv",
            searchTerms: [ "computer", "display", "monitor", "television" ]
        }, {
            title: "fa-umbrella",
            searchTerms: [ "protection", "rain", "storm", "wet" ]
        }, {
            title: "fa-umbrella-beach",
            searchTerms: [ "protection", "recreation", "sand", "shade", "summer", "sun" ]
        }, {
            title: "fa-underline",
            searchTerms: [ "edit", "emphasis", "format", "text", "writing" ]
        }, {
            title: "fa-undo",
            searchTerms: [ "back", "control z", "exchange", "oops", "return", "rotate", "swap" ]
        }, {
            title: "fa-undo-alt",
            searchTerms: [ "back", "control z", "exchange", "oops", "return", "swap" ]
        }, {
            title: "fa-universal-access",
            searchTerms: [ "accessibility", "hearing", "person", "seeing", "visual impairment" ]
        }, {
            title: "fa-university",
            searchTerms: [ "bank", "building", "college", "higher education - students", "institution" ]
        }, {
            title: "fa-unlink",
            searchTerms: [ "attachment", "chain", "chain-broken", "remove" ]
        }, {
            title: "fa-unlock",
            searchTerms: [ "admin", "lock", "password", "private", "protect" ]
        }, {
            title: "fa-unlock-alt",
            searchTerms: [ "admin", "lock", "password", "private", "protect" ]
        }, {
            title: "fa-upload",
            searchTerms: [ "hard drive", "import", "publish" ]
        }, {
            title: "fa-user",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fa-user-alt",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fa-user-alt-slash",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fa-user-astronaut",
            searchTerms: [ "avatar", "clothing", "cosmonaut", "nasa", "space", "suit" ]
        }, {
            title: "fa-user-check",
            searchTerms: [ "accept", "check", "person", "verified" ]
        }, {
            title: "fa-user-circle",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fa-user-clock",
            searchTerms: [ "alert", "person", "remind", "time" ]
        }, {
            title: "fa-user-cog",
            searchTerms: [ "admin", "cog", "person", "settings" ]
        }, {
            title: "fa-user-edit",
            searchTerms: [ "edit", "pen", "pencil", "person", "update", "write" ]
        }, {
            title: "fa-user-friends",
            searchTerms: [ "group", "people", "person", "team", "users" ]
        }, {
            title: "fa-user-graduate",
            searchTerms: [ "cap", "clothing", "commencement", "gown", "graduation", "person", "student" ]
        }, {
            title: "fa-user-injured",
            searchTerms: [ "cast", "injury", "ouch", "patient", "person", "sling" ]
        }, {
            title: "fa-user-lock",
            searchTerms: [ "admin", "lock", "person", "private", "unlock" ]
        }, {
            title: "fa-user-md",
            searchTerms: [ "covid-19", "job", "medical", "nurse", "occupation", "physician", "profile", "surgeon" ]
        }, {
            title: "fa-user-minus",
            searchTerms: [ "delete", "negative", "remove" ]
        }, {
            title: "fa-user-ninja",
            searchTerms: [ "assassin", "avatar", "dangerous", "deadly", "sneaky" ]
        }, {
            title: "fa-user-nurse",
            searchTerms: [ "covid-19", "doctor", "midwife", "practitioner", "surgeon" ]
        }, {
            title: "fa-user-plus",
            searchTerms: [ "add", "avatar", "positive", "sign up", "signup", "team" ]
        }, {
            title: "fa-user-secret",
            searchTerms: [ "clothing", "coat", "hat", "incognito", "person", "privacy", "spy", "whisper" ]
        }, {
            title: "fa-user-shield",
            searchTerms: [ "admin", "person", "private", "protect", "safe" ]
        }, {
            title: "fa-user-slash",
            searchTerms: [ "ban", "delete", "remove" ]
        }, {
            title: "fa-user-tag",
            searchTerms: [ "avatar", "discount", "label", "person", "role", "special" ]
        }, {
            title: "fa-user-tie",
            searchTerms: [ "avatar", "business", "clothing", "formal", "professional", "suit" ]
        }, {
            title: "fa-user-times",
            searchTerms: [ "archive", "delete", "remove", "x" ]
        }, {
            title: "fa-users",
            searchTerms: [ "friends", "group", "people", "persons", "profiles", "team" ]
        }, {
            title: "fa-users-cog",
            searchTerms: [ "admin", "cog", "group", "person", "settings", "team" ]
        }, {
            title: "fa-utensil-spoon",
            searchTerms: [ "cutlery", "dining", "scoop", "silverware", "spoon" ]
        }, {
            title: "fa-utensils",
            searchTerms: [ "cutlery", "dining", "dinner", "eat", "food", "fork", "knife", "restaurant" ]
        }, {
            title: "fa-vector-square",
            searchTerms: [ "anchors", "lines", "object", "render", "shape" ]
        }, {
            title: "fa-venus",
            searchTerms: [ "female" ]
        }, {
            title: "fa-venus-double",
            searchTerms: [ "female" ]
        }, {
            title: "fa-venus-mars",
            searchTerms: [ "Gender" ]
        }, {
            title: "fa-vial",
            searchTerms: [ "experiment", "lab", "sample", "science", "test", "test tube" ]
        }, {
            title: "fa-vials",
            searchTerms: [ "experiment", "lab", "sample", "science", "test", "test tube" ]
        }, {
            title: "fa-video",
            searchTerms: [ "camera", "film", "movie", "record", "video-camera" ]
        }, {
            title: "fa-video-slash",
            searchTerms: [ "add", "create", "film", "new", "positive", "record", "video" ]
        }, {
            title: "fa-vihara",
            searchTerms: [ "buddhism", "buddhist", "building", "monastery" ]
        }, {
            title: "fa-virus",
            searchTerms: [ "bug", "covid-19", "flu", "health", "sick", "viral" ]
        }, {
            title: "fa-virus-slash",
            searchTerms: [ "bug", "covid-19", "cure", "eliminate", "flu", "health", "sick", "viral" ]
        }, {
            title: "fa-viruses",
            searchTerms: [ "bugs", "covid-19", "flu", "health", "multiply", "sick", "spread", "viral" ]
        }, {
            title: "fa-voicemail",
            searchTerms: [ "answer", "inbox", "message", "phone" ]
        }, {
            title: "fa-volleyball-ball",
            searchTerms: [ "beach", "olympics", "sport" ]
        }, {
            title: "fa-volume-down",
            searchTerms: [ "audio", "lower", "music", "quieter", "sound", "speaker" ]
        }, {
            title: "fa-volume-mute",
            searchTerms: [ "audio", "music", "quiet", "sound", "speaker" ]
        }, {
            title: "fa-volume-off",
            searchTerms: [ "audio", "ban", "music", "mute", "quiet", "silent", "sound" ]
        }, {
            title: "fa-volume-up",
            searchTerms: [ "audio", "higher", "louder", "music", "sound", "speaker" ]
        }, {
            title: "fa-vote-yea",
            searchTerms: [ "accept", "cast", "election", "politics", "positive", "yes" ]
        }, {
            title: "fa-vr-cardboard",
            searchTerms: [ "3d", "augment", "google", "reality", "virtual" ]
        }, {
            title: "fa-walking",
            searchTerms: [ "exercise", "health", "pedometer", "person", "steps" ]
        }, {
            title: "fa-wallet",
            searchTerms: [ "billfold", "cash", "currency", "money" ]
        }, {
            title: "fa-warehouse",
            searchTerms: [ "building", "capacity", "garage", "inventory", "storage" ]
        }, {
            title: "fa-water",
            searchTerms: [ "lake", "liquid", "ocean", "sea", "swim", "wet" ]
        }, {
            title: "fa-wave-square",
            searchTerms: [ "frequency", "pulse", "signal" ]
        }, {
            title: "fa-weight",
            searchTerms: [ "health", "measurement", "scale", "weight" ]
        }, {
            title: "fa-weight-hanging",
            searchTerms: [ "anvil", "heavy", "measurement" ]
        }, {
            title: "fa-wheelchair",
            searchTerms: [ "accessible", "handicap", "person" ]
        }, {
            title: "fa-wifi",
            searchTerms: [ "connection", "hotspot", "internet", "network", "wireless" ]
        }, {
            title: "fa-wind",
            searchTerms: [ "air", "blow", "breeze", "fall", "seasonal", "weather" ]
        }, {
            title: "fa-window-close",
            searchTerms: [ "browser", "cancel", "computer", "development" ]
        }, {
            title: "fa-window-maximize",
            searchTerms: [ "browser", "computer", "development", "expand" ]
        }, {
            title: "fa-window-minimize",
            searchTerms: [ "browser", "collapse", "computer", "development" ]
        }, {
            title: "fa-window-restore",
            searchTerms: [ "browser", "computer", "development" ]
        }, {
            title: "fa-wine-bottle",
            searchTerms: [ "alcohol", "beverage", "cabernet", "drink", "glass", "grapes", "merlot", "sauvignon" ]
        }, {
            title: "fa-wine-glass",
            searchTerms: [ "alcohol", "beverage", "cabernet", "drink", "grapes", "merlot", "sauvignon" ]
        }, {
            title: "fa-wine-glass-alt",
            searchTerms: [ "alcohol", "beverage", "cabernet", "drink", "grapes", "merlot", "sauvignon" ]
        }, {
            title: "fa-won-sign",
            searchTerms: [ "currency", "krw", "money" ]
        }, {
            title: "fa-wrench",
            searchTerms: [ "construction", "fix", "mechanic", "plumbing", "settings", "spanner", "tool", "update" ]
        }, {
            title: "fa-x-ray",
            searchTerms: [ "health", "medical", "radiological images", "radiology", "skeleton" ]
        }, {
            title: "fa-yen-sign",
            searchTerms: [ "currency", "jpy", "money" ]
        }, {
            title: "fa-yin-yang",
            searchTerms: [ "daoism", "opposites", "taoism" ]
        } ]
    });
});