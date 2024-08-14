<script>
  let { MenuOpen } = $props();
</script>

<div class="cursor-pointer w-full bg-slate-400/30 p-2">
  <div class="w-[70%]">
    <div onclick={() => MenuOpen()}>close</div>
  </div>
  <div class="bg-green-300 rounded-md p-2">Submit Order</div>
</div>
