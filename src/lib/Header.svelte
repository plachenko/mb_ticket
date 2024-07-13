<script>
  let { product_search_value, showOrder, productSearchEvt, curProduct } =
    $props();
</script>

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
    <div class="border-l border-r px-5 flex flex-1 justify-center items-center">
      <h2 class="text-xl bold center">
        {curProduct?.product_name}
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

