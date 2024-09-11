<script>
  import { fade, fly } from "svelte/transition";
  import Time from "$lib/components/Time.svelte";
  import { onMount } from "svelte";
  import gsap from "gsap";

  let { setMenuType, setTicketNumber } = $props();
  let ticketTaken = $state(false);
  let ticketNumber = $state(null);

  onMount(() => {
    gsap.fromTo(
      "#logo",
      { opacity: 0 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        onComplete: () => {
          gsap.fromTo(
            "#nextTicket",
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0 },
          );
          gsap.to("#timeContainer", { opacity: 1 });
          gsap.fromTo("#tapEl", { y: 20 }, { opacity: 1, duration: 0.4, y: 0 });
          ticketNumber =
            "A" + String(Math.floor(Math.random() * 100)).padStart(2, "0");
          setTicketNumber(ticketNumber);
        },
      },
    );
  });
</script>

<!--
<div class="flex flex-col left-[30px] h-[140px] absolute w-[50px]">
  <div class="bg-red-400 relative flex-1">
    <div
      class="absolute bg-red-400 top-[35px] left-[32px] w-[30px] skew-x-[-20deg] h-full"
    ></div>
    <div
      class="absolute bg-red-400 top-[35px] left-[-12px] w-[30px] skew-x-[20deg] h-full"
    ></div>
  </div>
  <div class="h-[40px] w-full flex justify-center relative">
    <div
      class="h-0 absolute top-[10px] z-40 w-0 border-x-[16px] border-x-transparent border-t-[22px] border-slate-700"
    ></div>
    <div class="bg-red-400 size-[45px] absolute rounded-full"></div>
  </div>
</div>
-->

<div
  class="sm:pt-0 w-full cursor-pointer select-none flex items-end justify-center"
  out:fly={{ y: -10, duration: 300 }}
  onclick={() => {
    setTimeout(() => {
      setMenuType(null);
    }, 400);
    ticketTaken = true;
    // gsap.to("#nextTicket", { y: +20, height: +20 });
    // gsap.to("#nextStubButt", { y: +20, border: "none" });
    //
    /*
    gsap.to(document.getElementById("nextTicket").children[0], {
      height: +30,
      y: -20,
    });
    */
    //   menuType = null;
  }}
>
  <div class="flex h-full w-full flex-col z-50">
    <div
      id="timeContainer"
      class="opacity-0 h-[40px] w-full flex justify-center items-center"
    >
      <Time />
    </div>
    <div class="flex-1 flex justify-center p-[10px] items-center relative">
      <img
        id="logo"
        style="box-shadow: rgb(255, 0, 0) 0px 0px 0px 4px;"
        class="opacity-0 p-4 px-10 border-4 rounded-lg border-blue-500 h-[150px]"
        src="mbstacked.png"
      />

      <!--
      <div
        class="flex flex-col h-[100px] bottom-[-11px] z-90 absolute w-[50px]"
      >
        <div
          class="bg-red-400 w-[100px] left-[-25px] top-[-30px] rounded-b-md h-[80px] absolute z-50"
        ></div>

        <div class="bg-red-400 relative flex-1">
          <div
            class="absolute bg-red-400 top-[27px] left-[28px] w-[30px] skew-x-[-20deg] h-full"
          ></div>
          <div
            class="absolute bg-red-400 top-[27px] left-[-8px] w-[30px] skew-x-[20deg] h-full"
          ></div>
        </div>
        <div class="h-[40px] w-full flex justify-center relative">
          <div
            class="h-0 absolute top-[10px] z-40 w-0 border-x-[16px] border-x-transparent border-t-[22px] border-slate-700"
          ></div>
          <div class="bg-red-400 size-[45px] absolute rounded-full"></div>
        </div>
      </div>
