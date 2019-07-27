webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./sagas/user.js":
/*!***********************!*\
  !*** ./sagas/user.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return userSaga; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js");
/* harmony import */ var _reducers_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reducers/user */ "./reducers/user.js");


var _marked =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(login),
    _marked2 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(watchLogin),
    _marked3 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(logout),
    _marked4 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(watchLogout),
    _marked5 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(signup),
    _marked6 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(watchSignup),
    _marked7 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(loadUser),
    _marked8 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(watchLoadUser),
    _marked9 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(follow),
    _marked10 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(watchFollow),
    _marked11 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(unfollow),
    _marked12 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(watchUnfollow),
    _marked13 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(loadFollowers),
    _marked14 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(watchLoadFollowers),
    _marked15 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(loadFollowings),
    _marked16 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(watchLoadFollowings),
    _marked17 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(removeFollower),
    _marked18 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(watchRemoveFollower),
    _marked19 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(editNickname),
    _marked20 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(watchEditNickname),
    _marked21 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(userSaga);



 //////////////////////////////////////////// login ////////////////////////////////////////////

function loginAPI(data) {
  return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/user/login/', data, {
    withCredentials: true
  });
}

function login(action) {
  var result;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(loginAPI, action.data);

        case 3:
          result = _context.sent;
          _context.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            // put은 dispatch와 동일.
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["LOG_IN_SUCCESS"],
            data: result.data
          });

        case 6:
          _context.next = 13;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          _context.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["LOG_IN_FAILURE"]
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 8]]);
}

function watchLogin() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function watchLogin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeLatest"])(_reducers_user__WEBPACK_IMPORTED_MODULE_3__["LOG_IN_REQUEST"], login);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
} //////////////////////////////////////////// logout ////////////////////////////////////////////


function logoutAPI() {
  return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/user/logout/', {}, {
    withCredentials: true
  });
}

function logout() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function logout$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(logoutAPI);

        case 3:
          _context3.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["LOG_OUT_SUCCESS"]
          });

        case 5:
          _context3.next = 12;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          _context3.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["LOG_OUT_FAILURE"]
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, null, [[0, 7]]);
}

function watchLogout() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function watchLogout$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeLatest"])(_reducers_user__WEBPACK_IMPORTED_MODULE_3__["LOG_OUT_REQUEST"], logout);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
} //////////////////////////////////////////// signup ////////////////////////////////////////////


function signupAPI(data) {
  return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/user/', data);
}

function signup(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function signup$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(signupAPI, action.data);

        case 3:
          _context5.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["SIGN_UP_SUCCESS"]
          });

        case 5:
          _context5.next = 12;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          _context5.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["SIGN_UP_FAILURE"],
            error: _context5.t0
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, null, [[0, 7]]);
}

function watchSignup() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function watchSignup$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeLatest"])(_reducers_user__WEBPACK_IMPORTED_MODULE_3__["SIGN_UP_REQUEST"], signup);

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6);
} //////////////////////////////////////////// load user ////////////////////////////////////////////


function loadUserAPI() {
  var userId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(userId ? "/user/".concat(userId) : '/user/', {
    withCredentials: true
  });
}

function loadUser(action) {
  var _result;

  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function loadUser$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(loadUserAPI, action.data);

        case 3:
          _result = _context7.sent;
          _context7.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["LOAD_USER_SUCCESS"],
            data: _result.data,
            me: !action.data
          });

        case 6:
          _context7.next = 13;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);
          _context7.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["LOAD_USER_FAILURE"],
            error: _context7.t0
          });

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7, null, [[0, 8]]);
}

function watchLoadUser() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function watchLoadUser$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeEvery"])(_reducers_user__WEBPACK_IMPORTED_MODULE_3__["LOAD_USER_REQUEST"], loadUser);

        case 2:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8);
} //////////////////////////////////////////// follow ////////////////////////////////////////////


