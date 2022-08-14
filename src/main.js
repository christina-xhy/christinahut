const $tableContainer = $(".tableContainer");
const $lastLi = $tableContainer.find(".last");
//step 6 把需要把setItem得到的字符串改为对象形式保存在数组内；
//if判断object有没有参数，没有就设置默认值；也就是AB两个对象；
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);

//设置默认初始值
// step 1 : 声明一个数组， 用来添加所有用户输入的数据
const hashMap = xObject || [
  { logo: "A", url: "http://www.acfun.com" },
  { logo: "B", url: "http://www.baidu.com" },
];
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
const render = () => {
  $tableContainer.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`
        <li>
            <div class="firstSecond">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon"> 
                    <use xlink:href="#icon-close">X</use>
                    </svg>
                </div>
            </div>
        </li>;`).insertBefore($lastLi); //需要申明lastLi变量
    //step 7 添加click -- open监听事件 ，浏览器打开时传入node的URL值
    $li.on("click", () => {
      debugger;
      window.open(node.url);
    });
    // step 8 监听click -- close事件，点击X 可以关闭对象
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

// 接收一个格式是 http://fuck.com 的字符串作为参数
const simplifyUrl = (url) => {
  return url
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};

// step 2:  添加事件并规定开头格式，接收用户输入,指定格式。用户点击 + 号可以跳出输入框；
$(".addButton").on("click", (e) => {
  e.stopPropagation(); //阻止冒泡，只能点击button才可以关闭 ；
  let url = window.prompt("请输入你的网址");
  if (url.indexOf("http") != 0) {
    url = "http://" + url;
  }

  // step 4： 把参数传入hashmap变量并且返回数据。渲染数据
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  });
  render();
});

render();
// step 5
// 在window关闭的时候，保留数据至localStorage
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
