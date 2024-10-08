<script>
  import orderForm from "$lib/platterOrder.json";
  import { onMount } from "svelte";
  import gsap from "gsap";

  let { formHandle } = $props();

  let showList = $state(true);

  let orderItems = $state([]);

  onMount(() => {
    gsap.fromTo("#platterForm", { opacity: 0, y: -20 }, { opacity: 1, y: 0 });
  });

  function getMin() {
    let d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();

    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }
</script>

<div id="platterForm">
  {#if showList}
    <PlatterList />
  {/if}

  <div class="bg-slate-400 sticky top-0 text-center text-xl p-2">
    Order a Platter
  </div>

  <form>
    {#each orderForm as formItem, idx}
      <div class="w-full flex border-b-2 border-slate-100">
        <div
          onclick={() => {
            orderItems[idx].focus();
          }}
          class="pr-2 w-[150px] flex justify-end items-center text-sm font-bold text-slate-400"
        >
          <label> {formItem.name} </label>
        </div>
        <div class="flex-1 p-2">
          {#if formItem.type == "date"}
            <input
              class="w-full border-slate-300 border-2 rounded-lg p-2 bg-white"
              min={getMin()}
              type="date"
            />
          {:else if formItem.type == "time"}
            <input
              class="w-full border-slate-300 border-2 rounded-lg p-2 bg-white"
              type="time"
            />
          {:else}
            <div
              class={`border-2 border-slate-300 ${formItem.type == "textarea" ? "h-[100px]" : "min-h-[30px]"} flex flex-1 w-full rounded-lg`}
            >
              <span
                contenteditable="true"
                bind:this={orderItems[idx]}
                oninput={(e) => {
                  formItem.value = "";
                  // return;
                  // e.preventDefault();
                  /*
              if (formItem.type == "tel") {
                e.preventDefault();
                return false;
              }
            */
                }}
                class={`w-full flex-1 p-2 rounded-lg`}
                placeholder={formItem.placeholder}>{formItem.value}</span
              >
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </form>

  <div class="bg-red-300 z-[997] w-full sticky bottom-0 p-2">
    <div class="w-full flex gap-2" onclick={() => {}}>
      <div
        onclick={() => {
          formHandle("cancel");
        }}
        class="bg-slate-200 font-bold w-full rounded-md p-2 text-center"
      >
        <span class="opacity-[.4]"> Cancel </span>
      </div>

      <div
        onclick={() => {
          formHandle("submitPlatter");
        }}
        class="bg-red-200 font-bold w-full rounded-md p-2 text-center"
      >
        <span class="opacity-[.4]"> Submit form </span>
      </div>
    </div>
  </div>
  <!--
  -->
</div>
