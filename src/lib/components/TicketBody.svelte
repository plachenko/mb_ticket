<script>
  import { fly } from "svelte/transition";
  let { taken } = $props();
</script>

{#if !taken}
  <div
    out:fly={{ y: 10 }}
    class="h-[90px] w-[65px] absolute flex flex-col justify-center"
  >
    <div class="flex-1 flex justify-center items-end relative">
      <div
        class="absolute flex justify-center top-[20px] w-[30px] h-[40px] z-[100]"
      >
        <div class="bg-white bottom-0 size-5 rounded-full absolute"></div>
        <div class="bg-white bottom-[10px] h-[16px] w-[18px] absolute"></div>
        <div
          class="bg-white absolute left-[0px] bottom-[14px] w-[5px] h-[8px] skew-y-[70deg]"
        ></div>
        <div class="bg-white w-[27px] h-[9px] absolute top-[14px]"></div>
        <div class="bg-white w-[23px] h-[9px] absolute top-[19px]"></div>
        <div
          class="bg-white absolute right-[0px] bottom-[14px] w-[5px] h-[8px] skew-y-[-70deg]"
        ></div>
      </div>

      <div class="absolute bg-red-400 h-[30px] w-[20px] bottom-[8px]">
        <div
          class="absolute bottom-[18px] left-[-6px] w-[33px] bg-red-400 h-[23px]"
        >
          <div
            class="absolute bg-red-400 w-[136%] h-[30px] left-[-18%] rounded-sm bottom-[0px]"
          ></div>
        </div>
        <div
          class="bg-red-400 absolute left-[-10px] bottom-[14px] w-[10px] h-[20px] skew-y-[70deg]"
        ></div>
        <div
          class="bg-red-400 absolute right-[-10px] bottom-[14px] w-[10px] h-[20px] skew-y-[-70deg]"
        ></div>
      </div>
      <div class="bg-red-400 rounded-full size-5"></div>

      <div class="absolute bottom-0 size-5 flex justify-center items-center">
        <div
          class={`h-0 z-[101] w-0 border-x-[8px] border-x-transparent border-t-[9px] z-[999] border-slate-600`}
        ></div>
      </div>
    </div>
  </div>
{/if}
