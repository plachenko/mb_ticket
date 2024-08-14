<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import Nutritional from "$lib/nutritional.svelte";
  import DeliCase from "./DeliCase.svelte";

  let { curProduct, setCurOptions } = $props();
  let imglink = $state(null);
  let showNutritionInfo = $state(false);

  let productLinks = $state([]);
  let price = $state(0);

  let prodOpts = $state([
    { name: "Thickness", min: 1, max: 12, value: 2 },
    { name: "Amount", min: 1, max: 10, value: 0 },
  ]);

  onMount(() => {
    setCurOptions(price);
    imglink = `/deli_imgs/loaf/loaf_deutschmacher_liverwurst.png`;
    categories.filter((e) => {
      e.category == "ham";
    });
  });

  function amtEvt() {
    setCurOptions();
  }

  function thicknessEvt() {
    setCurOptions();
  }
</script>

<div class="w-full h-full flex flex-col">
  <!--
  <div class="w-full h-10">
    <div class="bg-slate-200 p-2 rounded-md text-center w-full">More Info</div>
  </div>
-->
  <!-- <DeliCase /> -->
  <div class="w-full flex-1 flex">
    <div class="w-[50%] border-r h-full flex items-center flex-col flex-1">
      <div class="flex-1 flex w-full justify-center items-center">
        {#if imglink}
          <div
            in:fly={{ x: -30 }}
            class="bg-contain bg-top drop-shadow-lg sm:bg-center bg-no-repeat size-[70%] sm:size-80"
            style={`background-image: url(${imglink})`}
          />
        {/if}
      </div>
    </div>
    <div class="p-2 w-[50%] h-full overflow-auto">
      {#each prodOpts as opt, idx}
        <div class={`${idx ? "border-t" : ""}`}>
          <div class="p-1 flex">
            <div class="flex-1">{opt.name}</div>
            <div>{opt.value}</div>
          </div>
          <input
            min={opt.min}
            max={opt.max}
            bind:value={opt.value}
            class="w-full"
            type="range"
          />
        </div>
      {/each}
      <div class="border-t pt-2">
        <select class="p-2 w-full" name="amount type">
          <option value="">lb</option>
          <option value="">slice</option>
          <option value="">gram</option>
        </select>
      </div>
    </div>
  </div>
  <!--
-->
  <!--
  <div class="flex flex-1">
    <div
      class="flex-1 justify-center items-center flex border-r border-slate-300"
    >
      <div
        in:fly={{ x: 30 }}
        class="bg-contain bg-top drop-shadow-lg sm:bg-center bg-no-repeat size-[70%] sm:size-80"
        style={`background-image: url(${imglink})`}
      />
    </div>

    <div class="flex-1 p-2 gap-2 flex flex-col overflow-y-scroll">
      {#if showNutritionInfo}<Nutritional />{:else}
        {#each productLinks as link, idx}
          <div class="h-400">
            {#if curlinkInt >= idx}
              <div
                in:fly={{ x: -40 }}
                onclick={link.action}
                class="p-2 bg-slate-200 rounded-md border-3 cursor-pointer hover:bg-slate-300"
              >
                {link.name}
              </div>
            {/if}
          </div>
        {/each}
      {/if}
    </div>
  </div>
-->
</div>
