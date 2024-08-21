<script>
  import { fade } from "svelte/transition";
  import Time from "$lib/components/Time.svelte";

  let { setMenuType } = $props();
</script>

<div
  class="sm:pt-0 w-full cursor-pointer select-none"
  in:fade={{}}
  out:fade={{}}
  onclick={() => {
    setMenuType(null);
    //   menuType = null;
  }}
>
  <div class="flex h-full w-full flex-col">
    <div class="h-[40px] w-full flex justify-center items-center">
      <Time />
    </div>
    <div class="flex-1 flex justify-center p-[10px] items-center">
      <img
        style="box-shadow: rgb(255, 0, 0) 0px 0px 0px 4px;"
        class="p-4 px-10 border-4 rounded-lg border-blue-500 h-[150px]"
        src="mbstacked.png"
      />
    </div>
    <div class="p-2 pb-4 flex-1 max-h-[350px] flex justify-center items-center">
      <div
        class="p-2 animate-pulse border-4 bg-white border-red-300 shadow-md font-bold text-red-300 rounded-lg text-[1.5em] text-center capitalize"
      >
        Tap to start an order
      </div>
    </div>
  </div>
  <!--
  <div class="h-full flex flex-row items-center">
    <div
      style="margin: 0 auto; align-content: center; align-items: center;"
      class="flex-1 w-[45%] text-center gap-4 flex-col flex align-center"
    >
      <div class="w-full pt-2">
      </div>
      <img
        style="box-shadow: rgb(255, 0, 0) 0px 0px 0px 4px;"
        class="p-4 px-10 border-4 rounded-lg border-blue-500 s:w-[450px]"
        src="mbstacked.png"
      />
      <div
        style="margin: 0 auto"
        class="animate-pulse p-4 border-4 border-red-300 shadow-md font-bold text-red-300 rounded-lg sm:text-[2em] text-center capitalize"
      >
        Please tap to start an order
      </div>
    </div>
  </div>
  -->
</div>
