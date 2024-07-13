<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import Nutritional from "$lib/nutritional.svelte";
  import Header from "$lib/Header.svelte";
  import products from "$lib/meats.json";
  import List from "$lib/list.svelte";

  let arrNum = -1;
  let filterArr = [];

  let showHeader = $state(false);
  let showOrder = $state(false);
  let showNutritionInfo = $state(false);
  let showCurProduct = $state(false);

  let curlinkInt = $state(-1);

  let thicknessArr = [
    "shredded",
    "shaved",
    "thin",
    "average",
    "thick",
    "large slice",
  ];

  let colorKey = [
    {
      name: "on sale!",
      color: "#FF0000",
    },
    {
      name: "ham",
      color: "#FFA07A",
    },
    {
      name: "cheese",
      color: "#b3a100",
    },
    {
      name: "bologna",
      color: "#FF6347",
    },
    {
      name: "beef",
      color: "#8B0000",
    },
    {
      name: "pastrami",
      color: "#8B4513",
    },
    {
      name: "italian meat",
      color: "#A52A2A",
    },
    {
      name: "chicken",
      color: "#ffb433",
    },
    {
      name: "turkey",
      color: "#edc478",
    },
  ];

  let thicknessAmt = $state(0);

  let divInt = $state(null);
  let ticketNumber = 1;
  let ticketTaken = $state(false);
  let showCancel = $state(false);
  let productTypes = new Set();
  let product_search_value = $state("");

  let productLinks = [
    { name: "Nutritional Information", action: showNutrition },
    { name: "User Ratings", action: showUserRatings },
    { name: "Visit Product Page", action: visitProductPage },
  ];

  function showNutrition() {
    showNutritionInfo = true;
  }

  function showUserRatings() {}

  function visitProductPage() {}

  let shownProducts = $state([]);
  let listNum = 0;
  let showProductList = false;

  let order = [];

  let showProduct = false;
  let curItem;

  let mode = $state("list");

  function applyFilter(item) {
    shownProducts = products.filter((e) => {
      return e[item.type] == item.item;
    });

    showProductList = true;
  }

  let imglink = $state(null);

  $effect(() => {
    if (product_search_value == "") {
      shownProducts = products;
    }

    if (curProduct !== null) {
      showCurProduct = true;
      setInterval(() => {
        curlinkInt++;
      }, 100);
      let brand = curProduct.brand_name.replace("Thin N' Trim", "tnt");
      imglink = `/deli_imgs/${curProduct.type_of_product}/${curProduct.type_of_product}_${brand}_virginia.png`;
    } else {
      showNutritionInfo = false;
      showCurProduct = false;
    }
  });

  function productSearchEvt(e) {
    showProductList = true;

    if (!product_search_value) {
      shownProducts = products;
      showProductList = false;
      return;
    }

    shownProducts = products.filter((e) => {
      return e.product_name
        .toLowerCase()
        .includes(product_search_value.toLowerCase());
    });

    // console.log(shownProducts);
  }

  function setTicket() {
    ticketTaken = true;
    divInt = setInterval((e) => {
      if (arrNum >= productTypes.size) {
        clearInterval(divInt);
        divInt = null;
        showCancel = true;
        return;
      }
      arrNum++;
    }, 100);
  }

  function cancelTicket() {
    if (product_search_value) {
      product_search_value = "";
      shownProducts = products;
      return;
    }
    showCancel = false;
    ticketTaken = false;
    arrNum = -1;
  }

  let listNumInt = $state(null);
  let curProduct = $state(null);

  onMount(() => {
    shownProducts = products;

    showHeader = true;

    listNumInt = setInterval((e) => {
      if (listNum >= products.length) {
        clearInterval(listNumInt);
        listNumInt = null;
        return;
      }

      listNum++;
    }, 30);

    productTypes.add("on sale!");
    products.map((e) => {
      productTypes.add(e.type_of_product);
    });
  });

  function displayProduct(product) {}
</script>

