<script>
  import Time from "$lib/components/Time.svelte";
  let order = $state({ items: [] });
  let { MenuOpen, dateTime } = $props();
</script>

<div
  class="flex flex-1 items-center justify-center flex-col gap-6 landscape:p-4 landscape:flex-row"
>
  <img src="mbstacked.png" class="h-10" />

  <div class="flex w-[80%] gap-2 flex h-full flex-col text-xl">
    <Time />
    <div
      onclick={() => {}}
      class="rounded-md flex-1 flex justify-center hover:bg-slate-100 cursor-pointer p-4 bg-slate-300 border border-slate-400 items-center"
    >
      <div class="flex justify-center w-full items-center flex-1">
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

    <div class="w-full gap-2 flex flex-1">
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
        onclick={() => MenuOpen()}
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
      onclick={() => MenuOpen("ticket")}
      class="flex-1 rounded-md flex justify-center hover:bg-red-300 cursor-pointer p-4 bg-red-400 border border-red-600 items-center"
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