-->
      <div
        id="nextTicket"
        class="overflow-hidden opacity-0 flex justify-center align-center w-[60px] h-[30px] absolute bottom-[-27px] z-[100]"
      >
        <div
          class="bg-red-400 border-4 absolute bottom-[12px] size-[30px] z-[100] rounded-full"
        ></div>
        <div
          class="h-0 bottom-[17px] absolute scale-[0.6] z-[101] w-0 border-x-[16px] border-x-transparent border-t-[22px] border-slate-700"
        ></div>
        <!-- <div class="bg-green-300 size-[20px] absolute"></div> -->
        <!--
-->
        <!--
        <div
          class="bg-red-400 border-4 absolute bottom-[-17px] z-[100] rounded-full"
        >
        </div>
-->
      </div>

      {#if ticketNumber && !ticketTaken}
        <div
          in:fly={{ y: -10 }}
          out:fly={{ y: 20, duration: 500 }}
          class="flex landscape:scale-[0.6] flex-col h-[100px] bottom-[-80px] landscape:bottom-[-95px] absolute w-[50px]"
        >
          <!--
          <div
            class="bg-green-300 border-white border-4 w-[60px] h-[60px] absolute z-[100] top-[-60px] left-[-4px] rounded-full"
          >
            <div
              class="h-0 absolute top-[10px] z-40 w-0 border-x-[16px] border-x-transparent border-t-[22px] border-slate-700"
            ></div>
          </div>
-->

          <div
            class="bg-red-400 w-[100px] left-[-25px] top-[-30px] rounded-b-md h-[80px] absolute z-50"
          ></div>
          <div
            class="absolute text-white absolute z-50 font-bold w-full top-[10px] text-center text-2xl"
          >
            {ticketNumber}
          </div>

          <div class="bg-white absolute top-[0px] z-90 w-full flex-1">
            <div
              class="absolute bg-white top-[27px] left-[28px] w-[30px] skew-x-[-20deg] h-full"
            ></div>
            <div
              class="absolute bg-white top-[27px] left-[-8px] w-[30px] skew-x-[20deg] h-full"
            ></div>
          </div>

          <div class="bg-red-400 relative flex-1">
            <div
              class="absolute bg-red-400 top-[27px] left-[28px] w-[30px] skew-x-[-20deg] h-full"
            ></div>
            <div
              class="absolute bg-red-400 top-[27px] left-[-8px] w-[30px] skew-x-[20deg] h-full"
            ></div>
          </div>
          <div class="h-[40px] w-full flex justify-center relative">
            <div
              class="h-0 absolute top-[10px] z-40 w-0 border-x-[16px] border-x-transparent border-t-[22px] border-slate-700"
            ></div>
            <div class="bg-red-400 size-[45px] absolute rounded-full"></div>
          </div>
        </div>
        <!--
        <div
          id="ticketStub"
          in:fly={{ y: -10 }}
          class="landscape:hidden flex z-40 flex-1 w-[320px] z-0 h-[150px] absolute justify-center items-end"
        >
          <div class="w-20 h-20 absolute bottom-0">
            <div class="absolute bottom-[-30px] h-20 w-full"></div>
            <div
              id="nextTicket"
              class="items-end w-full z-30 justify-center flex bg-red-400 absolute bottom-[-28px]"
            >
              <div
                class="bg-red-400 w-[80px] h-[20px] z-20 top-[-20px] absolute"
              ></div>
              <div
                id="nextStubButt"
                class="bg-red-400 border-4 border-white absolute w-[40px] h-[40px] z-10 top-[-10px] absolute rounded-b-full"
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
-->
      {/if}

      <!--
-->
    </div>
    <div class="p-2 pb-4 flex-1 max-h-[350px] flex justify-center items-center">
      {#if !ticketTaken}
        <div
          out:fly={{ y: 20, delay: 300 }}
          id="tapEl"
          class="p-2 border-4 bg-white border-red-300 landscape:hidden shadow-md opacity-0 font-bold text-red-300 rounded-lg text-[1.5em] text-center capitalize"
        >
          Tap to start an order
        </div>
      {/if}
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
