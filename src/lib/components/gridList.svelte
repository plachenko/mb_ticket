<script>
  import { onMount } from "svelte";
  import gsap from "gsap";

  let { listItems, gridItemSelected, createList } = $props();
  let itemArr = $state(null);

  let ready = $state(false);

  $effect(() => {
    if (listItems) {
      console.log(listItems);
    }
  });

  onMount(() => {
    if (!listItems.length) return;

    setTimeout(() => {
      gsap.to("#gridContainer", { opacity: 1, duration: 0.3 });

      createGrid(listItems);
    }, 30);
  });

  function createGrid(list) {
    itemArr = listItems.map((e) => {
      return {
        text: typeof e == "Object" ? e.name : e.name,
        color: e.color || "#CCC",
      };
    });

    setTimeout(() => {
      gsap.from(".gridItem", {
        y: -40,
        opacity: 0,
        stagger: 0.1,
        delay: 0.2,
        duration: 0.4,
      });
    }, 10);
  }

  function destroyGrid(idx) {
    gridItemSelected(itemArr[idx], idx);

    gsap.to(
      document.getElementById("gridContainer").children[idx].children[0],
      {
        y: -20,
        opacity: 0,
        duration: 0.3,
      },
    );

    gsap.to(".gridItem", {
      y: -40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.2,
      delay: 0.15,
    });
  }
</script>

<div class="p-2 flex h-full m-auto gap-2 w-full overflow-hidden relative">
  <div
    id="gridContainer"
    class="gridItems flex-1 gap-1 w-full grid grid-cols-3 opacity-0"
  >
    {#each itemArr as item, itemIdx}
      <div class="relative overflow-hidden flex justify-center items-center">
        <div
          onclick={() => destroyGrid(itemIdx)}
          class="gridItem border-slate-400 rounded-md absolute top-0 flex cursor-pointer justify-center items-center h-full w-full"
        >
          <div
            style={`${item?.color ? "background-color: " + item.color : ""}  `}
            class="absolute top-0 h-full w-full opacity-40 rounded-md"
          ></div>
          <span class="z-30">
            {item.text}
          </span>
        </div>
      </div>
    {/each}
  </div>
</div>
