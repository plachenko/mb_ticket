<script>
  let { displayProduct, shownProducts } = $props();
</script>

<div class="h-full">
  {#if shownProducts.length}
    {#each shownProducts as product}
      <div
        class="border-t-2 p-4 flex gap-2"
        onclick={() => displayProduct(product)}
      >
        <div class="border-r-2 pr-2">
          ${product.price.replace("$", "").replace("/lb", "")}
          <span class="text-slate-400">/ lb</span>
        </div>
        <div>
          {product.product_name}
        </div>
      </div>{/each}
  {:else}
    <div class="flex h-full justify-center items-center">
      <span class="text-slate-400 italic">No products match</span>
    </div>
  {/if}
</div>
