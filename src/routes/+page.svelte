<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import Nutritional from "$lib/nutritional.svelte";
  import products from "$lib/meats.json";

  import List from "$lib/list.svelte";

  let arrNum = -1;
  let filterArr = [];

  let showHeader = false;
  let showOrder = false;

  let thicknessArr = [
    "shredded",
    "shaved",
    "thin",
    "average",
    "thick",
    "large slice",
  ];

  let thicknessAmt = 0;

  let divInt = null;
  let ticketNumber = 1;
  let ticketTaken = false;
  let showCancel = false;
  let productTypes = new Set();
  let product_search_value = "";

  let shownProducts = [];
  let listNum = 0;
  let showProductList = false;

  let order = [];

  let showProduct = false;
  let curItem;

  let mode = "list";

  function applyFilter(item) {
    shownProducts = products.filter((e) => {
      return e[item.type] == item.item;
    });

    showProductList = true;
  }

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

  let listNumInt = null;
  let curProduct = null;

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

  <div class="min-h-[75px] touch-none relative">
    {#if showHeader}
      <div
        class="p-4 border-b flex gap-4 top-0 left-0 bg-white w-full"
        in:fly={{ y: -10 }}
        out:fade
      >
        <img src="mbstacked.png" class="h-10" />
        {#if !curProduct}
          <input
            autocomplete="disabled"
            class="w-full rounded-md p-2 border-2 border-slate-300"
            placeholder="search for a product..."
            bind:value={product_search_value}
            oninput={productSearchEvt}
            type="text"
          />
        {:else}
          <div
            class="border-l border-r px-5 flex flex-1 justify-center items-center"
          >
            <h2 class="text-xl bold center">
              {curProduct.product_name}
            </h2>
          </div>
        {/if}
        <div
          onclick={() => (showOrder = true)}
          class="flex items-center justify-center relative"
        >
          <div
            class="absolute rounded-full bg-red-300 size-4 top-[-2px] right-[-9px] text-xs flex items-center justify-center"
          >
            2
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class={`size-6 order.length ? "text-slate-200" : "text-red-500"`}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </div>
      </div>
    {/if}
  </div>

  <div class="flex-1 gap-2 overflow-scroll overscroll-y-contain">
    {#if !curProduct}
      <List
        displayProduct={(product) => {
          curProduct = product;
        }}
        {shownProducts}
      />
    {:else}
      <div class="w-full flex border-b flex-1 gap-2">
        <div class="flex-1 bg-yellow-500/20">{curProduct.type_of_product}</div>
        <div class="flex-1 text-center">{curProduct.type_of_product}</div>
        <div class="flex-1 text-right text-slate-400">
          {curProduct.price} / lb
        </div>
      </div>
      <div class="bg-slate-200 flex flex-col p-3 border-b">
        <div>
          <span
            >Slice Thickness: {thicknessArr[thicknessAmt] || thicknessAmt}</span
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
    {/if}
  </div>

  <div class="p-2 border-t-2">
    {#if product_search_value !== ""}
      <div class="text-slate-400 mb-1 text-center">
        {shownProducts.length} Results
      </div>
    {/if}

    {#if !curProduct}
      <div
        in:fade
        class="text-white font-bold rounded-md bg-red-400 flex items-center justify-center w-full text-center p-2"
      >
        {#if product_search_value}
          <div class="action_btn" onclick={() => (product_search_value = "")}>
            Clear Search
          </div>
        {:else if mode == "list"}
          <div
            class="action_btn"
            onclick={() => {
              mode = "categories";
            }}
          >
            Show Categories
          </div>
        {:else}
          <div class="action_btn" onclick={() => (mode = "list")}>
            Show List
          </div>
        {/if}
      </div>
    {:else}
      <div class="flex items-center justify-center gap-2 w-full text-center">
        <div class="text-white font-bold rounded-md bg-red-400 flex-1 p-2">
          Cancel
        </div>
        <div class="text-white font-bold rounded-md bg-green-500 flex-1 p-2">
          Start Order
        </div>
      </div>
    {/if}
  </div>
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
