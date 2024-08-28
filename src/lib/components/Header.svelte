<script>
  import { fly, fade } from "svelte/transition";
  import { onMount } from "svelte";

  let imglink = $state("");
  let {
    curType,
    curCategory,
    curProduct,
    MenuOpen,
    showHeader,
    productSearchEvt,
    searchVal,
    curSection,
  } = $props();
  function checkKey(e) {
    e.preventDefault();
    if (e.key == "Enter") {
      return false;
    }
  }

  let showSection = $state(false);

  let curProductBrand = "Any";
  let curProductType = "Any";

  onMount(() => {});

  $effect(() => {
    productSearchEvt(searchVal);
    if (curSection !== null) {
      setTimeout(() => {
        showSection = true;
      }, 300);
    }
  });
</script>

{#if showHeader}
  <div
    in:fly={{ y: -50, duration: 1000 }}
    out:fly={{ y: -50, duration: 1000 }}
    class={`border-b ${curSection ? "border-slate-700" : "border-slate-300"} flex gap-2 px-2 py-2 relative items-center`}
  >
    {#if curSection}
      <div
        in:fade={{ duration: 300 }}
        style={`${curSection !== null ? "background-color: " + curSection : ""}`}
        class="w-full h-full bg-red-300 left-0 top-0 absolute opacity-40 z-10"
      ></div>
    {/if}
    <div
      class=" z-10 bg-slate-100 rounded-md p-2 border border-slate-300 flex gap-2 cursor-pointer hover:bg-slate-100"
      onclick={() => MenuOpen("main")}
    >
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
    {#if !curProduct}
      <div
        contenteditable="true"
        placeholder="Enter a product..."
        onkeydown={checkKey}
        bind:textContent={searchVal}
        class="z-10 bg-slate-100 flex-1 text-nowrap inline-block overflow-hidden p-2 border rounded-md"
      ></div>
    {:else}
      <span class="flex-1 font-bold text-center"
        >{curProduct?.product_name}</span
      >
    {/if}
    <div
      onclick={() => {
        MenuOpen("shopping");
      }}
      class="flex z-10 rounded-md bg-slate-100 border-slate-300 text-slate-400 cursor-pointer hover:bg-slate-100 items-center p-2 border justify-center relative"
    >
      <div
        class="absolute rounded-md bg-red-300 text-white size-3 top-[2px] right-[2px] text-[10px] flex items-center justify-center"
      >
        2
      </div>
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class={`size-6 order.length ? "text-slate-300" : "text-red-500"`}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
    </div>
  </div>
  {#if showSection}
    <div
      in:fly={{ y: -20, duration: 400 }}
      class="border-b-2 border-slate-400 z-20 relative flex"
    >
      <div
        style={`${curSection ? "background-color: " + curSection : ""}`}
        class="w-full h-full opacity-20 absolute left-0 top-0 shadow-md"
      ></div>
      <span
        class="p-2 flex-1 hover:bg-red-300 cursor-pointer justify-center items-center flex"
      >
        <div class="relative text-xs flex flex-1 justify-center capitalize">
          Category &ndash;&nbsp;<span class="font-bold">{curCategory}</span>
        </div>
      </span>
      <div
        class="text-xs border-l-2 border-slate-600/40 relative flex capitalize flex-1 justify-center items-center"
      >
        Type
        {#if curType}
          &ndash; &nbsp;<span class="font-bold">{curType}</span>
        {/if}
        <div
          class="absolute w-full h-full border-b-4 top-[0px] border-slate-900/10"
        ></div>
      </div>
      <!--
      <div
        class="text-xs border-l-2 border-slate-600/40 flex flex-1 justify-center items-center"
      >
        Brand &ndash; &nbsp;<span class="font-bold">{curProductBrand}</span>
      </div>
      -->
    </div>
  {/if}
{/if}
