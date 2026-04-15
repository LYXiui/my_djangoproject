var openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
var allData = [];      // 原始資料
var filteredData = []; // 搜尋後的資料
var currentPage = 1;   // 當前頁碼
const pageSize = 10;   // 每頁顯示幾筆

// 抓取資料
var xhr = new XMLHttpRequest();
xhr.open('GET', openUrl, true);
xhr.send();

xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    allData = JSON.parse(this.responseText);
    filteredData = allData;
    renderTable();
  }
};

// 搜尋功能
function onSearchChange() {
  var keyword = document.getElementById('searchInput').value.trim();
  if (keyword === '') {
    filteredData = allData;
  } else {
    filteredData = allData.filter(function (data) {
      return data['title'].indexOf(keyword) !== -1;
    });
  }
  currentPage = 1;
  renderTable();
}

// 渲染表格
function renderTable() {
  var myTable = document.getElementById("csie");
  
  // 清除舊資料（保留 <thead> 裡的標題）
  // 這裡改用 deleteRow 確保只刪除資料列
  while (myTable.rows.length > 1) {
    myTable.deleteRow(1);
  }

  var totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  var start = (currentPage - 1) * pageSize;
  var end = Math.min(start + pageSize, filteredData.length);
  var pageData = filteredData.slice(start, end);

  pageData.forEach(function (data) {
    var row = myTable.insertRow(-1);
    
    // 第一欄：名稱
    row.insertCell(0).innerHTML = data['title'];
    
    // 第二欄：地點 (從 showInfo[0] 取得)
    var location = (data['showInfo'] && data['showInfo'][0]) ? data['showInfo'][0]['location'] : '無資訊';
    row.insertCell(1).innerHTML = location;

    // 第三欄：票價 (從 showInfo[0] 取得)
    var price = (data['showInfo'] && data['showInfo'][0]) ? data['showInfo'][0]['price'] : '無資訊';
    row.insertCell(2).innerHTML = price;
  });

  // 更新分頁顯示
  document.getElementById('pageInfo').textContent = currentPage + ' / ' + totalPages + ' 頁';
}

// 分頁控制
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
}

function nextPage() {
  var totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  if (currentPage < totalPages) {
    currentPage++;
    renderTable();
  }
}