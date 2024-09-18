<script>
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import gsap from "gsap";
  let { curOptions, showFooter, curTicketNum } = $props();

  $effect(() => {
    console.log("ticketNum", curTicketNum);
    if (showFooter && curTicketNum !== null) {
      gsap.from("#ticketButt", { y: -100 });
    }
  });

  onMount(() => {});

  let options = [
    {
      name: "cancel",
      type: -1,
      action: () => {},
    },
    {
      name: "add to order",
      type: 1,
      action: () => {},
    },
  ];
</script>

<div class="overflow-hidden h-[70px] w-full relative">
  {#if showFooter}
    <div id="ticketButt" class="w-full flex flex-col justify-center absolute">
      <div class="bg-red-400 w-full h-[30px] rounded-b-md flex justify-center">
        <div class="absolute w-20">
          <div
            class="bg-red-400 w-[33px] top-[30px] absolute h-[25px] left-[3px] z-40 skew-x-[48deg]"
          ></div>
          <div
            class="bg-red-400 w-[33px] top-[30px] absolute h-[25px] right-[3px] z-40 skew-x-[-48deg]"
          ></div>
        </div>

        <div class="h-[40px] w-full flex justify-center relative">
          <div
            class="h-0 absolute top-[35px] z-40 w-0 border-x-[16px] border-x-transparent border-t-[22px] border-slate-700"
          ></div>
          <div class="bg-red-400 size-[45px] absolute rounded-full"></div>
        </div>
        <span class="text-white z-40 absolute font-bold top-[8px]"
          >{curTicketNum}</span
        >
      </div>

      <!--
      <div
        class="rounded-md absolute top-[4px] text-slate-100 font-bold text-sm h-10 left-[20px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
        Cancel Order

      </div>
-->

      <div class="w-full h-[30px] flex justify-center">
        <div
          class="bg-red-400 size-[60px] rounded-full absolute top-[5px]"
        ></div>
      </div>
    </div>
  {/if}
</div>
<!--
  <div in:fly={{ y: 100, duration: 800 }} class="p-2 flex gap-2 border-t">
    {#each curOptions as opt}
      <div
        onclick={() => {
          opt.action();
        }}
        class={` ${opt.type == 1 ? "bg-green-500" : "bg-red-500"} text-white select-none cursor-pointer rounded flex-1 text-center p-1`}
      >
{#if opt.value}
        {opt.name}
{/if}
          (<span class="border-b border-dashed mx-1">${opt.value}</span>)
      </div>
    {/each}
  </div>
-->
