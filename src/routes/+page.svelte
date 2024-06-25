<script>
</script>

<div class="p-2 flex flex-col gap-2">
  <div class="bg-red-300 flex p-2">
    <input class="w-full" type="text" />
  </div>

  <div class="flex flex-1 bg-red-400 p-2">
    <div class="grid grid-cols-4 gap-2">
      {#each Array(10) as item}
        <div class="bg-blue-400">test</div>
      {/each}
    </div>
  </div>
</div>

<style>
</style>
