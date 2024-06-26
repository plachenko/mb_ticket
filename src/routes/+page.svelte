<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

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

  onMount(() => {
    divInt = setInterval((e) => {
      if (arrNum >= deliArr.length - 1) {
        clearInterval(divInt);
        divInt = null;
        return;
      }
      arrNum++;
    }, 100);
  });
</script>

<div class="p-2 flex flex-col gap-2 h-full bg-gray-800">
  <div class="flex p-2">
    <input
      class="w-full rounded-md p-2"
      placeholder="search for a product..."
      type="text"
    />
  </div>

  <div class="flex grow">
    <div class="w-full grid grid-cols-4 gap-2">
      {#each deliArr as item, idx}
        <div class="relative">
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
</div>

<style>
</style>
