<script>
  import { onMount } from "svelte";
  import gsap from "gsap";

  let touchBlock = $state(null);
  let touchArea = $state(null);

  onMount(() => {
    touchArea.addEventListener("touchend", (e) => {
      gsap.to(touchBlock, { y: "+=200", opacity: 0, duration: 0.3 });
    });

    touchArea.addEventListener("touchmove", (e) => {
      if (
        ~~e.touches[0].clientY < 30 ||
        ~~e.touches[0].clientY > window.innerHeight - 50
      )
        return;
      touchBlock.style.top = ~~e.touches[0].clientY - 30 + "px";
    });
  });
</script>

<div class="flex w-full h-full">
  <div class="bg-slate-400"></div>
  <div class="flex-1 flex justify-center items-center">
    <div
      class="w-[170px] h-[30%] bg-white rounded-2xl scale-[1.5] items-center justify-center flex border-red-600 absolute border-4"
    >
      <div
        class="absolute left-0 w-full h-full border-blue-800 rounded-xl border-4 bg-white z-[2]"
      ></div>
      <div
        class="w-full text-4xl text-red-600 uppercase leading-7 tracking-[-2px] drop-shadow-[-3px_2px_0px_rgb(0,0,0)] text-center font-['Eponymous-BoldItalic'] z-[2]"
      >
        <div class="first-letter:scale-[3] first-letter:block">Market</div>
        <div class="first-letter:scale-[2]">Basket</div>
      </div>
      <div
        class="bg-red-600 px-2 text-xs rounded-2xl justify-center absolute h-full w-full flex items-end bottom-[-20px] left-[-15px] font-bold zIndex-[1] text-white"
      >
        <span class="absolute w-full text-center tracking-[-1px] pb-[2px]">
          &rdquo;<strong>MORE</strong> FOR YOUR DOLLAR&rdquo;
        </span>
      </div>
    </div>
  </div>
  <!-- touch block component -->
  <div
    class="relative bg-green-300 h-full w-[100px] overflow-hidden p-2 border-l-2 border-slate"
  >
    <div
      bind:this={touchArea}
      class="z-[999] bg-yellow-300/30 w-full h-full absolute top-0 left-0"
    ></div>
    <div
      class="absolute bottom-0 w-full h-[60px] p-2 bg-slate-400 left-0"
    ></div>
    <div class="relative w-full h-full">
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
</div>
