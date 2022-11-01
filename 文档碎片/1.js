document.querySelector("#button").addEventListener("click", function () {
  // 记录任务开始时间
  let now = Date.now();
  // 插入一万条数据
  const total = 10000;
  // 获取容器
  let ul = document.querySelector("#container");
  //创建文档碎片
  let fragment = document.createDocumentFragment();
  // 将数据插入文档碎片中
  for (let i = 0; i < total; i++) {
    let li = document.createElement("li");
    li.innerText = ~~(Math.random() * total);
    fragment.appendChild(li);
  }
  //将文档碎片插入容器
  ul.appendChild(fragment);

  console.log("JS运行时间:", Date.now() - now);
  setTimeout(() => {
    console.log("总运行时间:", Date.now() - now);
  }, 0);
});
