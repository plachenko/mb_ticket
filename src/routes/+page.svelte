<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import Nutritional from "$lib/nutritional.svelte";
  import products from "$lib/meats.json";

  let arrNum = -1;
  let filterArr = [];

  let divInt = null;
  let ticketNumber = 1;
  let ticketTaken = false;
  let showCancel = false;
  let productTypes = new Set();
  let product_search_value = "";

  let shownProducts = [];
  let listNum = 0;
  let showProductList = false;

  let showProduct = false;
  let curItem;

  function applyFilter(item) {
    console.log(item);

    shownProducts = products.filter((e) => {
      e;
    });
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
    showCancel = false;
    ticketTaken = false;
    arrNum = -1;
  }

  let listNumInt = null;

  onMount(() => {
    shownProducts = products;

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

    console.log(productTypes);
  });

  function displayProduct(idx) {
    console.log(shownProducts[idx]);
  }
</script>

<div class="flex flex-col gap-2 h-full">
  {#if ticketTaken}
    {#if showProduct}{:else}
      <div
        class="flex p-4 gap-4 shadow-md sticky top-0 bg-white w-full"
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

      {#if showProductList}
        <div>
          {#each shownProducts as product, idx}
            {#if listNum >= idx}
              <div
                in:fly={{ x: -10 }}
                onclick={() => displayProduct(idx)}
                class="pl-10 border-t-2 border-slate-200 py-7 text-xl"
              >
                {product.product_name}
              </div>
            {/if}
          {/each}
        </div>
      {:else}
        <div class="flex grow">
          {#if curItem}
            {curItem.keys[0]}
          {/if}
          <div class="w-full grid grid-cols-4 gap-2 grow">
            {#each productTypes as item, idx}
              <div class="relative cursor-pointer">
                {#if arrNum >= idx}
                  <div
                    transition:fly={{ y: 20 }}
                    class="bg-blue-400 absolute w-full rounded-md shadow flex h-full flex-col"
                  >
                    <div
                      style="center-content"
                      class="text-center"
                      onclick={() =>
                        applyFilter({ type: "product_type", item: item })}
                    >
                      {item}
                    </div>
                    <div></div>
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/if}
      <div class="flex-1 shrink">
        {#if showCancel}
          <div
            in:fade
            class="rounded-md bg-red-400 text-center p-4"
            onclick={cancelTicket}
          >
            cancel
          </div>
        {/if}
      </div>
    {/if}
  {:else}
    <div
      style="align-content: center"
      class="relative h-full w-full"
      onclick={setTicket}
    >
      <div class="h-full w-full flex flex-row">
        <div
          style="margin: 0 auto; align-content: center;"
          class="flex-1 w-[45%] text-center gap-4 flex-col flex"
        >
          <div
            style="box-shadow: rgb(255, 0, 0) 0px 0px 0px 4px;"
            class="relative p-4 border-4 border-blue-500 rounded-lg"
          >
            <img src="mbstacked.png" style="margin: 0px auto" />
          </div>
          <div
            style="margin: 0 auto"
            class="animate-pulse p-4 border-4 border-red-300 shadow-md font-bold text-red-300 rounded-lg sm:text-[5em] text-center capitalize"
          >
            please tap to get ticket
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
</style>
