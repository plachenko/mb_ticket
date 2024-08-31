<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { hexToRgba } from "$lib/ColorUtils";
  let arrNum = $state(0);
  let { setCategory, setCurrentType, showCategories, destroyCategories } =
    $props();
  let showAny = $state(false);
  let currentType = $state(null);

  let categories = $state([
    {
      name: "ham",
      color: "#FFA07A",
      types: [
        "honey",
        "cooked",
        "imported",
        "hot",
        "cherrywood",
        "black forest",
        "virginia smoked",
        "spiral",
      ],
    },
    {
      name: "cheese",
      color: "#b3a100",
      types: [
        "havarti",
        "swiss",
        "provolone",
        "american",
        "cheddar",
        "pepper jack",
        "colby jack",
      ],
    },
    {
      name: "bologna",
      color: "#FF6347",
      types: ["beef", "vienna", "german", "small"],
    },
    {
      name: "beef",
      color: "#8B0000",
      types: ["roast beef", "italian roast beef", "corned beef", "pastrami"],
    },
    {
      name: "italian",
      color: "#A52A2A",
      types: ["salami", "soppressata"],
    },
    {
      name: "chicken",
      color: "#ffb433",
      types: [
        "peppered",
        "buffalo",
        "barbeque",
        "honey mesquite",
        "oven roasted",
      ],
    },
    {
      name: "turkey",
      color: "#edc478",
      types: ["buffalo", "roasted", "homestyle", "honey", "santa fe"],
    },
    {
      name: "franks & bacon",
      color: "#FF0",
    },
  ]);

  let catTicker = $state(null);
  let selectedIdx = $state(null);
  let showTypes = $state(false);

  $effect(() => {
    if (destroyCategories) {
      catDestroy();
      destroyCategories = false;
    }
  });

  let curTypeIdx = $state(null);
  let typeTicker = $state(null);

  function typeDestroy() {
    setInterval(() => {
      if (curTypeIdx > 0) {
        curTypeIdx--;
      }
    }, 400);
  }

  function catDestroy() {
    catTicker = setInterval(() => {
      if (arrNum > -1) {
        arrNum--;
      } else {
        clearInterval(catTicker);
        catTicker = null;
        setTimeout(() => {
          showTypes = true;
          if (categories[selectedIdx].types.length) {
            setInterval(() => {
              if (curTypeIdx <= categories[selectedIdx].types.length - 1) {
                curTypeIdx++;
              }
            }, 100);
          }
          setTimeout(() => {
            showAny = true;
          }, 700);
        }, 600);
      }
    }, 80);
  }

  let curColor = $state(null);

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

<div class="p-2 flex h-full m-auto gap-2 w-full overflow-hidden">
  {#if !showTypes}
    <div class="flex-1 gap-1 w-full grid grid-cols-3">
      {#each categories as item, idx}
        <div
          onclick={() => {
            selectedIdx = idx;
            // catDestroy();
            curColor = item.color;
            setCategory(item.name, item.color);
          }}
          class="hover:drop-shadow-md overflow-hidden capitalize cursor-pointer select-none flex flex-1 justify-center items-center relative"
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
  {/if}
  {#if showTypes}
    <div class="w-full h-full flex flex-col gap-1">
      <div class="grid grid-cols-3 w-full flex-1 gap-1">
        {#each categories[selectedIdx].types.sort((a, b) => {
          if (a > b) return 1;
          if (a < b) return -1;
        }) as type, idx}
          <div class="relative flex-1">
            {#if idx <= curTypeIdx}
              <div
                in:fly={{ y: 20, duration: 600 }}
                out:fly={{ y: 20 }}
                onclick={() => {
                  currentType = idx;
                  setCurrentType(type);
                  typeDestroy();
                }}
                class="capitalize cursor-pointer justify-center absolute w-full items-center h-full relative flex justify-center items-center rounded-md"
              >
                <div
                  style={`background: ${hexToRgba(curColor, 0.2)}`}
                  class="w-full h-full absolute rounded-md"
                ></div>
                <span
                  class={`text-center ${idx == currentType ? "font-bold" : ""}`}
                  >{type}</span
                >
              </div>
            {/if}
          </div>
        {/each}
      </div>
      <div
        class="w-full h-[50px] capitalize relative pt-[16px] cursor-pointer relative flex justify-center items-center rounded-md"
      >
        <div
          class="w-full border-b h-[3px] absolute top-0 left-0 flex justify-center"
        >
          <span class="bg-white absolute top-[-7px] text-sm px-[4px]">or</span>
        </div>
        {#if showAny}
          <div
            in:fly={{ y: -10 }}
            style={`background: ${hexToRgba(curColor, 0.4)}`}
            onclick={() => {
              setCurrentType("Any");
            }}
            class="capitalize w-full cursor-pointer h-full p-[20px] flex justify-center items-center rounded-md"
          >
            Any
          </div>
        {/if}
      </div>
    </div>
  {/if}
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
