<script>
  import { fade, fly } from "svelte/transition";
  import Time from "$lib/components/Time.svelte";
  import { onMount } from "svelte";
  import gsap from "gsap";

  let { setMenuType } = $props();
  let ticketTaken = $state(false);
  let ticketNumber = $state(null);

  onMount(() => {
    gsap.fromTo('#logo', {y: -30},{opacity: 1, y: 0, duration: .5, onComplete: () => {
      gsap.to("#tapEl", {opacity: 1, duration: .4, y: -20});
      ticketNumber =
      "A" + String(Math.floor(Math.random() * 100)).padStart(2, "0");
    }});
  });
</script>

<div
  class="sm:pt-0 w-full cursor-pointer select-none"
  out:fly={{ y: -10, duration: 300 }}
  onclick={() => {
    setTimeout(() => {
      setMenuType(null);
    }, 400);
    ticketTaken = true;
    //   menuType = null;
  }}
>
  <div class="flex h-full w-full flex-col">
    <div class="h-[40px] w-full flex justify-center items-center">
      <Time />
    </div>
    <div class="flex-1 flex justify-center p-[10px] items-center relative">
      <img
        id="logo"
        style="box-shadow: rgb(255, 0, 0) 0px 0px 0px 4px;"
        class="opacity-0 p-4 px-10 border-4 rounded-lg border-blue-500 h-[150px]"
        src="mbstacked.png"
      />
      {#if ticketNumber}
        <div
          in:fly={{ y: -20 }}
          class="flex flex-1 w-[320px] h-[150px] absolute justify-center items-end"
        >
          <div class="w-20 h-20 relative">
            <div
              class="items-end w-full z-30 justify-center flex bg-red-400 absolute bottom-[-28px]"
            >
              <div
                class="bg-red-400 w-[80px] h-[20px] z-20 top-[-20px] absolute"
              ></div>
              <div
                class="bg-red-400 border-4 border-white w-[40px] h-[40px] z-10 top-[-10px] absolute rounded-b-full"
              ></div>
            </div>
            {#if !ticketTaken}
              <div
                out:fly={{ y: 20, duration: 500 }}
                class="flex absolute bottom-[-32px] h-full left-0 w-full justify-center items-end"
              >
                <div class="bottom-0 absolute flex justify-center">
                  <div
                    class="bg-white w-[40px] h-[24px] rounded-b-full absolute z-20 top-0"
                  ></div>
                  <div
                    class="w-20 h-[90px] flex items-center justify-center rounded-b-md top-0 bg-red-400 absolute"
                  >
                    <span class="text-2xl mt-[20px] font-bold text-white">
                      {ticketNumber}
                    </span>
                  </div>
                  <div
                    class="w-10 top-[70px] h-[50px] bg-red-400 rounded-b-full absolute"
                  ></div>
                </div>
              </div>
            {/if}
          </div>
        </div>
      {/if}
      <!--
      <div class="flex justify-center items-end">
        <div
          class="items-end justify-center flex bg-red-400 absolute bottom-[0px]"
        >
          <div
            class="bg-red-400 w-[80px] h-[20px] z-20 top-[-23px] absolute"
          ></div>
          <div
            class="bg-red-400 border-4 border-slate-100 w-[40px] h-[40px] z-10 top-[-20px] absolute rounded-full"
          ></div>
        </div>
      </div>
-->
    </div>
    <div class="p-2 pb-4 flex-1 max-h-[350px] flex justify-center items-center">
      <div
        id="tapEl"
        class="p-2 border-4 bg-white border-red-300 shadow-md opacity-0 font-bold text-red-300 rounded-lg text-[1.5em] text-center capitalize"
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
