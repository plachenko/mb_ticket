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
        <span class="text-white z-40 absolute font-bold top-[20px]"
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
