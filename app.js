// All global variable

const searchBtn = document.getElementById("search");
const searchinput = document.getElementById("searchinput");
const searchProductResult = document.getElementById("searchProductResult");
const searchMainbar = document.getElementById("searchMainbar");

// Search Button fetch And addEventListener
searchBtn.addEventListener("click", function () {
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchinput.value}`
  )
    .then((response) => response.json())
    .then((data) => showProduct(data.meals));
});

const showProduct = (showProductAll) => {
  let htmlText = "";
  if (showProductAll) {
    showProductAll.forEach((showProductDetails) => {
      htmlText =
        htmlText +
        `
      <div class="col-md-3">
        <span onclick="productDes(${showProductDetails.idMeal})"  id="product">
          <div>
            <div>
              <img
                src="${showProductDetails.strMealThumb}"
                class="img-fluid"
                alt=""
              />
            </div>
            <div class="productName text-center">
              <p>${showProductDetails.strMeal}</p>
            </div>
          </div>
        </span>
      </div>
        `;
    });
  } else {
    htmlText = "Data not found";
    document.getElementById("searchProductResult").innerHTML = htmlText;
  }

  document.getElementById("searchProductResult").innerHTML = htmlText;
};

// Single Product Details
const productDes = (singleProductDetails) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${singleProductDetails}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      productFullInfo(data.meals[0]);
    });
};

const productFullInfo = (singleProductInfo) => {
  let singleProductadd = [];
  for (let i = 1; i <= 15; i++) {
    if (singleProductInfo[`strIngredient${i}`]) {
      singleProductadd.push(
        `${singleProductInfo[`strMeasure${i}`]} ${
          singleProductInfo[`strIngredient${i}`]
        }`
      );
    }
  }

  let htmlText = `
  <div class="col-md-6 m-auto">
  <div class="shoProductDetailsInner mt-3">
    <img src="${singleProductInfo.strMealThumb}" class="img-fluid" alt="" />
    <div class="shoProductDetailsTitle">
      <h2>${singleProductInfo.strMeal}</h2>
      <h4>Ingredients</h4>
      <ul>
      ${singleProductadd
        .map(
          (liContent) =>
            `<li> ${liContent}</li>`
        )
        .join("")}
      </ul>
      <hr>
   
    </div>
  </div>
</div>`;

  searchProductResult.classList.add("d-none");
  searchMainbar.classList.add("d-none");
  document.getElementById("singleProductDetails").innerHTML = htmlText;
};