function followAPI() {
  var userId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/user/".concat(userId, "/follow"), {}, {
    withCredentials: true
  });
}

function follow(action) {
  var _result2;

  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function follow$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(followAPI, action.data);

        case 3:
          _result2 = _context9.sent;
          _context9.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["FOLLOW_USER_SUCCESS"],
            data: _result2.data
          });

        case 6:
          _context9.next = 13;
          break;

        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          _context9.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["FOLLOW_USER_FAILURE"],
            error: _context9.t0
          });

        case 13:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9, null, [[0, 8]]);
}

function watchFollow() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function watchFollow$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeLatest"])(_reducers_user__WEBPACK_IMPORTED_MODULE_3__["FOLLOW_USER_REQUEST"], follow);

        case 2:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked10);
} //////////////////////////////////////////// follow ////////////////////////////////////////////


function unfollowAPI(userId) {
  return axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete("/user/".concat(userId, "/follow"), {
    withCredentials: true
  });
}

function unfollow(action) {
  var _result3;

  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function unfollow$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(unfollowAPI, action.data);

        case 3:
          _result3 = _context11.sent;
          _context11.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["UNFOLLOW_USER_SUCCESS"],
            data: _result3.data
          });

        case 6:
          _context11.next = 13;
          break;

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);
          _context11.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["UNFOLLOW_USER_FAILURE"],
            error: _context11.t0
          });

        case 13:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked11, null, [[0, 8]]);
}

function watchUnfollow() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function watchUnfollow$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeLatest"])(_reducers_user__WEBPACK_IMPORTED_MODULE_3__["UNFOLLOW_USER_REQUEST"], unfollow);

        case 2:
        case "end":
          return _context12.stop();
      }
    }
  }, _marked12);
} //////////////////////////////////////////// load followers ////////////////////////////////////////////


function loadFollowersAPI() {
  var userId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/user/".concat(userId, "/followers"), {
    withCredentials: true
  });
}

function loadFollowers(action) {
  var _result4;

  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function loadFollowers$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(loadFollowersAPI, action.data);

        case 3:
          _result4 = _context13.sent;
          _context13.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["LOAD_FOLLOWERS_SUCCESS"],
            data: _result4.data
          });

        case 6:
          _context13.next = 13;
          break;

        case 8:
          _context13.prev = 8;
          _context13.t0 = _context13["catch"](0);
          console.log(_context13.t0);
          _context13.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["LOAD_FOLLOWERS_FAILURE"],
            error: _context13.t0
          });

        case 13:
        case "end":
          return _context13.stop();
      }
    }
  }, _marked13, null, [[0, 8]]);
}

function watchLoadFollowers() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function watchLoadFollowers$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeLatest"])(_reducers_user__WEBPACK_IMPORTED_MODULE_3__["LOAD_FOLLOWERS_REQUEST"], loadFollowers);

        case 2:
        case "end":
          return _context14.stop();
      }
    }
  }, _marked14);
} //////////////////////////////////////////// load followings ////////////////////////////////////////////


function loadFollowingsAPI() {
  var userId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/user/".concat(userId, "/followings"), {
    withCredentials: true
  });
}

function loadFollowings(action) {
  var _result5;

  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function loadFollowings$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(loadFollowingsAPI, action.data);

        case 3:
          _result5 = _context15.sent;
          _context15.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["LOAD_FOLLOWINGS_SUCCESS"],
            data: _result5.data
          });

        case 6:
          _context15.next = 13;
          break;

        case 8:
          _context15.prev = 8;
          _context15.t0 = _context15["catch"](0);
          console.log(_context15.t0);
          _context15.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["LOAD_FOLLOWINGS_FAILURE"],
            error: _context15.t0
          });

        case 13:
        case "end":
          return _context15.stop();
      }
    }
  }, _marked15, null, [[0, 8]]);
}

