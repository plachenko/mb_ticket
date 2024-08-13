<script>
  import ColorKey from "$lib/ColorKey.json";
  let { curCategory, displayProduct, shownProducts } = $props();
</script>

<div class="h-full w-full">
  {#if shownProducts.length}
    {#each shownProducts as product}
      <div
        class="border-t-2 p-4 flex gap-2 hover:bg-slate-100 cursor-pointer"
        onclick={() => displayProduct(product)}
      >
        <div class="border-r-2 pr-2">
          ${product.price.replace("$", "").replace("/lb", "")}
          <span class="text-slate-400">/ lb</span>
        </div>
        <div>
          <span class="text-slate-700 underline underline-offset-2">
            {product.brand_name}
          </span>
          &ndash;
          <span
            style={`color: ${ColorKey.find((e) => e.name == product.category).color}`}
          >
            {product.product_name}
          </span>
        </div>
      </div>{/each}
  {:else}
    <div class="flex h-full justify-center items-center">
      <span class="text-slate-400 italic">No products match</span>
    </div>
  {/if}
</div>
