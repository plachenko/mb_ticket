<script>
  import ColorKey from "$lib/ColorKey.json";
  import { onMount } from "svelte";

  let {
    curCategory,
    setBrand,
    brandList,
    displayProduct,
    shownProducts,
    curbrand,
    ignoreScroll,
  } = $props();

  onMount(() => {
    document
      .getElementById("listContainer")
      .parentElement.addEventListener("scroll", (e) => {
        if (ignoreScroll) return;
        let overlap = getOverlappedElement(
          document.getElementById("curBrandHeadingEl"),
        );

        if (overlap) {
          if (overlap?.parentElement.classList.contains("brandSection")) {
            setBrand(
              brandList.indexOf(
                overlap.parentElement.firstElementChild.innerText,
              ),
            );
          }
        }
      });

    shownProducts.forEach((e) => {
      if (!brandList.includes(e.brand_name) && e.brand_name) {
        brandList.push(e.brand_name);
      }
    });

    // observer.observe(document.getElementById("curBrandHeaderEl"));
  });

  function getOverlappedElement(specifiedElement) {
    const specifiedRect = specifiedElement.getBoundingClientRect();

    // Get all elements in the document
    const allElements = document.querySelectorAll("*");
    let overlappedElement = null;

    allElements.forEach((element) => {
      if (element !== specifiedElement) {
        const elementRect = element.getBoundingClientRect();

        if (
          specifiedRect.left < elementRect.right &&
          specifiedRect.right > elementRect.left &&
          specifiedRect.top < elementRect.bottom &&
          specifiedRect.bottom > elementRect.top
        ) {
          // Overlapping detected
          overlappedElement = element;
          return; // Break out of the loop early for the first overlapping element found
        }
      }
    });

    return overlappedElement;
  }

  $effect(() => {
    if (curbrand !== null) {
      setTimeout(() => {
        document
          .getElementById("current")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      }, 10);
    }
  });
</script>

<!--
<div class="h-full bg-blue-400 w-full absolute top-0 left-0 zIndex-[100]">
  <div class="bg-red-400 w-full h-10 sticky top-0"></div>
</div>
-->

<div id="curBrandHeadingEl" class="sticky top-[40px] h-[10px] z-30"></div>
<div id="listContainer" class="h-full w-full absolute top-0">
  {#if shownProducts.length}
    {#each brandList as brand, idx}
      <div class="brandSection [&:last-child]:h-full relative">
        <div
          class={`brandHeading ${idx == curbrand ? "bg-slate-400 text-white" : "bg-slate-200 text-slate-500"} sticky top-0 border-b text-center border-slate-500 p-2`}
        >
          {brand}
        </div>
        <div
          id={idx == curbrand ? "current" : ""}
          class="absolute top-[0px]"
        ></div>
        {#each shownProducts.filter((e) => {
          return e.brand_name == brand;
        }) as product, pIdx}
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
                style={`color: ${ColorKey.find((e) => e.name == product.category)?.color || "#000"}`}
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
