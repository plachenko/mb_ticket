<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import Nutritional from "$lib/nutritional.svelte";
  import DeliCase from "./DeliCase.svelte";

  let { curProduct, curOptions } = $props();
  let imglink = $state(null);
  let showNutritionInfo = $state(false);

  let productLinks = $state([]);

  let prodOpts = $state([
    { name: "Amount", max: 10, value: 0 },
    { name: "thickness", max: 2, value: 2 },
  ]);

  onMount(() => {
    curOptions = [
      {
        name: "test",
        type: 0,
        action: () => {},
      },
    ];
    imglink = `/deli_imgs/loaf/loaf_deutschmacher_liverwurst.png`;
    categories.filter((e) => {
      e.category == "ham";
    });
  });
</script>

<div class="w-full h-full flex">
  <div class="w-[50%] border-r h-full flex items-center flex-col flex-1">
    <DeliCase />

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
  <div class="bg-blue-400 w-[50%] h-full">
    {#each prodOpts as opt}<div class="border-t bg-red-300">
        <div class="p-1 flex">
          <div class="flex-1">{opt.name}</div>
          <div>{opt.value}</div>
        </div>
        <input
          max={opt.max}
          bind:value={opt.value}
          class="w-full"
          type="range"
        />
      </div>
    {/each}
  </div>
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
