<script>
  import PlatterOrderForm from "./PlatterOrderForm.svelte";
  import PlatterList from "./platterList.svelte";

  let { formHandle } = $props();
</script>

<div class="h-full w-full flex">
  <PlatterList />
</div>
