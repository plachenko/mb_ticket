<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import Nutritional from '$lib/nutritional.svelte';

  let arrNum = 0;
  let deliArr = [
    "ham",
    "turkey",
    "thin and trim",
    "italian meats",
    "chicken",
    "bologna",
  ];

  let divInt = null;
  let ticketNumber = 1;
  let ticketTaken = false;

  function setTicket() {
    ticketTaken = true;
    divInt = setInterval((e) => {
      if (arrNum >= deliArr.length - 1) {
        clearInterval(divInt);
        divInt = null;
        return;
      }
      arrNum++;
    }, 100);
  }

  onMount(() => {});
</script>

<div class="p-2 flex flex-col gap-2 h-full">
  {#if ticketTaken}
    <div class="flex p-2 gap-4">
      <img src="mbstacked.png" class="h-10" />
      <input
        class="w-full rounded-md p-2 border-2 border-slate-300"
        placeholder="search for a product..."
        type="text"
      />
      <div>
        Ticket #{ticketNumber}
      </div>
    </div>

    <div class="flex grow">
      <div class="w-full grid grid-cols-4 gap-2">
        {#each deliArr as item, idx}
          <div class="relative cursor-pointer" onclick={showProducts}>
            {#if arrNum >= idx}
              <div
                transition:fly={{ y: 20 }}
                class="bg-blue-400 absolute w-full rounded-md shadow flex h-full flex-col"
              >
                <div class="text-center">{item}</div>
                <div></div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <div
      style="align-content: center"
      class="h-full w-full"
      onclick={setTicket}
    >

    <div
      class="h-full w-full flex flex-row"
    >
      <div
        style="margin: 0 auto"
        class="flex-1 w-[45%] text-center gap-4 flex-col flex"
      >
        <div class="relative p-4">
          <div style="box-shadow: inset #00C 5px 5px 0px" class="skew-x-[-25deg] top-0 w-[50%] border-8 border-red-500 rounded-lg h-full absolute"></div>
          <img src="mbstacked.png" style="margin: 0px auto" />
        </div>
        <div
          style="margin: 0 auto"
          class="animate-pulse p-4 border-4 border-red-300 shadow-md font-bold text-red-300 rounded-lg sm:text-[5em] text-center capitalize"
        >
          please tap to get ticket
        </div>
      </div>
    </div>
  </div>
  {/if}
</div>

<style>
</style>
