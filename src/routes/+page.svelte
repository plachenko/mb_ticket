<script>
  import { fly, fade } from "svelte/transition";
  import Header from "$lib/components/Header.svelte";
  import Ticket from "$lib/components/Ticket.svelte";

  import gsap from "gsap";
  import Categories from "$lib/components/Categories.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import MainMenu from "$lib/components/MainMenu.svelte";
  import OrderList from "$lib/components/OrderList.svelte";
  import GridList from "$lib/components/gridList.svelte";
  import PlatterOrderForm from "$lib/components/PlatterOrderForm.svelte";

  import { hexToRgba } from "$lib/ColorUtils";
  import weeklyFlyer from "$lib/weekly-flyer-rest.json";

  import Brands from "$lib/Brands.json";

  import Time from "$lib/components/Time.svelte";

  import List from "$lib/components/List.svelte";
  import products from "$lib/meats.json";
  import { onMount } from "svelte";
  import Product from "$lib/components/Product.svelte";
  import CategoryList from "$lib/categories.json";
  import ColorKey from "$lib/ColorKey.json";

  let showHeader = $state(false);
  let showFooter = $state(false);
  let footerShow = $state(false);

  // let ticketHold = $state(false);
  let holdingTicket = $state(false);

  let listItemsChange = $state(false);
  let platterForm = $state(false);

  let r = $state(0);
  let t = $state(0);

  let listItems = CategoryList;
  let gridEl = $state(null);

  let showCategories = $state(false);
  let prodList = $state(false);
  let catEl = $state(null);
  let shownProducts = $state([]);
  let curProduct = $state(null);
  let curBrand = $state(0);
  let curTicketNum = $state(null);
  let curProdType = $state(null);

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

  let flyerItems = weeklyFlyer[0].field_flyer_item;
  let saleProducts = $state([]);

  function formHandle(type) {
    if (type == "cancel") {
      platterForm = false;
      showCategories = true;
      footerShow = true;
      showHeader = true;
    }
  }

  function ticketHold(holding) {
    console.log("holding ticket.");
    if (holding) {
      gridEl.destroyGrid(null);
    } else {
      gridEl.createGrid();
    }
    holdingTicket = holding;
    showFooter = !holding;
  }

  function gridItemSelected(item) {
    if (!item?.items) {
      prodList = true;
      curProdType = item.text;
    }

    if (item.category) {
      setCategory(item.category, item.color);
    } else {
      setCategory(item.text, item.color);
    }

    setTimeout(() => {
      gridEl.createGrid({
        category: item.text,
        items: item.items.map((e) => {
          return {
            name: e,
            color: item.color,
          };
        }),
      });
    }, 40);
  }

  function setTicketNumber(ticketNumber) {
    curTicketNum = ticketNumber;
  }

  onMount(() => {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    let deliItems = flyerItems.filter((e) => {
      if (e.node.field_department[0].url == "/deli") {
        return e;
      }
    });

    saleProducts = deliItems.map((e) => {
      return {
        product_name: e.node.title[0].value,
        brand_name: e.node.field_brand[0]?.url.substring(1),
        price: e.node.field_deal_pricing[0].value.replace(" lb.", " "),
        deal: e.node.field_save_deal_language[0]?.value,
      };
    });

    shownProducts = products;
  });

  let curbrand = $state(0);
  let ignoreScroll = $state(false);
  let curType = $state(null);

  function setCurrentType(typeIdx) {
    curType = typeIdx;
  }

  function setBrand(brandIdx) {
    curbrand = brandIdx;
    ignoreScroll = true;
    setTimeout(() => {
      document.getElementById("curBrandEl").scrollIntoView({
        behavior: "smooth",
        block: "center",
        alignToTop: false,
      });
    }, 80);

    setTimeout(() => {
      ignoreScroll = false;
    }, 400);
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

  let curSection = $state(null);

  function setCategory(category, color) {
    // curSection = color;

    curCategory = category;
    // gridEl.createGrid({

    //   sections: [category],
    //   items: [{ name: "test" }, { name: "uh" }],
    // });

    /*
    if (curCategory == "on sale!") {
      shownProducts = saleProducts;
    } else {
      shownProducts = products.filter((e) => {
        return e.category == category;
      });
    }
    */
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

    if (type == null) {
      showCategories = true;
      showHeader = true;
      if (curTicketNum) {
        footerShow = true;
        showFooter = true;
      }
    }
  }

  let brandList = $state([]);

  function productSearchEvt(val) {
    if (!val) {
      shownProducts = products;
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
          console.log("uh searching clear", searchVal);
        },
      },
    ];
  }

  function setCursection(sec) {
    curSection = sec;
  }

  let prodTypes = ["All"];
</script>

<div
  class="h-full flex flex-col flex-1 pointer-none relative overflow-hidden select-none"
