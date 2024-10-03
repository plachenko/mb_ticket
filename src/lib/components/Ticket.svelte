<script>
  import { fade, fly } from "svelte/transition";
  import Time from "$lib/components/Time.svelte";
  import { onMount } from "svelte";
  import gsap from "gsap";

  let { setMenuType, setTicketNumber } = $props();
  let ticketTaken = $state(false);
  let ticketNumber = $state(null);
  let isTouching = $state(false);

  let timeHeld = $state(0);

  let ticketTake = $state(false);
  let ticketMove = $state(false);

  let touchStartPos = $state(null);
  let curTick = $state(0);
  let ydiff = $state(0);
  let canTouch = $state(false);

  let ticket = $state(null);

  let touchPos = $state({ x: 0, y: 0 });

  let swipeShow = $state(false);
  let touchStartArea = $state(false);

  onMount(() => {
    let fb = document.getElementById("fingerBox");
    document
      .getElementById("touchContainer")
      .addEventListener("touchstart", (e) => {
        if (!canTouch) return;

        fb.style.top = `10px`;

        isTouching = true;
        touchStartPos = e.touches[0].clientY;

        gsap.to("#touchBox", { opacity: 1 });
        gsap.to("#touchBox .touchSection", {
          opacity: 0.5,
          stagger: 0.1,
          duration: 0.2,
        });

        document.getElementById("touchBox").style.top =
          e.touches[0].clientY - 20 + "px";
        document.getElementById("touchBox").style.left =
          e.touches[0].clientX - 50 + "px";
      });

    setTimeout(() => {
      ticket = document.getElementById("mbTicket");
      canTouch = true;
      swipeShow = true;
    }, 600);

    document
      .getElementById("touchContainer")
      .addEventListener("touchmove", (e) => {
        touchPos.x = e.touches[0].pageX;
        touchPos.y = e.touches[0].pageY;

        /*
        if (ticketMove) {
          ticket.style.left = "0px";
          ticket.style.top = "0px";
        }
        */

        if (touchStartPos) {
          ydiff = e.touches[0].clientY - touchStartPos;

          /*
          if (ydiff > 0 && ydiff < 100) {
            document.getElementById("slideTick").style.top = `${16 + ydiff}px`;
          } else {
            document.getElementById("slideTick").style.top =
              ydiff < 0 ? "16px" : "115px";
          }
          */
          fb.style.top = `${ydiff - 5}px`;

          if (ydiff > 140) {
            takeTicket();
          }

          // document.getElementById('mbTicket').style.transform = `scale(1, ${1+ydiff/400})`;

          /*
        console.log(Math.round(ydiff % 40) == 0)
        if(Math.round(ydiff % 40) < 2) {
          curTick++;
        }

        if(curTick > 3){
          curTick = 0;
          takeTicket();
        }
        */

          /*
        if (ydiff > 70) {
          takeTicket();
        }
          */

          if (ticketTake) return;
          let sections = document.getElementsByClassName("touchSection");

          for (let i = 0; i <= sections.length; i++) {
            if (touchPos.y < sections[i]?.getClientRects()[0].top + 30) {
              curTick = i;
              return;
            }
          }
        }
      });

    document
      .getElementById("touchContainer")
      .addEventListener("touchend", () => {
        isTouching = false;
        touchStartPos = null;
        curTick = 0;
        gsap.to("#touchBox", { opacity: 0 });
        /*
        gsap.to("#touchBox .touchSection", {
          opacity: 0,
          stagger: { duration: 0.4, reverse: true },
        });
        */

        if (!ticketTake) return;

        gsap.to(ticket, {
          y: "+=130",
          opacity: 0,
          duration: 0.8,
          oncomplete: () => {
            setTimeout(() => {
              ticketTaken = true;
              setMenuType(null);
            }, 400);
          },
        });
      });

    gsap.to("#nextTicket", { opacity: 1, y: 0, duration: 0.6, delay: 0.7 });
    // gsap.to("#swipeCopy", { opacity: 1, y: "+=20", delay: 0.8, loop: -1 });
    // gsap.to("#touchArea", { opacity: 1, y: "-=20", delay: 0.8, loop: -1 });

    gsap.fromTo(
      "#logo",
      { opacity: 0 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        onComplete: () => {
          // gsap.fromTo("#tapEl", { y: 20 }, { opacity: 1, duration: 0.4, y: 0 });
          gsap.to("#timeContainer", { opacity: 1 });
          ticketNumber =
            "A" + String(Math.floor(Math.random() * 100)).padStart(2, "0");
          setTicketNumber(ticketNumber);
        },
      },
    );
  });

  let ticketTween = $state(null);
  function takeTicket() {
    if (ticketTake) return;
    ticketTake = true;

    // window.navigator && window.navigator.vibrate(300);

    gsap.to("#logo", {
      opacity: 0,
    });
    gsap.fromTo(
      "#touchBox .touchSection",
      { opacity: 0 },
      {
        opacity: 1,
        stagger: 0.1,
        duration: 0.2,
      },
    );

    gsap.to("#mbTicket", {
      y: "+=20",
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        document.getElementById("ticketHolder").appendChild(ticket);
        const portrait = window.matchMedia("(orientation: portrait)").matches;
        gsap.fromTo(
          "#mbTicket",
          { y: -260, x: 20 },
          {
            opacity: 1,
            x: 20,
            y: portrait ? -140 : -108,
            duration: 0.4,
            delay: 0.1,
          },
        );
      },
    });

    gsap.to("#ticketHolder", {
      opacity: 1,
      onComplete: () => {
        // ticketTake = true;
      },
    });
    /*
    ticketTween = gsap.to("#mbTicket", {
      left: parseInt(document.getElementById("testTick").style.left) - 16,
      top: parseInt(document.getElementById("testTick").style.top) + 32,
      onComplete: () => {
        ticket.style.top = "54px";
        ticket.style.left = "10px";

        document.getElementById("testTick").appendChild(ticket);
      },
    });
    */

    gsap.to("#nextTicket", {
      duration: 0.3,
      opacity: 0,
      delay: 0.3,
      onComplete: () => {
        // setMenuType(null);
      },
    });
  }
