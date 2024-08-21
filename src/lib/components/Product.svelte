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

  let curAmtType = $state(0);

  let prodOpts = $state([
    {
      name: "Thickness",
      min: 0,
      max: 12,
      value: 2,
    },
    {
      name: "Amount",
      min: 0,
      max: 20,
      value: 0,
    },
  ]);

  let fracArr = [
    {
      amt: "1/4",
      value: 1 / 4,
      label: "quarter of a pound",
    },
    {
      amt: "1/3",
      value: 1 / 3,
      label: "third of a pound",
    },
    {
      amt: "2/4",
      value: 2 / 4,
      label: "half a pound",
    },
    {
      amt: "2/3",
      value: 2 / 3,
      label: "two thirds of a pound",
    },
    {
      amt: "3/4",
      value: 3 / 4,
      label: "3 quarters of a pound",
    },
    {
      amt: "",
    },
  ];

  let sliceTypes = ["shredded", "shaved", "thin", "normal", "thick"];

  let curSliceType = $state(0);
  let AmtType = $state([
    {
      label: "lbs",
      type: "pounds",
    },
    {
      type: "metric",
      label: "grams",
    },
    {
      type: "slice",
      label: "slices",
    },
  ]);
  let thickShow = $state(false);

  onMount(() => {
    console.log(curProduct.price, fracArr[1].value);
    setCurOptions(
      (curProduct.price * fracArr[prodOpts[1].value % 6].value).toFixed(2),
    );
    imglink = `/deli_imgs/loaf/loaf_deutschmacher_liverwurst.png`;
    thickShow = true;
    /*
    categories.filter((e) => {
      e.category == "ham";
    });
    */
  });

  function amtEvt() {
    setCurOptions();
  }

  function thicknessEvt() {
    setCurOptions();
  }

  function inputChange(field) {
    thickShow = false;
    setTimeout(() => {
      thickShow = true;
    }, 30);
    setCurOptions(
      (curProduct.price * fracArr[prodOpts[1].value % 6].value).toFixed(2),
    );
  }
</script>

<div
  in:fly={{ x: -100 }}
  out:fly={{ x: -100 }}
  class="w-full h-full flex flex-col"
>
  <!--
  <div class="w-full h-10">
</div>
    <div class="bg-slate-200 p-2 rounded-md text-center w-full">More Info</div>
-->
  <!-- <DeliCase /> -->
  <div class="w-full flex-1 flex">
    <div class="flex-1 border-r h-full flex items-center flex-col flex-1">
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
    <div
      class="flex-1 h-full overflow-y-auto overflow-x-hidden gap-2 flex flex-col relative"
    >
      <div class="absolute flex flex-col w-full h-full">
        {#each prodOpts as opt, idx}
          <!--
          <div class={`${idx ? "border-t" : ""}`}>
            <div class="p-1 flex">
              <div class="flex-1">
                {opt.name}
              </div>
              <div>
                {#if curAmtType == 0 && opt.name == "Amount"}
                  <span>
                    {#if Math.floor(opt.value / 5)}
                      {Math.floor(opt.value / 5)}
                    {/if}
                  </span>
                  <span class="diagonal-fractions">
                    {fracArr[opt.value % 5].amt}
                  </span>
                {:else}
                  <span>
                    {opt.value}
                  </span>
                {/if}
                <span>
                  {opt.name == "Amount"
                    ? AmtType[curAmtType].label
                    : sliceTypes[opt.value]}
                </span>
              </div>
            </div>
            <div class="flex gap-2 w-full">
              <input
                min={opt.min}
                max={opt.max}
                oninput={() => inputChange(opt.name)}
                bind:value={opt.value}
                class="w-full"
                type="range"
              />
              {#if idx == 1}
                <select
                  bind:value={curAmtType}
                  class="p-1 w-[10] pr-4 border-r-[5px] text-center rounded-md border-slate-100 bg-slate-100"
                  name="amount type"
                >
                  {#each AmtType as type, idx}
                    <option value={idx}>{type.label}</option>
                  {/each}
                </select>
              {/if}
            </div>
          </div>
-->
          <div class="p-2 border-b">
            <div class="flex flex-1 w-full items-center">
              <span class="text-sm font-bold flex-1">
                {opt.name}
              </span>
              <span class="float-right flex-1 text-right text-sm"
                >{opt.value}</span
              >
              {#if curAmtType == 0 && opt.name == "Amount"}
              <span>
                {#if Math.floor(opt.value / 5)}
                  {Math.floor(opt.value / 5)}
                {/if}
              </span>
              <span class="diagonal-fractions">
                {fracArr[opt.value % 5].amt}
              </span>
            {:else}
              <span>
                {opt.value}
              </span>
            {/if}
            <span>
              {opt.name == "Amount"
                ? AmtType[curAmtType].label
                : sliceTypes[opt.value]}
            </span>
            </div>
            <div>
              <input
                min={opt.min}
                max={opt.max}
                oninput={() => inputChange(opt.name)}
                bind:value={opt.value}
                class="w-full"
                type="range"
              />
            </div>
          </div>
        {/each}

        <div class="relative p-2 items-end flex flex-1">
          <div class="border-2 rounded-md text-center p-2 w-full">
            Add Instructions
          </div>
          <!--
          <div class="flex justify-center absolute top-[-8px] w-full">
            <div class="bg-white rounded-md px-2 text-xs">or</div>
          </div>
          <div
            class="py-1 text-center border rounded-md cursor-pointer hover:bg-slate-200"
          >
            special order
          </div>
-->
          <!--
          <select
            bind:value={curAmtType}
            class="p-2 w-full pr-4 border-r-[10px] border-slate-100 bg-slate-100"
            name="amount type"
          >
            {#each AmtType as type, idx}
              <option value={idx}>{type.label}</option>
            {/each}
          </select>
-->
        </div>
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
