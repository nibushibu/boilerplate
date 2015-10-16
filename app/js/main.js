// Easingの追加
"use strict";

jQuery.easing.quart = function (x, t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
};

$(function () {

  // アンカースクロール
  $("a[href*=#]").click(function () {
    var $target, targetOffset;
    if (location.pathname.replace(/^\//, "") === undefined.pathname.replace(/^\//, "") && location.hostname === undefined.hostname) {
      $target = $(undefined.hash);
      $target = $target.length && $target || $("[name=" + undefined.hash.slice(1) + "]");
      if ($target.length) {
        targetOffset = $target.offset().top;
        $("html,body").animate({
          scrollTop: targetOffset
        }, 200, "quart");
        return false;
      }
    }
  });

  // IE用Fix
  // if ($("html").hasClass("lt-ie7")) {
  //   return $(".list-inline > li").addClass("ie-child");
  // }
});
//# sourceMappingURL=main.js.map