</script>

<div
  id="touchArea"
  in:fly={{ y: -40, duration: 900 }}
  out:fly={{ y: 20 }}
  class={`opacity-[.2] z-[999] top-[50px] border-b-2 border-dashed landscape:scale-[.6] landscape:top-[41px] bg-slate-400/50 rounded-md absolute w-[80px] flex flex-col min-h-[50px] justify-center items-center`}
>
  <div
    class="h-full absolute top-[0px] w-full z-[999] flex flex-col justify-center"
    ontouchstart={(e) => {
      touchStartArea = true;
    }}
    ontouchend={(e) => {
      touchStartArea = false;
      console.log(touchStartArea);
    }}
  ></div>
  {#if touchStartArea}
    {#each Array(3) as sect, idx}
      <div class="bg-red-300 h-[40px] w-full border-b-3">
        <div
          class="h-0 absolute top-[10px] z-40 w-0 border-x-[16px] border-x-transparent border-t-[22px] border-slate-700"
        ></div>
      </div>
    {/each}
  {:else}
    <div
      class="h-0 absolute top-[10px] z-40 w-0 border-x-[16px] border-x-transparent border-t-[22px] border-slate-700"
    ></div>
  {/if}
</div>

<div
  id="touchContainer"
  class="gap-2 w-full h-full absolute left-0 top-0 z-[993]"
>
  <div
    id="touchBox"
    class={`overflow-hidden absolute ${!ticketTake ? "border-4 border-red-600/70" : "gap-2"} w-[100px] h-[200px] flex flex-col rounded-lg opacity-0 items-center`}
  >
    {#if !ticketTake}
      <!-- <div class="absolute w-full h-full"></div> -->
      <div
        out:fly={{ y: 10 }}
        id="fingerBox"
        class="z-[993] bg-red-400 w-[80%] h-10 top-[10px] rounded-md absolute"
      ></div>
    {/if}
    <div
      id="ticketHolder"
      class={`overflow-hidden w-full h-[133px] ${ticketTake ? "border-4 rounded-xl  border-dashed border-slate-500/20" : ""} absolute left-0 top-0 bg-white/30 z-[997] opacity-0`}
    ></div>
    <div
      class={`flex flex-col flex-1 h-full w-full ${ticketTake ? "mt-[20px]" : ""}`}
    >
      <div class="bg-white w-full h-full absolute top-0 left-0"></div>
      {#each Array(3) as section, idx}
        <div
          class={`touchSection flex-1 ${!ticketTake ? (idx >= curTick ? "bg-red-300" : "bg-green-300") : "[&:last-child]:bg-red-400 rounded-md"} z-[994] flex items-center justify-center w-full ${!ticketTake ? "border-b-2 border-dashed" : ""} border-slate-900 [&:last-child]:border-b-0`}
        >
          {#if idx + 1 <= curTick && !ticketTake}
            <div
              in:fade={{ y: -20 }}
              class={`absolute h-0 z-[101] w-0 border-x-[16px] border-x-transparent border-t-[22px] border-blue-700 z-[999]`}
            ></div>
          {/if}
          <div
            class={`h-0 z-[101] ${ticketTake ? "opacity-0" : idx + 1 > curTick ? "opacity-20" : "opacity-100"}  w-0 border-x-[16px] border-x-transparent border-t-[22px] z-[995] border-slate-700`}
          ></div>
        </div>
      {/each}
    </div>
  </div>
  <div
    ontouchmove={(e) => {
      /*
      console.log(timeHeld);
      if (timeHeld < 500) {
        return;
      }
      */
      if (ticketTake) {
        document.getElementById("touchBox").style.top =
          e.touches[0].clientY - 170 + "px";
        document.getElementById("touchBox").style.left =
          e.touches[0].clientX - 60 + "px";
      }
    }}
    class="w-full h-full absolute left-0 top-0 z-[998]"
  ></div>
  <div id="testTick" class="absolute h-[80px] w-[80px]"></div>
</div>

<div
  class="sm:pt-0 w-full cursor-pointer select-none flex items-end justify-center"
  out:fly={{ y: -10, duration: 300 }}
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
          oncontextmenu={(e) => {
            e.preventDefault();
            return false;
          }}
          style="box-shadow: rgb(255, 0, 0) 0px 0px 0px 4px;"
          class="opacity-0 p-4 px-10 border-4 rounded-lg border-blue-500 bg-white h-[150px] z-[180]"
          src="mbstacked.png"
        />

        <div class="h-[30px] absolute bottom-[-52px] flex justify-center">
          <!--
          {#if touchStartPos}
            <div
              in:fly={{ y: 20 }}
              out:fly={{ y: 20 }}
              class="border-4 rounded-lg w-[100px] h-[160px] bottom-[-285px] absolute flex justify-center flex-col items-center gap-7"
            >
              <div
                id="slideTick"
                class={`absolute top-[16px] h-0 z-[101] w-0 border-x-[16px] border-x-transparent border-t-[22px] border-red-400 opacity-60`}
              ></div>
              {#each Array(3) as tick, idx}
                <div
                  class={`h-0 z-[101] ${idx + 1 > curTick ? "opacity-20" : "opacity-100"} w-0 border-x-[16px] border-x-transparent border-t-[22px] border-slate-700`}
                ></div>
              {/each}
            </div>
          {/if}
-->

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
            class={`flex ${ticketTake ? "scale-[0.8]" : "landscape:scale-[0.6]"}  flex-col h-[100px] bottom-[-137px] landscape:bottom-[-105px] absolute w-[50px]`}
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
    <div
      class="p-2 pb-4 relative flex-1 max-h-[350px] flex justify-center items-center"
    >
      {#if !touchStartPos && !ticketTake && swipeShow}
        <div
          id="swipeCopy"
          in:fly={{ y: 20 }}
          out:fly={{ y: 20 }}
          class="p-2 border-4 bg-white border-red-300 landscape:hidden shadow-md font-bold text-red-300 rounded-lg text-[1.5em] text-center capitalize"
        >
          Swipe down to take a ticket
        </div>
      {/if}

      {#if touchStartPos}
        <div
          id="swipeCopy"
          in:fly={{ y: 20 }}
          out:fly={{ y: 20 }}
          class="p-2 border-4 bg-white absolute w-[80%] border-red-300 landscape:hidden shadow-md font-bold text-red-300 rounded-lg text-[1.5em] text-center capitalize"
        >
          Hold Ticket for options
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .overTick {
    background-color: "#F0F" !important;
    opacity: 1 !important;
  }
  .overTick div {
    opacity: 1 !important;
  }
</style>
