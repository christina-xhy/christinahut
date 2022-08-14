// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var $tableContainer = $(".tableContainer");
var $lastLi = $tableContainer.find(".last");
//step 6 把需要把setItem得到的字符串改为对象形式保存在数组内；
//if判断object有没有参数，没有就设置默认值；也就是AB两个对象；
var x = localStorage.getItem("x");
var xObject = JSON.parse(x);

//设置默认初始值
// step 1 : 声明一个数组， 用来添加所有用户输入的数据
var hashMap = xObject || [{ logo: "A", url: "http://www.acfun.com" }, { logo: "B", url: "http://www.baidu.com" }];
/**
 * 1.给+号添加点击事件
 * 2.点击后弹出输入框
 * 3.接收用户的输入
 * 4.封装一个对象，存入数组
 * 4.1 localstorage加载数据（字符串）
 * 4.2 字符串变为JSON对象
 * 4.3 如果没有传默认值
 */

// js对象 VS JSON 对象
// let jsObject = {
//   name: "pp",
//   age: 17,
// };

// let jsonObj = {
//   age: 1,
//   name: "pp",
// };

/**
 * 处理数据
 * 1.遍历数组
 * 2.获取数组中的每一个元素
 * 3.根据元素里面的数据（logo,url,logoType）构建对象
 * 4.dom对象插入到浏览器对应的位置
 */
//step 3 处理这些变量，并且创建一个对象，插入指定的位置。
//将除了添加按钮的其他对象删除
var render = function render() {
  $tableContainer.find("li:not(.last)").remove();
  hashMap.forEach(function (node, index) {
    var $li = $("\n        <li>\n            <div class=\"firstSecond\">\n                <div class=\"logo\">" + node.logo + "</div>\n                <div class=\"link\">" + simplifyUrl(node.url) + "</div>\n                <div class=\"close\">\n                    <svg class=\"icon\"> \n                    <use xlink:href=\"#icon-close\">X</use>\n                    </svg>\n                </div>\n            </div>\n        </li>;").insertBefore($lastLi); //需要申明lastLi变量
    //step 7 添加click -- open监听事件 ，浏览器打开时传入node的URL值
    $li.on("click", function () {
      debugger;
      window.open(node.url);
    });
    // step 8 监听click -- close事件，点击X 可以关闭对象
    $li.on("click", ".close", function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

// 接收一个格式是 http://fuck.com 的字符串作为参数
var simplifyUrl = function simplifyUrl(url) {
  return url.replace("http://", "").replace("https://", "").replace("www.", "").replace(/\/.*/, "");
};

// step 2:  添加事件并规定开头格式，接收用户输入,指定格式。用户点击 + 号可以跳出输入框；
$(".addButton").on("click", function (e) {
  e.stopPropagation(); //阻止冒泡，只能点击button才可以关闭 ；
  var url = window.prompt("请输入你的网址");
  if (url.indexOf("http") != 0) {
    url = "http://" + url;
  }

  // step 4： 把参数传入hashmap变量并且返回数据。渲染数据
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url
  });
  render();
});

render();
// step 5
// 在window关闭的时候，保留数据至localStorage
window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.16cd25cb.map