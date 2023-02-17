// 取得產品渲染區域的DOM
const productPanel = document.querySelector(".product_list");

const cartBtn = document.querySelector("#cartBtn");
const mySidenav = document.querySelector("#mySidenav");

const closBtn = document.querySelector(".closebtn");

cartBtn.addEventListener("click", function (e) {
  mySidenav.style.display = "block";
});
closBtn.addEventListener("click", function (e) {
  mySidenav.style.display = "none";
});
//

// axios 取得產品資訊
axios
  .get("https://json-server-vercel-ashen.vercel.app/productData")
  .then((res) => {
    const productData = res.data;
    console.log(productData);
    // 初始化畫面
    function init() {
      let productHTMLtemp = "";
      productData.forEach(function (item) {
        productHTMLtemp += `<li class="product_item" >
      <a href="shop_copy.html?id=${item.id}" 
        ><img src="${item.imgUrl}" alt="${item.title}" class='product_img'
      /></a>
      <i class="fa-solid fa-cart-plus fa-xl addToCart" data-id='${item.id}'></i>
      
        <h3 class="product_name">${item.title}</h3>
        <p class="product_price">
        ${item.price}
        </p>
    </li>`;
      });
      productPanel.innerHTML = productHTMLtemp;
    }
    init();

    // 取得addtocart的DOM
    const addToCartBtn = document.querySelectorAll(".addToCart");
    // 宣告購物車清單
    let cart;
    // 確認購物車內是否已經有資料
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      console.log(cart);
    } else {
      cart = [];
    }
    console.log(cart);

    // 監聽add to cart btn
    addToCartBtn.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        // alert
        swal({
          title: "Awesome!",
          text: "Item added to your cart!",
          icon: "success",
        });

        // 取得商品id
        const id = e.target.dataset.id;
        console.log(id);
        let addedProduct;
        productData.forEach(function (item) {
          if (item.id == id) {
            addedProduct = item;
          }
        });
        const title = addedProduct.title;
        const price = addedProduct.price;
        const imgUrl = addedProduct.imgUrl;
        console.log(title, price, imgUrl);
        //看購物車裡是否有此項產品
        let targetItem = cart.find(function (item) {
          return item.id === id;
        });

        console.log(targetItem);

        if (targetItem) {
          targetItem.quantity += 1;
        } else {
          cart.push({
            id,
            title,
            price,
            imgUrl,
            quantity: 1,
          });
        }

        console.log(cart);

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
      });
    });

    // 渲染購物車
    const cartRenderArea = document.querySelector(".cartRenderArea");
    cartRenderArea.addEventListener("click", function (event) {
      const id = event.target.dataset.id;
      console.log(id);
      if (event.target.matches(".addQty")) {
        addQty(id);
        updateCart();
      } else if (event.target.matches(".minusQty")) {
        minusQty(id);
        updateCart();
      } else if (event.target.matches(".deleteBtn")) {
        deleteCartItem(id);
        updateCart();
      }
    });
    // 數量增加
    function addQty(id) {
      cart.forEach(function (item, index) {
        if (item.id === id) {
          cart[index].quantity++;
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      });
    }
    // 數量減少
    function minusQty(id) {
      cart.forEach(function (item, index) {
        if (item.id === id) {
          if (cart[index].quantity === 1) {
            alert("Order quantity cannot be 0.");
            return;
          }
          cart[index].quantity--;
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      });
    }

    // 刪除購物車項目
    function deleteCartItem(id) {
      cart.forEach(function (item, index) {
        if (item.id === id) {
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      });
    }

    // 更新購物車
    function updateCart() {
      console.log("updateCart");
      let cartTemp = "";
      let total = 0;
      const subtotal = document.querySelector(".subtotal");
      // let cart = JSON.parse(localStorage.getItem("cart"));
      // console.log(cart);

      // 先將購物車列表清空
      document.querySelector(".cartRenderArea").innerHTML = "";
      // 重新渲染購物車
      cart.forEach(function (item) {
        cartTemp += `<tr>
    <td>
      <div class="cartItem-title">
        <img src="${item.imgUrl}" alt="" />
        <p>${item.title}</p>
      </div>
    </td>
    <td>${item.price}</td>
    <td class="qty_ctrl">
      <a href="#" class='minusQty' data-id=${item.id}>-</a>
      <a class="qty">${item.quantity}</a>
      <a href="#" class='addQty' data-id=${item.id}>+</a>
    </td>
    <td>${item.price * item.quantity}</td>
    <td class="discardBtn_side">
      <i class="fa-solid fa-trash-can deleteBtn" data-id=${item.id}></i>
    </td>
  </tr>`;
        total += item.price * item.quantity;
      });
      document.querySelector(".cartRenderArea").innerHTML = cartTemp;
      subtotal.textContent = total;
    }
    updateCart();

    // 篩選按鈕dom

    const all_btn = document.querySelector("#all_btn");
    const sofa_btn = document.querySelector("#sofa_btn");
    const desk_btn = document.querySelector("#desk_btn");
    const chair_btn = document.querySelector("#chair_btn");

    // 監聽產品篩選
    all_btn.addEventListener("click", function (e) {
      e.preventDefault();
      init();
      // -----------------------------------------------
      // 取得addtocart的DOM
      const addToCartBtn = document.querySelectorAll(".addToCart");
      // 宣告購物車清單
      let cart;
      // 確認購物車內是否已經有資料
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        console.log(cart);
      } else {
        cart = [];
      }
      console.log(cart);

      // 監聽add to cart btn
      addToCartBtn.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          const id = e.target.dataset.id;
          console.log(id);
          let addedProduct;
          productData.forEach(function (item) {
            if (item.id == id) {
              addedProduct = item;
            }
          });
          const title = addedProduct.title;
          const price = addedProduct.price;
          const imgUrl = addedProduct.imgUrl;
          console.log(title, price, imgUrl);

          let targetItem = cart.find(function (item) {
            return item.id === id;
          });

          console.log(targetItem);

          if (targetItem) {
            targetItem.quantity += 1;
          } else {
            cart.push({
              id,
              title,
              price,
              imgUrl,
              quantity: 1,
            });
          }

          console.log(cart);

          localStorage.setItem("cart", JSON.stringify(cart));
          updateCart();
        });
      });

      // 渲染購物車
      const cartRenderArea = document.querySelector(".cartRenderArea");
      cartRenderArea.addEventListener("click", function (event) {
        const id = event.target.dataset.id;
        console.log(id);
        if (event.target.matches(".addQty")) {
          addQty(id);
          updateCart();
        } else if (event.target.matches(".minusQty")) {
          minusQty(id);
          updateCart();
        } else if (event.target.matches(".deleteBtn")) {
          deleteCartItem(id);
          updateCart();
        }
      });
      // 數量增加
      function addQty(id) {
        cart.forEach(function (item, index) {
          if (item.id === id) {
            cart[index].quantity++;
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        });
      }
      // 數量減少
      function minusQty(id) {
        cart.forEach(function (item, index) {
          if (item.id === id) {
            if (cart[index].quantity === 1) {
              alert("Order quantity cannot be 0.");
              return;
            }
            cart[index].quantity--;
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        });
      }

      // 刪除購物車項目
      function deleteCartItem(id) {
        cart.forEach(function (item, index) {
          if (item.id === id) {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        });
      }

      // 更新購物車
      function updateCart() {
        console.log("updateCart");
        let cartTemp = "";
        let total = 0;
        const subtotal = document.querySelector(".subtotal");
        // let cart = JSON.parse(localStorage.getItem("cart"));
        // console.log(cart);

        // 先將購物車列表清空
        document.querySelector(".cartRenderArea").innerHTML = "";
        // 重新渲染購物車
        cart.forEach(function (item) {
          cartTemp += `<tr>
      <td>
        <div class="cartItem-title">
          <img src="${item.imgUrl}" alt="" />
          <p>${item.title}</p>
        </div>
      </td>
      <td>${item.price}</td>
      <td class="qty_ctrl">
        <a href="#" class='minusQty' data-id=${item.id}>-</a>
        <a class="qty">${item.quantity}</a>
        <a href="#" class='addQty' data-id=${item.id}>+</a>
      </td>
      <td>${item.price * item.quantity}</td>
      <td class="discardBtn_side">
        <i class="fa-solid fa-trash-can deleteBtn" data-id=${item.id}></i>
      </td>
    </tr>`;
          total += item.price * item.quantity;
        });
        document.querySelector(".cartRenderArea").innerHTML = cartTemp;
        subtotal.textContent = total;
      }
      updateCart();
    });

    // 監聽sofa按鈕點擊
    sofa_btn.addEventListener("click", function (e) {
      e.preventDefault();
      const sofaArr = productData.filter(function (item) {
        return item.category === "sofa";
      });
      console.log(sofaArr);
      let productHTMLtemp = "";
      sofaArr.forEach(function (item) {
        productHTMLtemp += `<li class="product_item" >
      <a href="shop_copy.html?id=${item.id}"
        ><img src="${item.imgUrl}" alt="${item.title}" class='product_img'
      /></a>
      <i class="fa-solid fa-cart-plus fa-xl addToCart" data-id='${item.id}'></i>

        <h3 class="product_name">${item.title}</h3>
        <p class="product_price">
        ${item.price}
        </p>
    </li>`;
      });
      productPanel.innerHTML = productHTMLtemp;
      // -----------------------------------------------
      // 取得addtocart的DOM
      const addToCartBtn = document.querySelectorAll(".addToCart");
      // 宣告購物車清單
      let cart;
      // 確認購物車內是否已經有資料
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        console.log(cart);
      } else {
        cart = [];
      }
      console.log(cart);

      // 監聽add to cart btn
      addToCartBtn.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          const id = e.target.dataset.id;
          console.log(id);
          let addedProduct;
          productData.forEach(function (item) {
            if (item.id == id) {
              addedProduct = item;
            }
          });
          const title = addedProduct.title;
          const price = addedProduct.price;
          const imgUrl = addedProduct.imgUrl;
          console.log(title, price, imgUrl);

          let targetItem = cart.find(function (item) {
            return item.id === id;
          });

          console.log(targetItem);

          if (targetItem) {
            targetItem.quantity += 1;
          } else {
            cart.push({
              id,
              title,
              price,
              imgUrl,
              quantity: 1,
            });
          }

          console.log(cart);

          localStorage.setItem("cart", JSON.stringify(cart));
          updateCart();
        });
      });

      // 渲染購物車
      const cartRenderArea = document.querySelector(".cartRenderArea");
      cartRenderArea.addEventListener("click", function (event) {
        const id = event.target.dataset.id;
        console.log(id);
        if (event.target.matches(".addQty")) {
          addQty(id);
          updateCart();
        } else if (event.target.matches(".minusQty")) {
          minusQty(id);
          updateCart();
        } else if (event.target.matches(".deleteBtn")) {
          deleteCartItem(id);
          updateCart();
        }
      });
      // 數量增加
      function addQty(id) {
        cart.forEach(function (item, index) {
          if (item.id === id) {
            cart[index].quantity++;
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        });
      }
      // 數量減少
      function minusQty(id) {
        cart.forEach(function (item, index) {
          if (item.id === id) {
            if (cart[index].quantity === 1) {
              alert("Order quantity cannot be 0.");
              return;
            }
            cart[index].quantity--;
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        });
      }

      // 刪除購物車項目
      function deleteCartItem(id) {
        cart.forEach(function (item, index) {
          if (item.id === id) {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        });
      }

      // 更新購物車
      function updateCart() {
        console.log("updateCart");
        let cartTemp = "";
        let total = 0;
        const subtotal = document.querySelector(".subtotal");
        // let cart = JSON.parse(localStorage.getItem("cart"));
        // console.log(cart);

        // 先將購物車列表清空
        document.querySelector(".cartRenderArea").innerHTML = "";
        // 重新渲染購物車
        cart.forEach(function (item) {
          cartTemp += `<tr>
      <td>
        <div class="cartItem-title">
          <img src="${item.imgUrl}" alt="" />
          <p>${item.title}</p>
        </div>
      </td>
      <td>${item.price}</td>
      <td class="qty_ctrl">
        <a href="#" class='minusQty' data-id=${item.id}>-</a>
        <a class="qty">${item.quantity}</a>
        <a href="#" class='addQty' data-id=${item.id}>+</a>
      </td>
      <td>${item.price * item.quantity}</td>
      <td class="discardBtn_side">
        <i class="fa-solid fa-trash-can deleteBtn" data-id=${item.id}></i>
      </td>
    </tr>`;
          total += item.price * item.quantity;
        });
        document.querySelector(".cartRenderArea").innerHTML = cartTemp;
        subtotal.textContent = total;
      }
      updateCart();
    });

    // 監聽desk按鈕點擊
    desk_btn.addEventListener("click", function (e) {
      e.preventDefault();
      const deskArr = productData.filter(function (item) {
        return item.category === "desk";
      });
      console.log(deskArr);
      let productHTMLtemp = "";
      deskArr.forEach(function (item) {
        productHTMLtemp += `<li class="product_item" >
      <a href="shop_copy.html?id=${item.id}"
        ><img src="${item.imgUrl}" alt="${item.title}" class='product_img'
      /></a>
      <i class="fa-solid fa-cart-plus fa-xl addToCart" data-id='${item.id}'></i>

        <h3 class="product_name">${item.title}</h3>
        <p class="product_price">
        ${item.price}
        </p>
    </li>`;
      });
      productPanel.innerHTML = productHTMLtemp;
      // -----------------------------------------------
      // 取得addtocart的DOM
      const addToCartBtn = document.querySelectorAll(".addToCart");
      // 宣告購物車清單
      let cart;
      // 確認購物車內是否已經有資料
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        console.log(cart);
      } else {
        cart = [];
      }
      console.log(cart);

      // 監聽add to cart btn
      addToCartBtn.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          const id = e.target.dataset.id;
          console.log(id);
          let addedProduct;
          productData.forEach(function (item) {
            if (item.id == id) {
              addedProduct = item;
            }
          });
          const title = addedProduct.title;
          const price = addedProduct.price;
          const imgUrl = addedProduct.imgUrl;
          console.log(title, price, imgUrl);

          let targetItem = cart.find(function (item) {
            return item.id === id;
          });

          console.log(targetItem);

          if (targetItem) {
            targetItem.quantity += 1;
          } else {
            cart.push({
              id,
              title,
              price,
              imgUrl,
              quantity: 1,
            });
          }

          console.log(cart);

          localStorage.setItem("cart", JSON.stringify(cart));
          updateCart();
        });
      });

      // 渲染購物車
      const cartRenderArea = document.querySelector(".cartRenderArea");
      cartRenderArea.addEventListener("click", function (event) {
        const id = event.target.dataset.id;
        console.log(id);
        if (event.target.matches(".addQty")) {
          addQty(id);
          updateCart();
        } else if (event.target.matches(".minusQty")) {
          minusQty(id);
          updateCart();
        } else if (event.target.matches(".deleteBtn")) {
          deleteCartItem(id);
          updateCart();
        }
      });
      // 數量增加
      function addQty(id) {
        cart.forEach(function (item, index) {
          if (item.id === id) {
            cart[index].quantity++;
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        });
      }
      // 數量減少
      function minusQty(id) {
        cart.forEach(function (item, index) {
          if (item.id === id) {
            if (cart[index].quantity === 1) {
              alert("Order quantity cannot be 0.");
              return;
            }
            cart[index].quantity--;
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        });
      }

      // 刪除購物車項目
      function deleteCartItem(id) {
        cart.forEach(function (item, index) {
          if (item.id === id) {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        });
      }

      // 更新購物車
      function updateCart() {
        console.log("updateCart");
        let cartTemp = "";
        let total = 0;
        const subtotal = document.querySelector(".subtotal");
        // let cart = JSON.parse(localStorage.getItem("cart"));
        // console.log(cart);

        // 先將購物車列表清空
        document.querySelector(".cartRenderArea").innerHTML = "";
        // 重新渲染購物車
        cart.forEach(function (item) {
          cartTemp += `<tr>
      <td>
        <div class="cartItem-title">
          <img src="${item.imgUrl}" alt="" />
          <p>${item.title}</p>
        </div>
      </td>
      <td>${item.price}</td>
      <td class="qty_ctrl">
        <a href="#" class='minusQty' data-id=${item.id}>-</a>
        <a class="qty">${item.quantity}</a>
        <a href="#" class='addQty' data-id=${item.id}>+</a>
      </td>
      <td>${item.price * item.quantity}</td>
      <td class="discardBtn_side">
        <i class="fa-solid fa-trash-can deleteBtn" data-id=${item.id}></i>
      </td>
    </tr>`;
          total += item.price * item.quantity;
        });
        document.querySelector(".cartRenderArea").innerHTML = cartTemp;
        subtotal.textContent = total;
      }
      updateCart();
    });

    // 監聽chair按鈕點擊
    chair_btn.addEventListener("click", function (e) {
      e.preventDefault();
      const chairArr = productData.filter(function (item) {
        return item.category === "chair";
      });
      console.log(chairArr);
      let productHTMLtemp = "";
      chairArr.forEach(function (item) {
        productHTMLtemp += `<li class="product_item" >
      <a href="shop_copy.html?id=${item.id}"
        ><img src="${item.imgUrl}" alt="${item.title}" class='product_img'
      /></a>
      <i class="fa-solid fa-cart-plus fa-xl addToCart" data-id='${item.id}'></i>

        <h3 class="product_name">${item.title}</h3>
        <p class="product_price">
        ${item.price}
        </p>
    </li>`;
      });
      productPanel.innerHTML = productHTMLtemp;
      // -----------------------------------------------
      // 取得addtocart的DOM
      const addToCartBtn = document.querySelectorAll(".addToCart");
      // 宣告購物車清單
      let cart;
      // 確認購物車內是否已經有資料
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        console.log(cart);
      } else {
        cart = [];
      }
      console.log(cart);

      // 監聽add to cart btn
      addToCartBtn.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          const id = e.target.dataset.id;
          console.log(id);
          let addedProduct;
          productData.forEach(function (item) {
            if (item.id == id) {
              addedProduct = item;
            }
          });
          const title = addedProduct.title;
          const price = addedProduct.price;
          const imgUrl = addedProduct.imgUrl;
          console.log(title, price, imgUrl);

          let targetItem = cart.find(function (item) {
            return item.id === id;
          });

          console.log(targetItem);

          if (targetItem) {
            targetItem.quantity += 1;
          } else {
            cart.push({
              id,
              title,
              price,
              imgUrl,
              quantity: 1,
            });
          }

          console.log(cart);

          localStorage.setItem("cart", JSON.stringify(cart));
          updateCart();
        });
      });

      // 渲染購物車
      const cartRenderArea = document.querySelector(".cartRenderArea");
      cartRenderArea.addEventListener("click", function (event) {
        const id = event.target.dataset.id;
        console.log(id);
        if (event.target.matches(".addQty")) {
          addQty(id);
          updateCart();
        } else if (event.target.matches(".minusQty")) {
          minusQty(id);
          updateCart();
        } else if (event.target.matches(".deleteBtn")) {
          deleteCartItem(id);
          updateCart();
        }
      });
      // 數量增加
      function addQty(id) {
        cart.forEach(function (item, index) {
          if (item.id === id) {
            cart[index].quantity++;
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        });
      }
      // 數量減少
      function minusQty(id) {
        cart.forEach(function (item, index) {
          if (item.id === id) {
            if (cart[index].quantity === 1) {
              alert("Order quantity cannot be 0.");
              return;
            }
            cart[index].quantity--;
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        });
      }

      // 刪除購物車項目
      function deleteCartItem(id) {
        cart.forEach(function (item, index) {
          if (item.id === id) {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        });
      }

      // 更新購物車
      function updateCart() {
        console.log("updateCart");
        let cartTemp = "";
        let total = 0;
        const subtotal = document.querySelector(".subtotal");
        // let cart = JSON.parse(localStorage.getItem("cart"));
        // console.log(cart);

        // 先將購物車列表清空
        document.querySelector(".cartRenderArea").innerHTML = "";
        // 重新渲染購物車
        cart.forEach(function (item) {
          cartTemp += `<tr>
      <td>
        <div class="cartItem-title">
          <img src="${item.imgUrl}" alt="" />
          <p>${item.title}</p>
        </div>
      </td>
      <td>${item.price}</td>
      <td class="qty_ctrl">
        <a href="#" class='minusQty' data-id=${item.id}>-</a>
        <a class="qty">${item.quantity}</a>
        <a href="#" class='addQty' data-id=${item.id}>+</a>
      </td>
      <td>${item.price * item.quantity}</td>
      <td class="discardBtn_side">
        <i class="fa-solid fa-trash-can deleteBtn" data-id=${item.id}></i>
      </td>
    </tr>`;
          total += item.price * item.quantity;
        });
        document.querySelector(".cartRenderArea").innerHTML = cartTemp;
        subtotal.textContent = total;
      }
      updateCart();
    });
  });
