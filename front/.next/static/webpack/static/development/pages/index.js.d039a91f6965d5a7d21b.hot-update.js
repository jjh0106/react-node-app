webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/PostCard.js":
/*!********************************!*\
  !*** ./components/PostCard.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers_post__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../reducers/post */ "./reducers/post.js");
/* harmony import */ var _reducers_user__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../reducers/user */ "./reducers/user.js");
/* harmony import */ var _PostImages__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PostImages */ "./components/PostImages.js");
/* harmony import */ var _PostCardContent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./PostCardContent */ "./components/PostCardContent.js");











var PostCard = function PostCard(_ref) {
  var post = _ref.post;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      commentFormOpened = _useState2[0],
      setCommentFormOpened = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(''),
      _useState4 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
      commentText = _useState4[0],
      setCommentText = _useState4[1];

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useSelector"])(function (state) {
    return state.user;
  }),
      me = _useSelector.me;

  var _useSelector2 = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useSelector"])(function (state) {
    return state.post;
  }),
      commentAdded = _useSelector2.commentAdded,
      isAddingComment = _useSelector2.isAddingComment;

  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useDispatch"])();
  var liked = me && post.Likers && post.Likers.find(function (v) {
    return v.id === me.id;
  });
  var onSubmitComment = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (e) {
    e.preventDefault();

    if (!me) {
      return alert('댓글 입력을 위해서는 로그인을 해주세요.');
    }

    return dispatch({
      type: _reducers_post__WEBPACK_IMPORTED_MODULE_6__["ADD_COMMENT_REQUEST"],
      data: {
        postId: post.id,
        content: commentText
      }
    });
  }, [me && me.id, commentText]);
  var onChangeCommentText = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (e) {
    var value = e.target.value;
    setCommentText(value);
  }, []);
  var onToggleComment = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    setCommentFormOpened(function (prev) {
      return !prev;
    });

    if (!commentFormOpened) {
      dispatch({
        type: _reducers_post__WEBPACK_IMPORTED_MODULE_6__["LOAD_COMMENTS_REQUEST"],
        data: post.id
      });
    }
  }, []);
  var onToggleLike = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    if (!me) {
      return alert('로그인이 필요합니다.');
    }

    if (liked) {
      // 좋아요 누른 상태
      dispatch({
        type: _reducers_post__WEBPACK_IMPORTED_MODULE_6__["UNLIKE_POST_REQUEST"],
        data: post.id
      });
    } else {
      // 좋아요 안 누른 상태
      dispatch({
        type: _reducers_post__WEBPACK_IMPORTED_MODULE_6__["LIKE_POST_REQUEST"],
        data: post.id
      });
    }
  }, [me && me.id, post && post.id, liked]);
  var onRetweet = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    if (!me) {
      return alert('로그인이 필요합니다.');
    }

    dispatch({
      type: _reducers_post__WEBPACK_IMPORTED_MODULE_6__["RETWEET_REQUEST"],
      data: post.id
    });
  }, [me && me.id, post.id]);
  var onFollow = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (userId) {
    return function () {
      dispatch({
        type: _reducers_user__WEBPACK_IMPORTED_MODULE_7__["FOLLOW_USER_REQUEST"],
        data: userId
      });
    };
  }, []);
  var onUnfollow = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (userId) {
    return function () {
      dispatch({
        type: _reducers_user__WEBPACK_IMPORTED_MODULE_7__["UNFOLLOW_USER_REQUEST"],
        data: userId
      });
    };
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    setCommentText('');
  }, [commentAdded === true]);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Card"], {
    key: +post.createdAt,
    cover: post.Images[0] && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PostImages__WEBPACK_IMPORTED_MODULE_8__["default"], {
      images: post.Images
    }),
    actions: [react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Icon"], {
      type: "retweet",
      key: "retweet",
      onClick: onRetweet
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Icon"], {
      type: "heart",
      key: "heart",
      theme: liked ? "twoTone" : "outlined",
      twoToneColor: "#eb2f96",
      onClick: onToggleLike
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Icon"], {
      type: "message",
      key: "message",
      onClick: onToggleComment
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Popover"], {
      key: "ellipsis",
      content: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Button"].Group, null, me && post.UserId === me.id ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Button"], null, "\uC218\uC815"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        type: "danger"
      }, "\uC0AD\uC81C")) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Button"], null, "\uC2E0\uACE0"))
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Icon"], {
      type: "ellipsis"
    }))],
    title: post.RetweetId ? "".concat(post.User.nickname, "\uB2D8\uC774 \uB9AC\uD2B8\uC717 \uD558\uC168\uC2B5\uB2C8\uB2E4.") : null,
    extra: !me || post.User.id === me.id ? null : me.Followings && me.Followings.find(function (v) {
      return v.id === post.User.id;
    }) ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      onClick: onUnfollow(post.User.id)
    }, "\uC5B8\uD314\uB85C\uC6B0") : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      onClick: onFollow(post.User.id)
    }, "\uD314\uB85C\uC6B0")
  }, post.RetweetId && post.Retweet ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Card"], {
    cover: post.Retweet.Images[0] && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PostImages__WEBPACK_IMPORTED_MODULE_8__["default"], {
      images: post.Retweet.Images
    })
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Card"].Meta, {
    avatar: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
      href: {
        pathname: '/user',
        query: {
          id: post.Retweet.User.id
        }
      },
      as: "/user/".concat(post.Retweet.User.id)
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Avatar"], null, post.Retweet.User.nickname[0]))),
    title: post.Retweet.User.nickname,
    description: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PostCardContent__WEBPACK_IMPORTED_MODULE_9__["default"], {
      postData: post.Retweet.content
    })
  })) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Card"].Meta, {
    avatar: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
      href: {
        pathname: '/user',
        query: {
          id: post.User.id
        }
      },
      as: "/user/".concat(post.User.id)
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Avatar"], null, post.User.nickname[0]))),
    title: post.User.nickname,
    description: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PostCardContent__WEBPACK_IMPORTED_MODULE_9__["default"], {
      postData: post.content
    })
  })), commentFormOpened && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Form"], {
    onSubmit: onSubmitComment
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Form"].Item, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Input"].TextArea, {
    row: 4,
    value: commentText,
    onChange: onChangeCommentText
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    type: "primary",
    htmlType: "submit",
    loading: isAddingComment
  }, "\uC090\uC57D")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["List"], {
    header: "".concat(post.Comments ? post.Comments.length : 0, "\uAC1C\uC758 \uB313\uAE00"),
    itemLayout: "horizontal",
    dataSource: post.Comments || [],
    renderItem: function renderItem(item) {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Comment"], {
        author: item.User.nickname,
        avatar: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
          href: {
            pathname: '/user',
            query: {
              id: item.User.id
            }
          },
          as: "/user/".concat(item.User.id)
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Avatar"], null, item.User.nickname[0]))),
        content: item.content
      }));
    }
  })));
};

PostCard.propTypes = {
  post: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.shape({
    User: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,
    content: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
    img: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string // createdAt: PropTypes.object,

  })
};
/* harmony default export */ __webpack_exports__["default"] = (PostCard);

/***/ })

})
//# sourceMappingURL=index.js.d039a91f6965d5a7d21b.hot-update.js.map