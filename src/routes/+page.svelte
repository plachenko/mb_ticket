<script>
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import gsap from "gsap";

  import CategoryList from "$lib/categories.json";
  import Logo from "$lib/components/Logo.svelte";
  import TicketTouch from "$lib/components/TicketTouch.svelte";
  import Ticket from "$lib/components/Ticket.svelte";

  let yAmt = $state(0);
  let sliderShown = $state(false);
  let headerShown = $state(false);
  let showGrid = $state(false);

  let menuShown = $state(false);
  let orderShown = $state(false);

  let productShown = $state(false);

  let curColor = $state(null);
  let curCategory = $state(null);

  let curOrder = $state([]);

  function showOrder() {
    if (orderShown) {
      gsap.to(".orderItem", {
        x: 100,
        opacity: 0,
        stagger: 0.08,
      });
      setTimeout(() => {
        orderShown = false;
      }, 400);
    } else {
      orderShown = true;
      setTimeout(() => {
        gsap.fromTo(
          ".orderItem",
          { x: "+=30%", opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.08 },
        );
      }, 100);
    }
    menuShown = false;
  }

  function ticketSlideEvt(sliderObj) {
    yAmt = sliderObj.yAmt;

    if (sliderObj.done) {
      sliderShown = false;
      headerShown = true;
      setTimeout(() => {
        showGrid = true;
      }, 400);

      gsap.fromTo("#topGrid", { y: -70 }, { y: 0, delay: 0.1, duration: 0.5 });
      setTimeout(() => {
        gsap.fromTo(".listItems", { y: "+=100%" }, { y: 0, stagger: 0.05 });
      }, 420);
    }
  }
  function showProduct() {
    gsap.to(".listItems", {
      x: "-=100%",
      stagger: 0.02,
      onComplete: () => {},
    });
    setTimeout(() => {
      showGrid = false;
      productShown = true;
    }, 300);
  }

  function setNextList() {
    gsap.to(".nextList", { x: "-=100%", stagger: 0.03 });
    gsap.to(".curList", { opacity: 0, stagger: 0.03 });
    gsap.fromTo(
      ".nextList span",
      { opacity: 0 },
      { opacity: 1, stagger: 0.01, delay: 0.3 },
    );
  }

  onMount(() => {
    for (let i = 0; i < 20; i++) {
      curOrder.push({ name: "test item", price: 6.99 });
    }

    console.log(curOrder);

    setTimeout(() => {
      sliderShown = true;
    }, 400);

    setTimeout(() => {
      gsap.fromTo(
        "#slideTxt",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, delay: 0.6 },
      );
    }, 400);
  });

  function cancelOrder() {
    menuShown = false;
    orderShown = false;
    setTimeout(() => {
      sliderShown = true;
    }, 1000);
    headerShown = false;
    productShown = false;
    showGrid = false;
  }
</script>

<!--
<div class="absolute w-full h-full">
  <Ticket />
</div>
-->

