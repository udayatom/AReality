!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t(((e || self).aframeWebsurfaces = {}));
})(this, function (e) {
  function t(e, t) {
    (e.prototype = Object.create(t.prototype)),
      (e.prototype.constructor = e),
      n(e, t);
  }
  function n(e, t) {
    return (n =
      Object.setPrototypeOf ||
      function (e, t) {
        return (e.__proto__ = t), e;
      })(e, t);
  }
  var i = (function (e) {
    function n(t) {
      var n;
      return (
        ((n = e.call(this) || this).element =
          t || document.createElement("div")),
        (n.element.style.position = "absolute"),
        (n.element.style.pointerEvents = "auto"),
        n.addEventListener("removed", function () {
          this.traverse(function (e) {
            e.element instanceof Element &&
              null !== e.element.parentNode &&
              e.element.parentNode.removeChild(e.element);
          });
        }),
        n
      );
    }
    return (
      t(n, e),
      (n.prototype.copy = function (t, n) {
        return (
          e.prototype.copy.call(this, t, n),
          (this.element = t.element.cloneNode(!0)),
          this
        );
      }),
      n
    );
  })(THREE.Object3D);
  (i.prototype.isCSS3DObject = !0),
    ((function (e) {
      function n(t) {
        var n;
        return ((n = e.call(this, t) || this).rotation2D = 0), n;
      }
      return (
        t(n, e),
        (n.prototype.copy = function (t, n) {
          return (
            e.prototype.copy.call(this, t, n),
            (this.rotation2D = t.rotation2D),
            this
          );
        }),
        n
      );
    })(i).prototype.isCSS3DSprite = !0);
  var s = new THREE.Matrix4(),
    o = new THREE.Matrix4(),
    a = function () {
      var e,
        t,
        n,
        i,
        a = this,
        r = { camera: { fov: 0, style: "" }, objects: new WeakMap() },
        c = document.createElement("div");
      (c.style.overflow = "hidden"), (this.domElement = c);
      var l = document.createElement("div");
      function d(e) {
        return Math.abs(e) < 1e-10 ? 0 : e;
      }
      function m(e) {
        var t = e.elements;
        return (
          "matrix3d(" +
          d(t[0]) +
          "," +
          d(-t[1]) +
          "," +
          d(t[2]) +
          "," +
          d(t[3]) +
          "," +
          d(t[4]) +
          "," +
          d(-t[5]) +
          "," +
          d(t[6]) +
          "," +
          d(t[7]) +
          "," +
          d(t[8]) +
          "," +
          d(-t[9]) +
          "," +
          d(t[10]) +
          "," +
          d(t[11]) +
          "," +
          d(t[12]) +
          "," +
          d(-t[13]) +
          "," +
          d(t[14]) +
          "," +
          d(t[15]) +
          ")"
        );
      }
      function h(e) {
        var t = e.elements;
        return (
          "translate(-50%,-50%)matrix3d(" +
          d(t[0]) +
          "," +
          d(t[1]) +
          "," +
          d(t[2]) +
          "," +
          d(t[3]) +
          "," +
          d(-t[4]) +
          "," +
          d(-t[5]) +
          "," +
          d(-t[6]) +
          "," +
          d(-t[7]) +
          "," +
          d(t[8]) +
          "," +
          d(t[9]) +
          "," +
          d(t[10]) +
          "," +
          d(t[11]) +
          "," +
          d(t[12]) +
          "," +
          d(t[13]) +
          "," +
          d(t[14]) +
          "," +
          d(t[15]) +
          ")"
        );
      }
      function u(e, t, n, i) {
        if (e.isCSS3DObject) {
          var c;
          e.onBeforeRender(a, t, n),
            e.isCSS3DSprite
              ? (s.copy(n.matrixWorldInverse),
                s.transpose(),
                0 !== e.rotation2D && s.multiply(o.makeRotationZ(e.rotation2D)),
                s.copyPosition(e.matrixWorld),
                s.scale(e.scale),
                (s.elements[3] = 0),
                (s.elements[7] = 0),
                (s.elements[11] = 0),
                (s.elements[15] = 1),
                (c = h(s)))
              : (c = h(e.matrixWorld));
          var d = e.element,
            m = r.objects.get(e);
          (void 0 !== m && m.style === c) ||
            ((d.style.transform = c), r.objects.set(e, { style: c })),
            (d.style.display = e.visible ? "" : "none"),
            d.parentNode !== l && l.appendChild(d),
            e.onAfterRender(a, t, n);
        }
        for (var p = 0, f = e.children.length; p < f; p++)
          u(e.children[p], t, n);
      }
      (l.style.transformStyle = "preserve-3d"),
        (l.style.pointerEvents = "none"),
        c.appendChild(l),
        (this.getSize = function () {
          return { width: e, height: t };
        }),
        (this.render = function (e, t) {
          var s,
            o,
            a = t.projectionMatrix.elements[5] * i;
          r.camera.fov !== a &&
            ((c.style.perspective = t.isPerspectiveCamera ? a + "px" : ""),
            (r.camera.fov = a)),
            !0 === e.autoUpdate && e.updateMatrixWorld(),
            null === t.parent && t.updateMatrixWorld(),
            t.isOrthographicCamera &&
              ((s = -(t.right + t.left) / 2), (o = (t.top + t.bottom) / 2));
          var h =
            (t.isOrthographicCamera
              ? "scale(" +
                a +
                ")translate(" +
                d(s) +
                "px," +
                d(o) +
                "px)" +
                m(t.matrixWorldInverse)
              : "translateZ(" + a + "px)" + m(t.matrixWorldInverse)) +
            "translate(" +
            n +
            "px," +
            i +
            "px)";
          r.camera.style !== h &&
            ((l.style.transform = h), (r.camera.style = h)),
            u(e, e, t);
        }),
        (this.setSize = function (s, o) {
          (n = (e = s) / 2),
            (i = (t = o) / 2),
            (c.style.width = s + "px"),
            (c.style.height = o + "px"),
            (l.style.width = s + "px"),
            (l.style.height = o + "px");
        });
    },
    r = 100,
    c = (function () {
      function e(e, t) {
        (this.websurfaceEntity = t),
          (this.enabled = !0),
          (this.cssRenderer = new a()),
          (this.domElement = this.cssRenderer.domElement),
          (this.domElement.style.position = "fixed"),
          (this.domElement.style.zIndex = "-2"),
          (this.cssCamera = new THREE.PerspectiveCamera(
            e.fov,
            e.aspect,
            e.near * r,
            e.far * r
          )),
          (this.camera = e),
          (this.cssScene = new THREE.Scene()),
          (this.update = this.update.bind(this));
      }
      var t = e.prototype;
      return (
        (t.setSize = function (e, t) {
          this.cssRenderer.setSize(e, t),
            (this.cssCamera.aspect = e / t),
            this.cssCamera.updateProjectionMatrix();
        }),
        (t.update = function () {
          this.camera.getWorldPosition(this.cssCamera.position),
            this.cssCamera.position.multiplyScalar(r),
            this.camera.getWorldQuaternion(this.cssCamera.quaternion),
            this.cssRenderer.render(this.cssScene, this.cssCamera);
        }),
        e
      );
    })(),
    l = (function (e) {
      function n(t, n, s, o, a) {
        var c,
          l = (void 0 === a ? {} : a).elementWidth,
          d = void 0 === l ? 1280 : l,
          m = new THREE.PlaneGeometry(s, o),
          h = new THREE.MeshBasicMaterial({
            opacity: 0,
            blending: THREE.NoBlending,
            side: THREE.DoubleSide,
            color: new THREE.Color(0, 0, 0),
          });
        return (
          ((c = e.call(this, m, h) || this).context = t),
          (c.domElement = n),
          (c.aspectRatio = o / s),
          (c.elementWidth = d),
          (c.elementHeight = c.elementWidth * c.aspectRatio),
          (c.width = s),
          (c.height = o),
          c.resizeElement(),
          (c.cssObject = new i(c.domElement)),
          c.cssObject.scale.multiplyScalar(r / (c.elementWidth / c.width)),
          (c.cssObjectInitialScale = c.cssObject.scale),
          (c.size = new THREE.Vector3()),
          (c.box = new THREE.Box3()),
          c.addEventListener("added", c.handleAdded),
          c.addEventListener("removed", c.handleRemoved),
          (c.update = c.update.bind(
            (function (e) {
              if (void 0 === e)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return e;
            })(c)
          )),
          c
        );
      }
      t(n, e);
      var s = n.prototype;
      return (
        (s.handleAdded = function () {
          this.context.cssScene.add(this.cssObject);
        }),
        (s.handleRemoved = function () {
          this.context.cssScene.remove(this.cssObject);
        }),
        (s.resizeElement = function () {
          (this.domElement.style.width = this.elementWidth + "px"),
            (this.domElement.style.height = this.elementHeight + "px");
        }),
        (s.setElement = function (e) {
          this.domElement.parentNode &&
            this.domElement.parentNode.removeChild(this.domElement),
            (this.domElement = e),
            (this.cssObject.element = e),
            this.resizeElement();
        }),
        (s.update = function (e) {
          this.cssObject.quaternion.copy(e.quaternion),
            this.cssObject.position.copy(e.position).multiplyScalar(r),
            this.box.setFromObject(this).getSize(this.size);
          var t = e.scale;
          this.oldScaleFactor != t &&
            ((this.oldScaleFactor = t),
            this.cssObject.scale.set(
              this.cssObjectInitialScale.x,
              this.cssObjectInitialScale.y,
              this.cssObjectInitialScale.z
            ),
            this.cssObject.scale.multiply(t)),
            (this.cssObject.visible = e.visible);
        }),
        (s.dispose = function () {
          this.removeEventListener("added", this.handleAdded),
            this.removeEventListener("removed", this.handleRemoved),
            this.domElement.remove(),
            this.geometry.dispose(),
            this.material.dispose();
        }),
        n
      );
    })(THREE.Mesh),
    d = AFRAME.registerComponent("websurface", {
      schema: {
        url: { default: "https://aframe.io" },
        width: { default: 1 },
        height: { default: 0.75 },
        isInteractable: { default: !0 },
        frameSkips: { default: 1 },
        autoSceneStyling: { default: !0 },
      },
      init: function () {
        var e = this.el,
          t = this.data;
        1 == t.autoSceneStyling &&
          ((e.sceneEl.style.position = "absolute"),
          (e.sceneEl.style.zIndex = "1")),
          1 == t.isInteractable &&
            ((t.mouseHasLeftScreen = !0),
            e.setAttribute(
              "geometry",
              "primitive:plane; width:" + t.width + "; height:" + t.height + ";"
            ),
            e.addEventListener("click", function () {
              0 != t.mouseHasLeftScreen &&
                (document.exitPointerLock(),
                (e.sceneEl.style.zIndex = "-1"),
                (t.mouseHasLeftScreen = !1));
            }),
            e.addEventListener("mouseenter", function () {
              t.context.domElement.style.zIndex = "0";
            }),
            e.addEventListener("mouseleave", function () {
              (t.context.domElement.style.zIndex = "-2"),
                (t.mouseHasLeftScreen = !0);
            })),
          e.addEventListener("cam-loaded", function () {
            var n = document.createElement("iframe");
            n.setAttribute("src", t.url + "?enablejsapi=1"),
              n.setAttribute("allow", "autoplay"),
              (n.style.border = "none");
            var i = new c(e.sceneEl.camera, e);
            i.setSize(window.innerWidth, window.innerHeight),
              document.body.appendChild(i.domElement);
            var s = new l(i, n, t.width, t.height);
            if ((e.object3D.add(s), 1 == t.isInteractable)) {
              var o = document.createElement("div");
              (o.style.position = "fixed"),
                (o.style.top = "0"),
                (o.style.width = "100%"),
                (o.style.height = "100%"),
                (o.style.zIndex = "-1"),
                i.domElement.appendChild(o),
                o.addEventListener("click", function () {
                  e.sceneEl.style.zIndex = 1;
                });
            }
            (this.websurface_iframe = n),
              (this.css3d_context = i),
              (t.context = i),
              (t.element = s),
              window.addEventListener("resize", function () {
                i.setSize(window.innerWidth, window.innerHeight);
              });
          }),
          (t.frames = 0),
          (t.isCamLoaded = !1);
      },
      tick: function () {
        var e = this.el,
          t = this.data;
        if (1 != t.isPaused)
          if (0 != t.isCamLoaded) {
            var n = t.context,
              i = t.element;
            t.frames % t.frameSkips == 0 &&
              (n && n.update(), i && i.update(e.object3D)),
              t.frames++;
          } else
            e.sceneEl.camera &&
              (this.el.emit("cam-loaded"), (t.isCamLoaded = !0));
      },
      pause: function () {
        this.data.isPaused = !0;
      },
      play: function () {
        this.data.isPaused = !1;
      },
    });
  e.component = d;
});
//sourceMappingURL = "js/aframe-websurfaces.umd.js.map";
