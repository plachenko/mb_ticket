<script>
  import { fly, fade } from "svelte/transition";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import MainMenu from "$lib/components/MainMenu.svelte";
  import OrderList from "$lib/components/OrderList.svelte";

  import Time from "$lib/components/Time.svelte";

  import List from "$lib/components/List.svelte";
  import products from "$lib/meats.json";
  import { onMount } from "svelte";

  let prodList = $state(false);

  let shownProducts = $state([]);
  // let dateTime = $state(formatDate());

  onMount(() => {
    setInterval(() => {
      // dateTime = formatDate();
    }, 1000);

    shownProducts = products;
  });

  function displayProduct(product) {
    console.log(product);
  }

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

  let searchVal = $state("");

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

  let menuType = $state("ticket");

  function MenuOpen(type = null) {
    menuType = type;
  }

  function productSearchEvt(val) {
    if (!val) {
      shownProducts = products;
      // showProductList = false;
      curOptions = [
        {
          name: "show categories",
          type: 0,
          action: () => {
            searchVal = "";
          },
        },
      ];
      return;
    }

    shownProducts = products.filter((e) => {
      return e.product_name.toLowerCase().includes(val.toLowerCase());
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

<div class="h-full flex flex-col flex-1 pointer-none relative overflow-hidden">
  <!-- Top Menus -->
  {#if menuType}
    <div
      in:fly={{ y: -100 }}
      out:fly={{ x: 100, delay: 100 }}
      class="w-full h-full absolute left-0 top-0 z-10 bg-white flex"
    >
      {#if menuType == "main"}
        <MainMenu {MenuOpen} />
      {:else if menuType == "shopping"}
        <OrderList {MenuOpen} />
      {:else if menuType == "curProduct"}
        <div>Current product</div>
      {:else if menuType == "ticket"}
        <div
          class="rel w-full"
          onclick={() => {
            menuType = null;
          }}
        >
          <div class="h-full flex flex-row items-center">
            <div
              style="margin: 0 auto; align-content: center; align-items: center;"
              class="flex-1 w-[45%] text-center gap-4 flex-col flex align-center"
            >
              <Time />
              <!--
              <div class="w-full border-b flex justify-center text-lg">
                {dateTime}
              </div>
-->
              <img
                style="box-shadow: rgb(255, 0, 0) 0px 0px 0px 4px;"
                class="p-4 px-10 border-4 rounded-lg border-blue-500 s:w-[450px]"
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
  {/if}

  <!-- Header -->
  <Header {searchVal} {productSearchEvt} {MenuOpen} />

  <div class="flex flex-1 overflow-y-auto">
    {#if prodList}
      <List {displayProduct} {shownProducts} {colorKey} />
    {:else}categories{/if}
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