function watchLoadFollowings() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function watchLoadFollowings$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeLatest"])(_reducers_user__WEBPACK_IMPORTED_MODULE_3__["LOAD_FOLLOWINGS_REQUEST"], loadFollowings);

        case 2:
        case "end":
          return _context16.stop();
      }
    }
  }, _marked16);
} //////////////////////////////////////////// remove follower ////////////////////////////////////////////


function removeFollowerAPI(userId) {
  return axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete("/user/".concat(userId, "/follower"), {
    withCredentials: true
  });
}

function removeFollower(action) {
  var _result6;

  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function removeFollower$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _context17.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(removeFollowerAPI, action.data);

        case 3:
          _result6 = _context17.sent;
          _context17.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["REMOVE_FOLLOWER_SUCCESS"],
            data: _result6.data
          });

        case 6:
          _context17.next = 13;
          break;

        case 8:
          _context17.prev = 8;
          _context17.t0 = _context17["catch"](0);
          console.log(_context17.t0);
          _context17.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["REMOVE_FOLLOWER_FAILURE"],
            error: _context17.t0
          });

        case 13:
        case "end":
          return _context17.stop();
      }
    }
  }, _marked17, null, [[0, 8]]);
}

function watchRemoveFollower() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function watchRemoveFollower$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeLatest"])(_reducers_user__WEBPACK_IMPORTED_MODULE_3__["REMOVE_FOLLOWER_REQUEST"], removeFollower);

        case 2:
        case "end":
          return _context18.stop();
      }
    }
  }, _marked18);
} //////////////////////////////////////////// edit nickname ////////////////////////////////////////////


function editNicknameAPI(nickname) {
  // 부분변경 patch, 전체변경 update
  return axios__WEBPACK_IMPORTED_MODULE_1___default.a.patch('/user/nickname', {
    nickname: nickname
  }, {
    withCredentials: true
  });
}

function editNickname(action) {
  var _result7;

  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function editNickname$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          _context19.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(editNicknameAPI, action.data);

        case 3:
          _result7 = _context19.sent;
          _context19.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["EDIT_NICKNAME_SUCCESS"],
            data: _result7.data
          });

        case 6:
          _context19.next = 13;
          break;

        case 8:
          _context19.prev = 8;
          _context19.t0 = _context19["catch"](0);
          console.log(_context19.t0);
          _context19.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__["EDIT_NICKNAME_FAILURE"],
            error: _context19.t0
          });

        case 13:
        case "end":
          return _context19.stop();
      }
    }
  }, _marked19, null, [[0, 8]]);
}

function watchEditNickname() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function watchEditNickname$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeLatest"])(_reducers_user__WEBPACK_IMPORTED_MODULE_3__["EDIT_NICKNAME_REQUEST"], editNickname);

        case 2:
        case "end":
          return _context20.stop();
      }
    }
  }, _marked20);
}

function userSaga() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function userSaga$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["all"])([Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["fork"])(watchLogin), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["fork"])(watchLogout), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["fork"])(watchSignup), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["fork"])(watchLoadUser), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["fork"])(watchFollow), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["fork"])(watchUnfollow), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["fork"])(watchLoadFollowers), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["fork"])(watchLoadFollowings), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["fork"])(watchRemoveFollower), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["fork"])(watchEditNickname)]);

        case 2:
        case "end":
          return _context21.stop();
      }
    }
  }, _marked21);
} // take: 해당 액션이 디스패치되면 제너레이터를 next하는 이펙트(해당 액션을 기다리다가 yield를 풀어준다.)
// 서버에 동시에 두 요청 이상이 발생했을 때, 모두 허용할 것인가(takeEvery) 아니면 마지막 것만 허용할 것인가 차이(takeLatest)  
// call은 동기호출, fork는 비동기호출 -- API를 요청 후 응답을 받고 다음 행동을  취하기 위해서는 call로 응답을 대기한다.

/***/ })

})
//# sourceMappingURL=_app.js.f5727f30081878ca8c76.hot-update.js.map