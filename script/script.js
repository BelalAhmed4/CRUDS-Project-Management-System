//* Get Elements
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submitBtn = document.getElementById("submitBtn");
let searchField = document.getElementById("searchField")
let deleteBtn = document.getElementById("deleteBtn")
let nightThemeBtn = document.getElementById("night")
let lightThemeBtn = document.getElementById("light")
let temp;
//- Items To Be Changed At Light & Dark Mode
let body = document.body
let headerText = document.querySelector("header h1");
let headerSubText = document.querySelector("header h3")
let tbody = document.getElementById("tbody")
//! Themes Function
let theme = 'night';
function resetTheme() {
  if (theme == 'night') {
    body.style.backgroundColor = "var(--dark-theme-bkg)"
    headerText.style.color = "var(--dark-theme)"
    headerSubText.style.color = "var(--dark-theme)"
  } else {
    body.style.backgroundColor = "var(--light-theme-bkg)";
    headerText.style.color = "var(--light-theme)";
    headerSubText.style.color = "var(--light-theme)";
  }
}
resetTheme();
function setTheme(value) {
  theme = value;
  resetTheme();
}
//! Show Data Function
let data;
let allTdElements = [];
function showData() {
  if (localStorage.localStorData != null) {
    data = JSON.parse(localStorage.localStorData);
    tbody.innerHTML = ``;
    for (let i = 0; i < data.length; i++) {
      let tr = document.createElement('tr');
      tr.innerHTML = `
      <td>${i + 1}</td>
      <td class="title">${data[i].title}</td>
      <td>${data[i].price}</td>
      <td>${data[i].taxes}</td>
      <td>${data[i].ads}</td>
      <td>${data[i].discount}</td>
      <td class="totalData">${data[i].total}</td>
      <td class="category">${data[i].category}</td>
      <td>${data[i].count}</td>
      <td><button onclick="updateData(${i})" class="repeatedBtn submitBtn"><i class="fa-solid fa-pen-to-square"></i></button></td>
      <td><button onclick="deleteProduct(${i})" class="repeatedBtn submitBtn"><i class="fa-solid fa-delete-left"></i></button></td>
      `;
      tbody.append(tr);
    }
  } else {
    data = [];
  }
}
showData();
//! Count Function
function countTotal() {
  if (price.value != "" && price.value > 0) {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.
      backgroundColor = "#089508";
  } else {
    total.style.backgroundColor = "#ba0b0b";
    total.innerHTML = "";
  }
}
countTotal()
//! Creat btn function
let submit = 'create'; //* Submit Btn default action 
submitBtn.textContent = "Create"
function createData() {
  if (title.value != "" && price.value != "" && category.value != "") {
    let dataObj = {
      title: title.value,
      price: price.value,
      taxes: +taxes.value,
      ads: +ads.value,
      discount: +discount.value,
      count: +count.value,
      total: total.innerHTML,
      category: category.value
    }
    if (submit == "create") {
      data.push(dataObj);
    } else {
      submitBtn.textContent = "Update"
      data[temp] = dataObj;
    }
    localStorage.setItem('localStorData', JSON.stringify(data))
    showData();
    clearData();
    submitBtn.textContent = "Create"
  }
  countProducts();
}
//! Update function
function updateData(index) {
  scroll({
    top: 0,
    behavior: 'smooth'
  })
  temp = index;
  submit = "update";
  submitBtn.textContent = "Update";
  let productDataObj = data[temp]
  title.value = productDataObj.title;
  price.value = productDataObj.price;
  taxes.value = productDataObj.taxes;
  ads.value = productDataObj.ads;
  discount.value = productDataObj.discount;
  total.innerHTML = productDataObj.total;
  count.value = productDataObj.count;
  category.value = productDataObj.category;
  countTotal();
}
//! Clear Data
function clearData() {
  price.value = ``
  title.value = ``
  taxes.value = ``
  ads.value = ``
  discount.value = ``
  total.innerHTML = ``
  count.value = ``
  category.value = ``
  total.style.backgroundColor = "#ba0b0b";
}
//! delete btn 
function deleteProduct(index) {
  data = JSON.parse(localStorage.localStorData);
  data.splice(index, 1);
  localStorage.setItem('localStorData', JSON.stringify(data))
  showData()
  countProducts();
  clearData()
  //Return Submit Creat State
  submit = 'creat'; //* Submit Btn default action 
  submitBtn.textContent = "Creat"
  createData()
}
//! Search Function
let searchState = 'Title'; //* Search Default State
function showSearchStat(id) {
  if (id == 'titleBtn') {
    searchState = 'Title';
  } else {
    searchState = 'Category';
  }
  searchField.placeholder = `Search By ` + `${searchState}`
  searchField.value = '';
  showData();
}
function searching(value) {
  let tbody = document.querySelector('tbody');
  let rows = tbody.querySelectorAll('tr');
  rows.forEach(row => {
    row.style.display = ''; // Reset display style to show all rows initially
    let cell;
    if (searchState === 'Title') {
      cell = row.querySelector('.title');
      if (!cell.textContent.toLowerCase().includes(value.toLowerCase())) {
        row.style.display = 'none';
      }
    } else {
      cell = row.querySelector('.category');
      if (!cell.textContent.toLowerCase().includes(value.toLowerCase())) {
        row.style.display = 'none';
      }
    }
  }
  );
  countProducts();
}
//! Delete All Function
function deleteAll() {
  let visibleProducts = document.querySelectorAll("tbody tr:not([style*='display: none'])");
  let newData = [];
  // Collect only the data not corresponding to visible rows
  visibleProducts.forEach(row => {
    let rowIndex = Array.from(row.parentNode.children).indexOf(row);
    data[rowIndex] = null; // Mark for deletion
  });
  data.forEach(item => {
    if (item !== null) {
      newData.push(item); // Add only non-null items
    }
  });
  data = newData;
  localStorage.setItem('localStorData', JSON.stringify(data));
  showData();
  countProducts();
  searchField.value = '';
}
function countProducts() {
  let visibleProducts = document.querySelectorAll("tbody tr:not([style*='display: none'])");
  if (visibleProducts.length > 0) {
    deleteBtn.style.display = 'block';
    deleteBtn.textContent = `Delete All (${visibleProducts.length})`
  } else {
    deleteBtn.style.display = 'none';
  }
}
countProducts();