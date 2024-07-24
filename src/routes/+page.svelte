<script>
  import products from "$lib/meats.json";
  import categories from "$lib/categories.json";
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";

  let imglink = $state(null);
  let curProduct = $state(products[0]);
  let col = $state("test");

  let mainMenuShowing = $state(false);
  let shoppingCartShowing = $state(false);

  let showCart = $state(false);

  onMount(() => {
    imglink = `/deli_imgs/ham/ham_fnc_appleGlazed.png`;
    categories.filter((e) => {
      e.type_of_product == "ham";
    });
  });

  function checkKey(e) {
    e.preventDefault();
    if (e.key == "Enter") {
      return false;
    }
  }

  function showMainMenu(){
    mainMenuShowing = !mainMenuShowing;
  }

  let menuItems = [
    
    {
      text: "Back to Order",
      action: () => {
        mainMenuShowing = false
      },
    },
    {
      text: "Request Assistance",
      action: () => {},
    },
    
    {
      text: "Cancel Order",
      action: () => {},
    },
  ]
</script>

<div class="h-full flex flex-col flex-1 pointer-none relative overflow-hidden">
  {#if mainMenuShowing}
    <div in:fly={{ y: 20 }} out:fly={{ y: 20 }} class="bg-slate-200 flex absolute h-full w-full z-10">
      <div class="flex flex-1 items-center justify-center flex-col gap-2">
        <img src="mbstacked.png" class="h-10" />
        <h2 class="text-2xl bold pb-5">Main Menu</h2>
        <div class="w-[80%] flex-col gap-2 flex">
        {#each menuItems as menuItem}
          <div onclick={menuItem.action} class="hover:bg-slate-100 p-2 border border-slate-500 bg-slate-300 rounded cursor-pointer w-full flex justify-center">{menuItem.text}</div>
        {/each}
      </div>
      </div>
    </div>
  {/if}
  <div class="border-b flex gap-4 px-4 py-2 items-center">
    <div class="rounded-md p-2 border border-slate-300 flex gap-2 cursor-pointer hover:bg-slate-100" onclick={showMainMenu}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 text-slate-400 border-r border-slate-400 pr-1"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
        />
      </svg>
      <img src="mbstacked.png" class="h-6" />
    </div>
    <div
      contenteditable="true"
      placeholder="Enter a product..."
      onkeydown={checkKey}
      class="flex-1 text-nowrap inline-block overflow-hidden p-2 border rounded-md"
    ></div>
    <div onclick={() => (showCart = true)}>cart</div>
  </div>
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
  <div class="p-2 flex gap-2 border-t">
    {#each Array(2) as opt}
      <div class="bg-red-300 rounded flex-1 text-center p-1">option</div>
    {/each}
  </div>
</div>
