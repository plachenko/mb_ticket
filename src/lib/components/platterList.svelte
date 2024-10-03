<script>
  import platters from "$lib/platters.json";
  
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD", "#E74C3C"];

</script>

<div class="p-2 flex gap-2 flex-col">
  {#each platters as platterSection,idx}
    <div class={`text-color-['${colors[idx]}'] border-b text-lg font-bold`}>
      {platterSection.title}
    </div>
    {#each platterSection.items as item}
      <div style={`border: 2px ${colors[idx]} solid;`} class="p-2 rounded-lg relative">
        <div style={`background-color: ${colors[idx]};`} class="opacity-[.2] w-full h-full absolute top-0 left-0"></div>
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
