<script>
</script>

<div class="w-full h-10 p-1">
  <!-- <span class="text-sm w-full center"> case 2 </span> -->
  <div class="border-2 rounded-t-md p-[2px] rounded-b-0 h-full w-full flex">
    {#each Array(5) as deliCase, idx}
      <div
        class={`border-r w-10 h-full flex-1 ${idx == 1 ? "animate-pulse bg-red-400" : "bg-slate-400"} ${idx == 4 ? "rounded-tr-[5px]" : ""} ${idx == 0 ? "rounded-tl-[5px]" : ""}`}
      ></div>
    {/each}
  </div>
</div>
