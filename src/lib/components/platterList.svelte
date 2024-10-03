<script>
  import platters from "$lib/platters.json";
</script>

<div class="p-2 flex gap-2 flex-col">
  {#each platters as platterSection}
    <div class="border-b text-lg font-bold">
      {platterSection.title}
    </div>
    {#each platterSection.items as item}
      <div class="bg-slate-300 p-2 rounded-lg border-2 border-slate-400">
        <div class="font-bold border-b-2 border-slate-100 mb-2 pb-1">
          {item.name}
        </div>
        <div class="text-sm">{item.description}</div>
        <div class="text-sm border-t-2 mt-2 pt-1">Serves:</div>
        {#if item.note}
          <div class="text-sm border-t-2 mt-2 pt-1">Note:</div>
        {/if}
      </div>
    {/each}
  {/each}
</div>
