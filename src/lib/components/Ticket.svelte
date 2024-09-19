<script>
  import { fade, fly } from "svelte/transition";
  import Time from "$lib/components/Time.svelte";
  import { onMount } from "svelte";
  import gsap from "gsap";

  let { setMenuType, setTicketNumber } = $props();
  let ticketTaken = $state(false);
  let ticketNumber = $state(null);
  let isTouching = $state(false);

  let touchStartPos = $state(null);
  let curTick = $state(0);

  onMount(() => {
    document.addEventListener("touchstart", (e) => {
      isTouching = true;
      touchStartPos = e.touches[0].clientY;
    });

    document.addEventListener("touchmove", (e) => {
      if (touchStartPos) {
        let ydiff = e.touches[0].clientY - touchStartPos;

        // document.getElementById('mbTicket').style.transform = `scale(1, ${1+ydiff/400})`;

        console.log(Math.round(ydiff % 40) == 0)
        if(Math.round(ydiff % 40) < 2) {
          curTick++;
        }

        if(curTick > 3){
          curTick = 0;
          takeTicket();
        }

        /*
        if (ydiff > 70) {
          takeTicket();
        }
          */
      }
    });

    document.addEventListener("touchend", () => {
      isTouching = false;
      touchStartPos = null;
    });

    gsap.to("#nextTicket", { opacity: 1, y: 0, duration: 0.6, delay: 0.7 });

    gsap.fromTo(
      "#logo",
      { opacity: 0 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        onComplete: () => {
          gsap.to("#timeContainer", { opacity: 1 });
          gsap.fromTo("#tapEl", { y: 20 }, { opacity: 1, duration: 0.4, y: 0 });
          ticketNumber =
            "A" + String(Math.floor(Math.random() * 100)).padStart(2, "0");
          setTicketNumber(ticketNumber);
        },
      },
    );
  });

  function takeTicket() {
    ticketTaken = true;
    gsap.to("#nextTicket", {
      duration: 0.3,
      opacity: 0,
      delay: 0.2,
      onComplete: () => {
        setMenuType(null);
      },
    });
  }
</script>

<div
  class="sm:pt-0 w-full cursor-pointer select-none flex items-end justify-center"
  out:fly={{ y: -10, duration: 300 }}
  onclick={takeTicket}
>
  <div class="flex h-full w-full flex-col z-50">
    <div
      id="timeContainer"
      class="opacity-0 h-[40px] w-full flex justify-center items-center"
    >
      <Time />
    </div>
    <div class="flex-1 flex justify-center p-[10px] items-center relative">
      <div class="h-[150px] relative flex justify-center">
        <img
          id="logo"
          style="box-shadow: rgb(255, 0, 0) 0px 0px 0px 4px;"
          class="opacity-0 p-4 px-10 border-4 rounded-lg border-blue-500 bg-white h-[150px] z-[180]"
          src="mbstacked.png"
        />

        <div class="h-[30px] absolute bottom-[-52px] flex justify-center">
          
          <div class="border-l-4 border-r-4 w-[100px] h-[160px] bottom-[-285px] absolute flex justify-center flex-col items-center gap-7">
            {#each Array(3) as tick, idx}
            <div
              class={`h-0 z-[101] ${idx + 1  > curTick ? 'opacity-20' : 'opacity-100'} w-0 border-x-[16px] border-x-transparent border-t-[22px] border-slate-700`}
            ></div>
            {/each}

          </div>
          
          <div
            id="nextTicket"
            class="opacity-0 flex justify-center drop-shadow-lg landscape:scale-[0.6] align-center w-[60px] h-[30px] top-[20px] landscape:top-[0px] absolute z-[180]"
          >
            <div class="bg-red-400 w-12 h-7 absolute top-[-35px]"></div>
            <div
              class="bg-red-400 z-[102] skew-x-[20deg] border-white left-[2px] w-[12px] h-[40px] absolute top-[-35px] z-[104]"
            ></div>
            <div
              class="bg-red-400 z-[102] skew-x-[-20deg] right-[2px] border-white w-[12px] h-[40px] absolute top-[-35px] z-[104]"
            ></div>
            <div
              class="bg-red-400 border-white absolute bottom-[10px] size-[45px] z-[100] rounded-full"
            ></div>
            >
            <div
              class="h-0 bottom-[18px] absolute z-[101] w-0 border-x-[16px] border-x-transparent border-t-[22px] border-slate-700"
            ></div>
          </div>
        </div>
        {#if ticketNumber && !ticketTaken}
          <div
            in:fly={{ y: -10 }}
            out:fly={{ y: 20, duration: 500 }}
            id="mbTicket"
            class="flex landscape:scale-[0.6] flex-col h-[100px] bottom-[-137px] landscape:bottom-[-105px] absolute w-[50px]"
          >
            <div class="absolute top-[-17px] left-[5px] z-[80]">
              <div
                class={`bg-white z-[103] ${ticketTaken ? "w-[70px] left-[-16px] top-[-13px]" : "w-[74px] left-[-17px] top-[-15px]"} h-[8px] rounded-b absolute`}
              ></div>
              <div
                class="bg-white absolute top-[-9px] let-0 w-10 h-2 z-[202]"
              ></div>
              <div
                class="bg-white rounded-full size-[50px] left-[-5px] top-[-5px] absolute"
              ></div>
              <div
                class="bg-white w-[20px] h-[42px] skew-x-[20deg] absolute top-[-9px] left-[-9px]"
              ></div>
              <div
                class="bg-white w-[20px] h-[42px] skew-x-[-20deg] absolute top-[-9px] right-[-49px]"
              ></div>
            </div>

            <div
              class="bg-red-400 w-[100px] left-[-25px] top-[-30px] rounded-b-md h-[80px] absolute z-50"
            ></div>
            <div
              class="absolute text-white absolute z-50 font-bold w-full top-[27px] text-center text-2xl"
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
        {/if}
      </div>
    </div>
    <div class="p-2 pb-4 flex-1 max-h-[350px] flex justify-center items-center">
      {#if !ticketTaken}
        <div
          out:fly={{ y: 20, delay: 300 }}
          id="tapEl"
          class="p-2 border-4 bg-white border-red-300 landscape:hidden shadow-md opacity-0 font-bold text-red-300 rounded-lg text-[1.5em] text-center capitalize"
        >
          Swipe down to start an order
        </div>
      {/if}
    </div>
  </div>
</div>
