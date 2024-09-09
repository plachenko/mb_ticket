<script>
  import { onMount } from "svelte";
  import gsap from "gsap";

  let {
    setCategory,
    listItemsChange,
    setCursection,
    listItems,
    gridItemSelected,
    createList,
  } = $props();
  let itemArr = $state(null);

  let ready = $state(false);
  let canDestroy = $state(false);

  $effect(() => {
    /*
    if (listItemsChange) {
      createGrid(listItems);
    }
    */
  });

  onMount(() => {
    if (!listItems.length) return;

    setTimeout(() => {
      gsap.to("#gridContainer", { opacity: 1, duration: 0.3 });

      createGrid(listItems);
    }, 30);
  });

  export function createGrid(list) {
    let innerList = list;

    if (list.sections) {
      innerList = list.items;
    }

    itemArr = innerList.map((e, idx) => {
      return {
        text: typeof innerList[idx] == "string" ? e : e.name,
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
        oncomplete: () => {
          // canDestroy = true;
          if (list.sections) {
            setCursection("#F00");
          }
        },
      });
    }, 10);

    setTimeout(() => {
      canDestroy = true;
    }, 1500);
  }

  function destroyGrid(idx) {
    gsap.to(
      document.getElementById("gridContainer").children[idx].children[0],
      {
        y: -40,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          // canRenew = true;
        },
      },
    );

    gridItemSelected(itemArr[idx], idx);

    gsap.to(".gridItem", {
      y: -40,
      opacity: 0,
      stagger: 0.1,
      delay: 0.15,
      duration: 0.17,
      onComplete: () => {
        // gridEl.createGrid(["testing", "whasdf"]);
      },
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
          onclick={() => {
            if (canDestroy) {
              canDestroy = false;
              destroyGrid(itemIdx);
            }
          }}
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
