<script>
  import { fade } from "svelte/transition";
  import Time from "$lib/components/Time.svelte";

  let { setMenuType } = $props();
</script>

<div
  class="pt-[45px] sm:pt-0 rel w-full cursor-pointer select-none"
  in:fade={{}}
  out:fade={{}}
  onclick={() => {
    setMenuType(null);
    //   menuType = null;
  }}
>
  <div class="h-full flex flex-row items-center">
    <div
      style="margin: 0 auto; align-content: center; align-items: center;"
      class="flex-1 w-[45%] text-center gap-4 flex-col flex align-center"
    >
      <div class="w-full absolute top-0 pt-2">
        <Time />
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
        please tap to get ticket
      </div>
    </div>
  </div>
</div>

