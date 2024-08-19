<script>
  import ColorKey from "$lib/ColorKey.json";
  import { onMount } from "svelte";

  let { curCategory, brandList, displayProduct, shownProducts, curbrand } =
    $props();

  onMount(() => {
    let observer = new IntersectionObserver(
      (e, ob) => {
        console.log("intersecting", e, ob);
      },
      {
        root: document.getElementById("listContainer"),
      },
    );

    shownProducts.forEach((e) => {
      if (!brandList.includes(e.brand_name) && e.brand_name) {
        brandList.push(e.brand_name);
      }
    });

    observer.observe(document.querySelector(".brandHeading"));
  });
  $effect(() => {
    if (curbrand !== null) {
      document.getElementById("current").scrollIntoView({ behavior: "smooth" });
    }
  });
</script>

<!--
<div class="h-full bg-blue-400 w-full absolute top-0 left-0 zIndex-[100]">
  <div class="bg-red-400 w-full h-10 sticky top-0"></div>
</div>
-->

<div id="listContainer" class="h-full w-full absolute">
  {#if shownProducts.length}
    {#each brandList as brand, idx}
      <div class="[&:last-child]:h-full">
        <div
          id={idx == curbrand ? "current" : ""}
          class={`brandHeading ${idx == curbrand ? "bg-slate-400 text-white" : "bg-slate-200 text-slate-500"} border-b text-center border-slate-500 p-2`}
        >
          {brand}
        </div>
        {#each shownProducts.filter((e) => {
          return e.brand_name == brand;
        }) as product}
          <div
            class="[&:not(:first-child)]:border-t py-3 pl-2 flex gap-2 hover:bg-slate-100 cursor-pointer"
            onclick={() => displayProduct(product)}
          >
            <div class="border-r-2 pr-2 text-nowrap flex items-center">
              ${product.price.replace("$", "").replace("/lb", "")}
              <span class="text-slate-400">/ lb</span>
            </div>
            <div>
              <span
                style={`color: ${ColorKey.find((e) => e.name == product.category).color}`}
              >
                {product.product_name}
              </span>
            </div>
          </div>
        {/each}
      </div>
    {/each}
    <!--
    {#each shownProducts as product}
    {/each}
    -->
  {:else}
    <div class="flex h-full justify-center items-center">
      <span class="text-slate-400 italic">No products match</span>
    </div>
  {/if}
</div>
