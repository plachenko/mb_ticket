<script>
  import { fly, fade } from "svelte/transition";
  import Header from "$lib/components/Header.svelte";
  import Ticket from "$lib/components/Ticket.svelte";
  import Categories from "$lib/components/Categories.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import MainMenu from "$lib/components/MainMenu.svelte";
  import OrderList from "$lib/components/OrderList.svelte";
  import { hexToRgba } from "$lib/ColorUtils";

  import Brands from "$lib/Brands.json";

  import Time from "$lib/components/Time.svelte";

  import List from "$lib/components/List.svelte";
  import products from "$lib/meats.json";
  import { onMount } from "svelte";
  import Product from "$lib/components/Product.svelte";
  import ColorKey from "$lib/ColorKey.json";

  let prodList = $state(false);
  let shownProducts = $state([]);
  let curProduct = $state(null);
  let curBrand = $state(0);
  let curOptions = $state([
    {
      name: "cancel",
      type: -1,
      action: () => {},
    },
    {
      name: "add to order",
      type: 1,
      action: () => {},
    },
  ]);

  onMount(() => {
    setInterval(() => {
      // dateTime = formatDate();
    }, 1000);

    shownProducts = products;
  });

  let curbrand = $state(0);
  function setBrand(brandIdx) {
    curbrand = brandIdx;
  }

  function addBrand(brand) {
    curBrand = brand;
  }

  function setCurOptions(value) {
    curOptions = [
      {
        name: "cancel",
        type: -1,
        action: () => {},
      },
      {
        name: "add to order",
        type: 1,
        value: value,
        action: () => {
          curProduct = null;
        },
      },
    ];
  }

  function displayProduct(product) {
    curProduct = product;
  }

  let searchVal = $state("");

  let menuType = $state("ticket");
  let curCategory = $state(null);

  function MenuOpen(type = null) {
    menuType = type;
  }

  function setCategory(category) {
    console.log("category set...", category);
    curCategory = category;
    prodList = true;
    shownProducts = products.filter((e) => {
      return e.category == category;
    });
  }

  function checkBrandNum(brandName) {
    let brandFilter = [];
    brandFilter = shownProducts.filter((e) => {
      return e.brand_name == brandName;
    });

    return brandFilter.length;
  }

  function setMenuType(type) {
    menuType = type;
  }

  let brandList = $state([]);

  function productSearchEvt(val) {
    if (!val) {
      shownProducts = products;
      // showProductList = false;
      curOptions = [
        {
          name: "show list",
          type: 0,
          action: () => {
            prodList = true;
            curOptions = [
              {
                name: "show categories",
                type: 0,
                action: () => {
                  prodList = false;
                },
              },
            ];
            // searchVal = "";
          },
        },
      ];
      return;
    }

    shownProducts = products.filter((e) => {
      return e.product_name
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(val.toLowerCase().replace(/\s/g, ""));
    });

    curOptions = [
      {
        name: "Clear Search",
        type: 0,
        action: () => {
          // searchVal = "";
          console.log("uh searching clear", searchVal);
        },
      },
    ];
  }
</script>

<div
  class="h-full flex flex-col flex-1 pointer-none relative overflow-hidden select-none"
>
  <!-- Top Menus -->
  {#if menuType}
    <div
      in:fly={{ y: -100 }}
      out:fly={{ y: -100, delay: 100 }}
      class="w-full h-full absolute left-0 top-0 z-10 bg-white flex"
    >
      {#if menuType == "main"}
        <MainMenu {MenuOpen} />
      {:else if menuType == "shopping"}
        <OrderList {MenuOpen} />
      {:else if menuType == "curProduct"}
        <div>Current product</div>
      {:else if menuType == "ticket"}
        <Ticket {setMenuType} />
      {/if}
    </div>
  {/if}

  <!-- Header -->
  <Header {curProduct} {searchVal} {productSearchEvt} {MenuOpen} />

  <div class="flex flex-1 overflow-y-auto">
    {#if curProduct !== null}
      <Product {setCurOptions} {curProduct} />
    {:else if prodList}
      {#if curCategory && !curProduct && prodList}
        <div class=" w-[35%] p-1 border-r relative">
          <!--
          <div class="border-b box-shadow pb-1 border-slate-400">
            <div
              style={`background-color: ${hexToRgba(ColorKey.find((e) => e.name == curCategory).color, 0.3)}`}
              class="w-full rounded-md text-center p-1"
            >
              {curCategory}
            </div>
          </div>
-->
          <div
            class="absolute left-0 top-0 bg-white z-[99] shadow border-b w-full flex justify-center p-1"
          >
            <div
              style={`background-color: ${hexToRgba(ColorKey.find((e) => e.name == curCategory).color, 0.3)}`}
              class="w-full rounded-md text-center p-1"
            >
              {curCategory}
            </div>
          </div>
          <div class="relative overflow-y-auto h-full w-full">
            <div class="absolute top-0 left-0 w-full pt-[40px]">
              {#each brandList as brand, idx}
                <div
                  href={"#" + brand}
                  onclick={() => setBrand(idx)}
                  class={`my-1 w-full text-xs bg-slate-200 rounded-md p-2 ${idx == curbrand ? "text-white bg-slate-400" : ""}`}
                >
                  <div class="w-full clear-both h-[15px]">
                    <div class="truncate text-nowrap w-[80%] float-left">
                      {brand}
                    </div>
                    <span
                      class={`float-right border-l pl-1 ${idx == curbrand ? "border-white" : "border-slate-500"}`}
                      >{checkBrandNum(brand)}</span
                    >
                  </div>
                </div>
              {/each}
            </div>
          </div>
          <!--
      <div class="p-1">
        <div class="bg-red-400 border-r pr-2">
          <div
            style={`background-color: ${hexToRgba(ColorKey.find((e) => e.name == curCategory).color, 0.3)}`}
            class="rounded-md p-2 float-left mr-1"
          >
            {curCategory}
          </div>
        </div>
        <div class="gap-1 flex pb-2 flex-1 overflow-y-auto pl-1">
          {#each Brands as brand}
            <div
              class={`${brand.name == curBrand ? "bg-slate-400" : "bg-slate-500"} text-nowrap cursor-pointer hover:bg-slate-400 rounded-md p-2`}
              onclick={() => addBrand(brand.name)}
            >
              {brand.name}
            </div>
          {/each}
        </div>
      </div>
-->
        </div>
      {/if}
      <div class="relative w-full overflow-y-auto">
        <List
          {brandList}
          {curbrand}
          {curCategory}
          {displayProduct}
          {shownProducts}
        />
      </div>
    {:else}
      <Categories {setCategory} />
    {/if}
  </div>
  <!-- Content -->

  <!-- Button options -->
  <Footer {curOptions} />

  <!--
  <div class="flex flex-1 landscape:flex-row portrait:flex-col">
    <div class="flex-1 items-center justify-center flex">
      <div
        in:fly={{ x: 30 }}
        class="bg-contain bg-center bg-no-repeat size-[80%]"
        style={`background-image: url(${imglink})`}
      />
    </div>
    <div class="relative flex-1">
      <div class="bg-yellow-400 w-full flex-1 overflow-y-auto h-full absolute">
        {#each Array(10) as item, idx}
          <div class="bg-slate-300 border-b flex-1 p-3">{idx}</div>
        {/each}
      </div>
    </div>
  </div>
-->
</div>