<div id="viewContainer" class="overflow-hidden flex w-full h-full z-[0]">
  {#if menuShown}
    <div
      in:fly={{ y: -100 }}
      out:fly={{ y: -100 }}
      class="absolute bg-white w-full h-full z-[20] pt-[60px] flex flex-col"
    >
      <div class="flex-1"></div>
      <div class="flex justify-end shrink">
        <div
          onclick={() => {
            cancelOrder();
          }}
          class="btn w-full bg-red-400 flex justify-center text-white p-3"
        >
          Cancel Order
        </div>
        <div
          onclick={() => {
            menuShown = false;
          }}
          class={`btn w-full bg-slate-400 flex justify-center text-white p-3`}
        >
          Resume Order
        </div>
      </div>
    </div>
  {/if}

  {#if headerShown}
    <div
      in:fly={{ y: -20 }}
      out:fade
      class="bg-slate-300 z-[30] gap-2 w-full p-2 h-[50px] absolute top-0 flex border-b-2 border-slate-600"
    >
      <div
        onclick={() => {
          menuShown = !menuShown;
          orderShown = false;
        }}
        class={`btn ${!menuShown ? "" : "border-2 border-red-400"} w-[70px] h-full  rounded-md drop-shadow bg-slate-400`}
      ></div>
      <div class="bg-blue-300 flex-1"></div>
      <div class="shrink flex justify-end">
        <div
          onclick={() => {
            showOrder();
          }}
          class={` ${orderShown ? "border-2 border-red-400" : ""} btn w-[40px] float-right h-full bg-slate-400 rounded-md drop-shadow`}
        ></div>
      </div>
    </div>
  {/if}

  {#if orderShown}
    <div
      in:fly={{ x: 100 }}
      out:fly={{ x: 100 }}
      class="z-[15] w-full h-full pt-[50px] absolute overflow-hidden"
    >
      <div class="absolute overflow-y-auto bg-white p-2 w-full">
        {#each curOrder as orderItem, idx}
          <div
            class="orderItem opacity-0 bg-slate-300 last:border-none w-full border-dashed border-b-2 border-slate-400"
          >
            <div class="flex items-center gap-2">
              <div
                onclick={() => {
                  /*
                  console.log(document.getElementsByClassName(".orderItem"));
                  gsap.to(document.getElementsByClassName(".orderItem")[idx], {
                    x: 100,
                    opacity: 0,
                  });
                */
                  // curOrder.splice(idx, 0);
                }}
                class="btn bg-red-300 px-4 py-2"
              >
                X
              </div>
              <div class="p-3 flex w-full">
                <span class="flex-1">{orderItem.name}</span>
                <span>{orderItem.price}</span>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!--
  <div
    class="bg-blue-400 opacity-30 rounded-full absolute bottom-0 left-0 size-[80px] flex justify-center items-center"
  >
    R
  </div>
  -->

  <div class="absolute w-full h-full overflow-hidden">
    {#if productShown}
      <div
        in:fly={{ x: 100, duration: 800 }}
        out:fade={{ x: 100 }}
        class="absolute h-full w-full flex flex-col"
      >
        <div class="bg-yellow-300 flex-1 flex pt-[50px]">
          <div class="bg-blue-300 flex-1 p-2 flex flex-col">
            <div class="bg-slate-300 w-full h-full"></div>
            <div class="flex-1 flex gap-1">
              <div
                class="btn w-full flex justify-center items-center p-1 mt-1 bg-slate-300 rounded-md"
              >
                more info
              </div>
              <!--
            {#each Array(4) as tag}
              <span class="bg-red-300 rounded-md p-1"> tags </span>
            {/each}
            -->
            </div>
          </div>
          <div class="bg-red-300 flex-1">
            <div
              class="w-full h-[30px] bg-slate-300 border-b-2 flex items-center py-4 px-2"
            >
              <span class="text-sm font-bold text-slate-400">Amount</span>
            </div>
          </div>
        </div>
        <div class="shrink p-3 border-t-2 flex gap-2">
          <div class="flex-1 justify-center items-center flex">
            <div
              onclick={() => {
                productShown = false;
                showGrid = true;
              }}
              class="btn bg-red-400 rounded-md h-full w-full p-2 text-white text-center"
            >
              Cancel
            </div>
          </div>
          <div class="flex-1 justify-center items-center flex">
            <div
              onclick={() => {
                productShown = false;
                showGrid = true;
              }}
              class="btn bg-green-400 rounded-md h-full w-full p-2 text-white text-center"
            >
              <span>$6.99</span> &mdash; Add to Order
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
  {#if showGrid}
    <div in:fly={{ y: 60 }} out:fade class="w-full h-full">
      <div class="pt-[55px] flex flex-col w-full h-full px-2 py-1 gap-1">
        <div class="flex gap-1 relative">
          {#if curCategory}
            <div
              onclick={() => {
                curCategory = null;
              }}
              class="btn text-white bg-red-400 w-[50px] h-full flex justify-center items-center"
            >
              X
            </div>
          {/if}
          <div
            id="topGrid"
            class="relative bg-slate-400 overflow-hidden items-center p-2 w-full h-[40px]"
          >
            {#if curCategory}
              <div class="flex items-center">
                <div>
                  <img
                    src={`icons/${curCategory ? CategoryList[curCategory].name : item.name}.svg`}
                    class="opacity-30 landscape:size-7 border-slate-300 portrait:size-20 border-r-2 mr-1 pr-1"
                  />
                </div>
                <div in:fly={{ x: -20 }}>
                  {CategoryList[curCategory].name}
                </div>
              </div>
              <div
                style={`${curCategory ? "background-color: " + CategoryList[curCategory].color : ""}`}
                class="absolute top-0 left-0 opacity-[.4] w-full h-full"
              ></div>
            {/if}
          </div>
        </div>
        <div class="grid grid-cols-3 gap-1 w-full h-full">
          {#each CategoryList.sort((a, b) => {
            if (a.name < b.name) return -1;
            return 1;
          }) as item, idx}
            <div class="relative overflow-hidden">
              <div
                onclick={() => {
                  curCategory = idx;
                  setNextList();
                }}
                class="p-2 listItems curList rounded-md items-center justify-center flex w-full h-full absolute top-0 left-0"
              >
                <div
                  class="w-full landscape:h-[10px] portrait:h-full flex items-center portrait:flex-col"
                >
                  <div
                    class="landscape:w-[20%] portrait:h-full border-slate-300 landscape:border-r-2 portrait:flex items-center portrait:border-b-2"
                  >
                    <img
                      src={`icons/${curCategory ? CategoryList[curCategory].name : item.name}.svg`}
                      class="opacity-30 landscape:size-7 portrait:size-20 landscape:mr-1 landscape:pr-1"
                    />
                  </div>
                  <div class="flex-1 pl-2">
                    <span class="capitalize">{item.name}</span>
                  </div>
                  <div
                    style={`background-color: ${item.color}`}
                    class="absolute top-0 left-0 w-full h-full opacity-[.4] rounded-md"
                  ></div>
                </div>
                <!--

              >-->
              </div>
              <div
                onclick={() => {
                  showProduct();
                }}
                class="listItems rounded-md flex items-center justify-center nextList w-full h-full absolute top-0 left-[100%]"
              >
                {#if curCategory}
                  {CategoryList[curCategory].types[idx]}
                {/if}
                <div
                  style={`background-color: ${curCategory ? CategoryList[curCategory].color : "#000"}`}
                  class="absolute top-0 left-0 w-full h-full opacity-[.4] rounded-md"
                ></div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  {#if sliderShown}
    <div
      in:fly={{ y: -30 }}
      out:fade
      class="flex-1 flex flex-col justify-center items-center"
    >
      <div class="flex-1 h-full w-full flex items-center justify-center">
        <Logo />
      </div>
      <div
        id="slideTxt"
        class="flex w-full justify-center items-center shrink p-4 h-[30%]"
      >
        <div
          class="border-4 font-bold text-slate-400 rounded-md border-red-400 p-2 bg-white animate-pulse"
        >
          Swipe Down to Start an Order
        </div>
      </div>
    </div>
  {/if}
  {#if sliderShown}
    <div in:fly={{ x: 100 }} out:fade class=" right-0 w-[100px] h-full p-2">
      <TicketTouch {ticketSlideEvt} />
    </div>
  {/if}
</div>

<style>
  .listItems,
  .btn {
    cursor: pointer;
    user-select: none;
  }
</style>
