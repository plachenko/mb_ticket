<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import TicketBody from "$lib/components/TicketBody.svelte";

  let touchContainer = $state(null);
  let touchBlock = $state(null);
  let touchArea = $state(null);
  let touchInner = $state(null);

  let taken = $state(false);

  let { ticketSlideEvt } = $props();

  let touchState = $state({
    done: false,
    yAmt: 0,
    yOffset: 40,
    yMax: 0,
  });

  onMount(() => {
    touchState.yMax = touchInner.clientHeight - touchState.yOffset - 20;

    touchArea.addEventListener("touchend", (e) => {
      gsap.to(touchBlock, {
        y: touchState.yMax - touchState.yAmt,
        duration: 0.3,
        onComplete: () => {
          taken = true;
        },
      });
      gsap.to(touchBlock, {
        opacity: 0,
        duration: 0.3,
        delay: 0.4,
        onComplete: () => {
          touchState.done = true;
          ticketSlideEvt(touchState);
        },
      });
    });

    touchArea.addEventListener("touchmove", (e) => {
      // Prevents from sliding back.
      // if (touchState.yAmt > ~~e.touches[0].clientY) return;

      touchState.yAmt = ~~e.touches[0].clientY;

      let yAmt = touchState.yAmt;
      let yOffset = touchState.yOffset;
      let yMax = touchState.yMax;

      if (yAmt < yOffset || yAmt > yMax + yOffset) return;

      touchState.yAmt = yAmt - yOffset - 4;

      if (yAmt >= yMax + yOffset) {
        taken = true;
        touchState.done = true;
      }

      touchBlock.style.top = `${touchState.yAmt}px`;

      ticketSlideEvt(touchState);
    });
  });
</script>

<div
  bind:this={touchContainer}
  class="relative bg-slate-400/20 h-full rounded-md overflow-hidden p-2 border-l-2 border-slate"
>
  <!--
  <div class="z-[900] absolute top-[-24px]">
    <TicketBody {taken} />
  </div>

  <TicketBody {taken} />
  -->

  <div
    bind:this={touchArea}
    class="z-[99] w-full h-full absolute top-0 left-0"
  ></div>
  <div
    onclick={() => {
      gsap.to(touchBlock, {
        y: touchState.yMax - touchState.yAmt,
        duration: 0.3,
        onComplete: () => {
          taken = true;
          touchState.done = true;
          ticketSlideEvt(touchState);
        },
      });
    }}
    class="absolute bottom-0 w-full h-[80px] p-2 bg-red-400/30 left-0 z-[100]"
  ></div>
  <div bind:this={touchInner} class="relative w-full h-full">
    <div class="bg-red-800 w-full h-[20px] absolute left-0"></div>
    <div
      bind:this={touchBlock}
      class="absolute top-0 left-0 flex justify-center items-center bg-slate-500/40 w-full h-[60px] rounded-md"
    >
      <div
        class={`h-0 z-[101] w-0 border-x-[16px] border-x-transparent border-t-[22px] z-[999]`}
      ></div>
    </div>
  </div>
</div>