<div class="flex flex-col h-full">
  {#if showOrder}
    <div
      in:fly={{ x: 40 }}
      out:fly={{ x: 40 }}
      class="flex flex-col justify-center border-slate-800 absolute right-0 bg-red-400 z-10 h-full w-full shadow border-l-2"
    >
      <div class="flex flex-1">order</div>
      <div
        onclick={() => (showOrder = false)}
        class="text-center p-4 shrink bg-blue-400"
      >
        Cancel order
      </div>
    </div>
  {/if}

  <div class="touch-none relative">
    {#if showHeader}
      <Header
        {showOrder}
        {product_search_value}
        {curProduct}
        {productSearchEvt}
      />
    {/if}
  </div>

  <div class="flex-col flex-1 overflow-hidden flex">
    {#if !curProduct}
      <div class="flex-1 overflow-y-scroll overflow-y-contain h-full">
        <List
          displayProduct={(product) => {
            curProduct = product;
          }}
          {colorKey}
          {shownProducts}
        />
      </div>
    {:else}
      <div class="w-full flex border-b gap-2 p-2 shrink">
        <div class="flex-1">{curProduct.type_of_product}</div>
        <div class="flex-1 text-center">{curProduct.brand_name}</div>
        <div class="flex-1 text-right text-slate-400">
          $<span class="border-dashed border-b-2">{curProduct.price}</span> / lb
        </div>
      </div>

      {#if order.started}
        <div class="bg-slate-200 flex flex-col p-3 border-b">
          <div>
            <span
              >Slice Thickness: {thicknessArr[thicknessAmt] ||
                thicknessAmt}</span
            >
          </div>
          <div class="pb-[12px]">
            <input
              bind:value={thicknessAmt}
              min="0"
              max="30"
              type="range"
              step="1"
              class="w-full"
              list="ticks"
            />
            <datalist id="ticks">
              <option value="0" label="0"></option>
              {#each Array(30) as opt, idx}
                <option
                  class="w-full text-center"
                  value={idx + 1}
                  label={idx % 2
                    ? String(idx + 1 - (idx % 2)).padStart(2, "0")
                    : ""}
                ></option>
              {/each}
            </datalist>
          </div>
        </div>
      {:else}
        <div class="flex flex-1">
          <div
            class="flex-1 justify-center items-center flex border-r border-slate-300"
          >
            {#if showCurProduct}
              <div
                in:fly={{ x: 30 }}
                class="bg-contain bg-top drop-shadow-lg sm:bg-center bg-no-repeat size-[70%] sm:size-80"
                style={`background-image: url(${imglink})`}
              />
            {/if}
          </div>

          <div class="flex-1 p-2 gap-2 flex flex-col overflow-y-scroll">
            {#if showNutritionInfo}<Nutritional />{:else}
              {#each productLinks as link, idx}
                <div class="h-400">
                  {#if curlinkInt >= idx}
                    <div
                      in:fly={{ x: -40, delay: idx * 100 }}
                      onclick={link.action}
                      class="p-2 bg-slate-200 rounded-md border-3 cursor-pointer hover:bg-slate-300"
                    >
                      {link.name}
                    </div>
                  {/if}
                </div>
              {/each}
            {/if}
          </div>
        </div>
      {/if}
    {/if}
  </div>

  <!--
  <div class="border-t-2 shrink p-2">
    {#if product_search_value !== ""}
      <div class="text-slate-400 mb-1 text-center">
        {shownProducts.length} Results
      </div>
    {/if}

    {#if !curProduct}
      <div
        in:fade
        onclick={() => {
          mode = "categories";
        }}
        class="text-white cursor-pointer font-bold rounded-md bg-red-400 flex items-center justify-center w-full text-center p-2"
      >
        {#if product_search_value}
          <div class="action_btn" onclick={() => (product_search_value = "")}>
            Clear Search
          </div>
        {:else if mode == "list"}
          <div class="action_btn">Show Categories</div>
        {:else}
          <div class="action_btn" onclick={() => (mode = "list")}>
            Show List
          </div>
        {/if}
      </div>
    {:else}
      <div class="flex items-center justify-center gap-2 w-full text-center">
        <div
          onclick={() => (curProduct = null)}
          class="cursor-pointer text-white font-bold rounded-md bg-red-400 flex-1 p-2"
        >
          Back
        </div>
        <div class="text-white font-bold rounded-md bg-green-500 flex-1 p-2">
          Start Order
        </div>
      </div>
    {/if}
  </div>
-->
</div>

<!--
<div class="flex flex-col gap-2 h-full">
  {#if ticketTaken}
    {#if showProduct}{:else}
      <div
        class="flex p-4 gap-4 shadow-md fixed top-0 left-0 bg-white w-full"
        out:fade
      >
        <img src="mbstacked.png" class="h-10" />
        <input
          class="w-full rounded-md p-2 border-2 border-slate-300"
          placeholder="search for a product..."
          bind:value={product_search_value}
          oninput={productSearchEvt}
          type="text"
        />
        <div>
          Ticket #{ticketNumber}
        </div>
      </div>

      <div class="flex flex-1 flex-col gap-2">
        {#if showProductList}
          <div>
            {#each shownProducts as product, idx}
              {#if listNum >= idx}
                <div
                  in:fly={{ x: -10 }}
                  onclick={() => displayProduct(idx)}
                  class="pl-10 first:border-t-0 border-t-2 border-slate-200 py-5 text-xl"
                >
                  {product.product_name}
                </div>
              {/if}
            {/each}
          </div>
        {:else}
          <div class="flex grow p-4 flex-col gap-2">
            <div class="w-full grid grid-cols-4 gap-2 grow">
              {#each productTypes as item, idx}
                <div class="relative cursor-pointer">
                  {#if arrNum >= idx}
                    <div
                      onclick={() =>
                        applyFilter({ type: "type_of_product", item: item })}
                      transition:fly={{ y: 20 }}
                      class="bg-blue-400 absolute w-full rounded-md shadow flex h-full flex-col"
                    >
                      <div
                        style="center-content"
                        class="flex items-center justify-center"
                      >
                        <div>
                          {item}
                        </div>
                      </div>
                      <div></div>
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
            <div class="shrink flex h-10 w-full">
              {#if showCancel}
                <div
                  in:fade
                  class="rounded-md bg-red-400 flex items-center justify-center w-full text-center p-4"
                  onclick={cancelTicket}
                >
                  cancel
                </div>
              {/if}
            </div>
          </div>
        {/if}
      </div>
    {/if}
  {:else}
    <div class="relative h-full flex place-content-center" onclick={setTicket}>
      <div class="h-full flex flex-row items-center">
        <div
          style="margin: 0 auto; align-content: center; align-items: center;"
          class="flex-1 w-[45%] text-center gap-4 flex-col flex align-center"
        >
          <img
            style="box-shadow: rgb(255, 0, 0) 0px 0px 0px 4px;"
            class="p-4 px-10 mb-2 border-4 rounded-lg border-blue-500 s:w-[450px]"
            src="mbstacked.png"
          />
          <div
            style="margin: 0 auto"
            class="animate-pulse p-4 border-4 border-red-300 shadow-md font-bold text-red-300 rounded-lg sm:text-[2em] text-center capitalize"
          >
            please tap to get ticket
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
-->

<style>
  datalist {
    position: absolute;
    left: 0px;
    font-size: 0.6em;
    justify-content: space-between;

    padding: 0px 15px;
    display: flex;
    width: 100%;
  }

  datalist option {
    text-align: center;
    width: 100%;
  }
</style>
