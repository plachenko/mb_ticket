<script>
  import products from "$lib/meats.json";
  import categories from "$lib/categories.json";
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import SpeechRecognition from "$lib/SpeechRecognition.svelte";

  let imglink = $state(null);
  let curProduct = $state(products[0]);
  let col = $state("test");

  let mainMenuShowing = $state(true);
  let shoppingCartShowing = $state(false);

  let showCart = $state(false);
  let order = $state({
    id: crypto.randomUUID(),
    dateStarted: new Date(),
    dateEnded: null,
    items: [],
  });

  let curItem = $state(null);

  let options = [
    {
      name: "cancel",
      type: -1,
      action: cancelOrderItem,
    },
    {
      name: "add to order",
      type: 1,
      action: addOrderItem,
    },
  ];

  function addOrderItem() {}

  function cancelOrderItem() {
    curItem = null;
  }

  onMount(() => {
    imglink = `/deli_imgs/ham/ham_fnc_appleGlazed.png`;
    categories.filter((e) => {
      e.category == "ham";
    });
  });

  function checkKey(e) {
    e.preventDefault();
    if (e.key == "Enter") {
      return false;
    }
  }

  function askAssistance() {
    navigator.vibrate(200);
  }

  function showOrder() {
    console.log("test");
  }

  function showMainMenu() {
    mainMenuShowing = !mainMenuShowing;
  }

  let menuItems = [
    {
      text: "Back to Order",
      action: () => {
        mainMenuShowing = false;
      },
    },
    {
      text: "Request Assistance",
      action: () => {},
    },

    {
      text: "Cancel Order",
      action: () => {},
    },
  ];
</script>

<div class="h-full flex flex-col flex-1 pointer-none relative overflow-hidden">
  {#if mainMenuShowing}
    <div
      in:fly={{ y: -20 }}
      out:fly={{ x: 20 }}
      class="bg-slate-200 flex absolute h-full w-full z-10"
    >
      <div
        class="flex flex-1 items-center justify-center flex-col gap-6 landscape:p-4 landscape:flex-row"
      >
        <img src="mbstacked.png" class="h-10" />

        <div class="flex w-[80%] gap-2 flex h-full flex-col text-xl">
          <div
            onclick={askAssistance}
            class="h-20 rounded-md flex justify-center hover:bg-slate-100 cursor-pointer p-4 bg-slate-300 border border-slate-400 items-center"
          >
            <div class="flex justify-center w-full items-center">
              <div
                class="w-[20%] flex-1 flex border-r justify-center border-slate-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"
                  />
                </svg>
              </div>
              <span class="w-[80%] pl-2 text-sm">Ask for assistance</span>
            </div>
          </div>

          <div class="w-full gap-2 flex h-full">
            {#if order.items.length}
              <div
                class="rounded-md flex p-4 flex-1 cursor-pointer hover:bg-slate-100 bg-slate-300 border border-slate-400 justify-center items-center h-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                <span class="ml-2 text-sm pl-2 border-l border-slate-400"
                  >Edit Order</span
                >
              </div>
            {/if}
            <div
              onclick={() => {
                mainMenuShowing = false;
              }}
              class="rounded-md flex-1 flex bg-slate-300 justify-center hover:bg-slate-100 cursor-pointer p-4 border border-slate-400 items-center"
            >
              <div class="flex justify-center w-full items-center">
                <div
                  class="pr-2 flex-1 items-center flex border-r justify-center border-slate-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="mt-1 size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
                <span class="w-[80%] pl-2 text-sm">Resume order</span>
              </div>
            </div>
          </div>
          <div
            class="h-20 rounded-md flex justify-center hover:bg-red-300 cursor-pointer p-4 bg-red-400 border border-red-600 items-center"
          >
            <div class="w-[20%] flex-1 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>

            <span
              class="text-white w-[80%] text-sm pl-2 ml-2 border-l border-white"
              >Cancel Order</span
            >
          </div>
        </div>
      </div>
    </div>
  {/if}
  <div class="border-b flex gap-4 px-4 py-2 items-center">
    <div
      class="rounded-md p-2 border border-slate-300 flex gap-2 cursor-pointer hover:bg-slate-100"
      onclick={showMainMenu}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 text-slate-400 border-r border-slate-400 pr-1"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
        />
      </svg>
      <img src="mbstacked.png" class="h-6" />
    </div>
    <div
      contenteditable="true"
      placeholder="Enter a product..."
      onkeydown={checkKey}
      class="flex-1 text-nowrap inline-block overflow-hidden p-2 border rounded-md"
    ></div>
    <div
      onclick={showOrder}
      class="flex rounded-md border-slate-300 text-slate-400 items-center p-2 border justify-center relative"
    >
      <div
        class="absolute rounded-full bg-red-300 text-white size-4 top-[-2px] right-[-9px] text-xs flex items-center justify-center"
      >
        2
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class={`size-6 order.length ? "text-slate-300" : "text-red-500"`}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
    </div>
  </div>
  <div class="flex flex-1 landscape:flex-row portrait:flex-col">
    <div class="flex-1 items-center justify-center flex">
      <div
        in:fly={{ x: 30 }}
        class="bg-contain bg-center bg-no-repeat size-[80%]"
        style={`background-image: url(${imglink})`}
      />
    </div>
    <div class="relative flex-1">
      <div class="bg-yellow-400 w-full flex-1 overflow-y-auto h-full absolute">
        {#each Array(10) as item, idx}
          <div class="bg-slate-300 border-b flex-1 p-3">{idx}</div>
        {/each}
      </div>
    </div>
  </div>
  <div class="p-2 flex gap-2 border-t">
    {#each options as opt}
      <div
        class={` ${opt.type == 1 ? "bg-green-500" : "bg-red-500"} text-white rounded flex-1 text-center p-1`}
      >
        {opt.name}
      </div>
    {/each}
  </div>
</div>
