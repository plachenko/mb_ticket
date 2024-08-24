<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { hexToRgba } from "$lib/ColorUtils";
  let arrNum = $state(0);
  let { setCategory, showCategories, destroyCategories } = $props();
  let categories = $state([
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
      name: "italian",
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
  ]);

  let catTicker = $state(null);
  let selectedIdx = $state(null);

  $effect(() => {
    if (destroyCategories) {
      console.log("calling from effect");
      catDestroy();
      destroyCategories = false;
    }
  });

  function catDestroy() {
    catTicker = setInterval(() => {
      if (arrNum > -1) {
        arrNum--;
      } else {
        clearInterval(catTicker);
        catTicker = null;
      }
    }, 100);
  }

  onMount(() => {
    catTicker = setInterval(() => {
      if (arrNum < categories.length - 1) {
        arrNum++;
      } else {
        clearInterval(catTicker);
        catTicker = null;
      }
    }, 100);

    categories.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
    });

    categories.unshift({
      name: "on sale!",
      color: "#FF0000",
    });
  });

  function applyFilter() {}
</script>

<div class="p-2 grid grid-cols-3 h-full m-auto gap-2 container">
  {#each categories as item, idx}
    <div
      onclick={() => {
        selectedIdx = idx;
        setCategory(item.name);
      }}
      class="cursor-pointer select-none flex flex-1 justify-center overflow-hidden items-center relative"
    >
      {#if arrNum >= idx && idx !== selectedIdx}
        <div
          class={`justify-center absolute w-full items-center ${idx == 0 ? "animate-pulse" : ""} h-full rounded-md flex flex-1`}
          style={`background: ${hexToRgba(item.color, 0.3)}`}
          in:fly={{ y: 30 }}
          out:fly={{ y: -30 }}
        >
          {item.name}
        </div>
      {/if}
    </div>
  {/each}
</div>
<!--
<div class="flex flex-row gap-1 flex-wrap flex-1">
  <div class="flex grow p-4 flex-col gap-2 flex-1">
    <div class="w-full grid grid-cols-3 flex flex-1 gap-2 grow">
      {#each categories as item, idx}
        <div class="relative cursor-pointer">
          {#if arrNum >= idx}
            <div
              transition:fly={{ y: 20 }}
              class="bg-red-400 rounded-md flex-1 h-[] flex justify-center items-center"
            >
              {item.name}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>
-->