>
  <!-- Top Menus -->
  {#if menuType}
    <div
      in:fly={{ y: -100 }}
      out:fly={{ y: -100, duration: 800 }}
      class="w-full h-full absolute left-0 top-0 z-10 bg-white flex"
    >
      {#if menuType == "main"}
        <MainMenu {MenuOpen} />
      {:else if menuType == "shopping"}
        <OrderList {MenuOpen} />
      {:else if menuType == "curProduct"}
        <div>Current product</div>
      {:else if menuType == "ticket"}
        <Ticket {setMenuType} {setTicketNumber} />
      {/if}
    </div>
  {/if}

  <div
    id="touchContainer"
    ontouchmove={(e) => {
      e.preventDefault();
      return;

      let th = document.getElementById("ticketHolder");
      // th.style.left = ;
      // th.style.top = (~~e.touches[0].clientY - 30) + "px";
    }}
    class={`absolute w-full h-full left-0 top-0 z-[999] ${!holdingTicket ? "pointer-events-none touch-events-none" : ""}`}
  >
    <div
      ontouchmove={(e) => {
        r = ~~e.touches[0].clientX - 10;
        t = ~~e.touches[0].clientY - 30;

        document.getElementById("ticketHolder").style.left = r + "px";
        document.getElementById("ticketHolder").style.top = t + "px";

        console.log("moving...", ~~e.touches[0].clientX);
      }}
      class={`w-full h-full absolute left-0 top-0 z-[998] ${!holdingTicket ? "pointer-events-none touch-events-none" : ""}`}
    ></div>
    <!--
    <div id="ticketHolder" class={`bg-red-300 w-[20px] h-[40px] absolute`}>
      {holdingTicket}
      {r}
    </div>
-->
  </div>

  <!-- Header -->
  <Header
    {curCategory}
    {curType}
    {holdingTicket}
    {curSection}
    {showHeader}
    {curProdType}
    {curProduct}
    {searchVal}
    {productSearchEvt}
    {MenuOpen}
  />

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
            class="absolute left-0 top-0 bg-white z-[99] shadow border-b w-full h-full flex gap-1 flex-col justify-center p-1"
          >
            <!--
            <div
              style={`background-color: ${hexToRgba(ColorKey.find((e) => e.name == curCategory).color, 0.3) || "#000"}`}
              class="w-full rounded-md text-center p-1"
            >
              {curCategory}
            </div>
            <div
              class="cursor-pointer hover:bg-slate-200 bg-slate-300 rounded-md p-1 text-center"
            >
              Type: {prodTypes[curType]}
            </div>
-->
            <div class="h-full w-full">
              <div class="relative overflow-y-auto h-full w-full">
                <div id="brandListEl" class="absolute top-0 left-0 w-full">
                  {#each brandList as brand, idx}
                    <div
                      id={`${curbrand == idx ? "curBrandEl" : ""}`}
                      href={"#" + brand}
                      onclick={() => setBrand(idx)}
                      class={`my-1 w-full cursor-pointer text-xs bg-slate-200 rounded-md p-2 ${idx == curbrand ? "text-white bg-slate-400" : "hover:bg-slate-100 "}`}
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
            </div>
          </div>
          <!--
-->
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
          {ignoreScroll}
          {setBrand}
          {brandList}
          {curbrand}
          {curCategory}
          {displayProduct}
          {shownProducts}
        />
      </div>
    {:else if showCategories}
      <div class="flex flex-1 flex-col p-2">
        {#if !curCategory}
          <div
            out:fade={{
              duration: 80,
            }}
            id="platterBtn"
            class="flex-1 gap-2 justify-center flex"
          >
            <span
              class="text-sm text-slate-400 bg-slate-300 p-2 rounded-md w-full text-center"
              onclick={() => {
                gridEl?.destroyGrid();
                showHeader = false;
                footerShow = false;
                gsap.to("#platterBtn", { opacity: 0, y: "-=20", delay: 0.3 });
                setTimeout(() => {
                  platterForm = true;
                  showCategories = false;
                }, 800);
              }}
            >
              Order a platter
            </span>
          </div>
        {/if}
        <GridList
          bind:this={gridEl}
          {setCursection}
          {gridItemSelected}
          {listItems}
          {listItemsChange}
        />
      </div>
      <!-- <Categories {setCurrentType} {destroyCategories} {setCategory} /> -->
    {:else if platterForm}
      <div class="h-full w-full relative overflow-y-auto">
        <div class="w-full absolute top-0 gap-2 flex flex-col">
          <PlatterOrderForm {formHandle} />
        </div>
      </div>
    {/if}
  </div>
  <!-- Content -->

  <!-- Button options -->
  {#if footerShow}
    <Footer {ticketHold} {showFooter} {curOptions} {curTicketNum} />
  {/if}

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

<style>
</style>
