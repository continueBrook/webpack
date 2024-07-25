import React from "react";

let packages = {
  react: React,
};

const code = `!(function () {
  "use strict";
  var __webpack_modules__ = {
      react: function (module) {
        module.exports = require("react");
      },
    },
    __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (void 0 !== cachedModule) return cachedModule.exports;
    var module = (__webpack_module_cache__[moduleId] = { exports: {} });
    return (
      __webpack_modules__[moduleId](
        module,
        module.exports,
        __webpack_require__
      ),
      module.exports
    );
  }
  (__webpack_require__.n = function (module) {
    var getter =
      module && module.__esModule
        ? function () {
            return module.default;
          }
        : function () {
            return module;
          };
    return __webpack_require__.d(getter, { a: getter }), getter;
  }),
    (__webpack_require__.d = function (exports, definition) {
      for (var key in definition)
        __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key) &&
          Object.defineProperty(exports, key, {
            enumerable: !0,
            get: definition[key],
          });
    }),
    (__webpack_require__.o = function (obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }),
    (__webpack_require__.r = function (exports) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(exports, "__esModule", { value: !0 });
    });
  var __webpack_exports__ = {};
  !(function () {
    __webpack_require__.r(__webpack_exports__);
    var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react"),
      react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
        react__WEBPACK_IMPORTED_MODULE_0__
      );
    __webpack_exports__.default = function Index() {
      return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(
        "div",
        null,
        "this is index"
      );
    };
  })();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__)
    __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule &&
    Object.defineProperty(__webpack_export_target__, "__esModule", {
      value: !0,
    });
})();
`;

function RemoteComponent() {
  // const [module, setModul] = useState({ exports: {} });

  const Component = React.lazy(async () => fetchComponent());

  function require(name) {
    return packages[name];
  }

  async function fetchComponent() {
    const res = await new Promise((resolve, reject) => {
      setTimeout(() => {
        let module = {
          exports: {},
        };
        Function("require, exports, module", code)(
          require,
          module.exports,
          module
        );
        resolve({ ...module.exports });
      }, 1000);
    });
    console.log(res);
    return res;
  }

  return (
    <React.Suspense
      fallback={
        <div
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <span style={{ fontSize: 50 }}>Loading...</span>
        </div>
      }
    >
      <Component />
    </React.Suspense>
  );
}

export default RemoteComponent;
