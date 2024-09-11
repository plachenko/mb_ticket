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
      <div class="bg-red-400 w-full h-[40px] rounded-b-md flex justify-center">
        <div class="absolute w-20">
          <div
            class="bg-red-400 w-[33px] top-[35px] absolute h-[20px] left-[6px] z-40 skew-x-[48deg]"
          ></div>
          <div
            class="bg-red-400 w-[33px] top-[40px] absolute h-[20px] right-[12px] z-40 skew-x-[-48deg]"
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
