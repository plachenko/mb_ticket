<script>
  let { curOptions } = $props();

  let options = [
    {
      name: "cancel",
      type: -1,
      action: () => {},
    },
    {
      name: "add to order",
      type: 1,
      action: () => {},
    },
  ];
</script>

<div class="p-2 flex gap-2 border-t">
  {#each curOptions as opt}
    <div
      onclick={() => {
        opt.action();
      }}
      class={` ${opt.type == 1 ? "bg-green-500" : "bg-red-500"} text-white select-none cursor-pointer rounded flex-1 text-center p-1`}
    >
      {opt.name}
    </div>
  {/each}
</div>
