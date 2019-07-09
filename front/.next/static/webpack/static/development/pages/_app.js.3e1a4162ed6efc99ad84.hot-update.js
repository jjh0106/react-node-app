webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./components/UserProfile.js":
/*!***********************************!*\
  !*** ./components/UserProfile.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reducers/user */ "./reducers/user.js");





var UserProfile = function UserProfile() {
  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(function (state) {
    return state.user;
  }),
      me = _useSelector.me;

  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
  var onLogout = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    dispatch(_reducers_user__WEBPACK_IMPORTED_MODULE_3__["logoutRequestAction"]);
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    actions: [react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: "twit"
    }, "\uD2B8\uC717 ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), " ", me.Posts.length), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: "following"
    }, "\uD314\uB85C\uC789 ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), " ", me.Followings.length), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: "follower"
    }, "\uD314\uB85C\uC6CC ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), " ", me.Followers.length)]
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Card"].Meta, {
    avatar: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Avatar"], null, me.nickname[0]),
    title: me.nickname
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    onClick: onLogout
  }, "\uB85C\uADF8\uC544\uC6C3"));
};

/* harmony default export */ __webpack_exports__["default"] = (UserProfile);

/***/ })

})
//# sourceMappingURL=_app.js.3e1a4162ed6efc99ad84.hot-update.js.map