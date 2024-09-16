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
    itemArr = [];
    let innerList = list;

    if (list.sections) {
      innerList = list.items;
    }

    itemArr = innerList.map((e, idx) => {
      return {
        text: typeof innerList[idx] == "string" ? e : e.name,
        color: e.color || "#CCC",
        items: e?.types,
      };
    });

    itemArr.sort((a, b) => {
      if (a.text < b.text) return -1;
      if (a.text > b.text) return 1;
    });

    setTimeout(() => {
      gsap.fromTo(
        ".gridItem",
        {
          y: -40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          delay: 0.8,
          duration: 0.4,
          oncomplete: (e) => {
            if (list.sections) {
              // setCursection("#F00");
            }
          },
        },
      );
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
        duration: 0.25,
        onComplete: () => {
          console.log(itemArr[idx]);
          setCursection(itemArr[idx].color);
          // gridItemSelected(itemArr[idx], idx);
          // canRenew = true;
        },
      },
    );

    // gridItemSelected(itemArr[idx], idx);

    gsap.to(".gridItem", {
      y: -40,
      opacity: 0,
      stagger: 0.04,
      delay: 0.1,
      duration: 0.2,
      onComplete: () => {
        gridItemSelected(itemArr[idx], idx);
      },
    });
  }
</script>

<div class="p-2 flex h-full m-auto gap-2 w-full overflow-hidden relative">
  <div
    id="gridContainer"
    class={`gridItems flex-1 gap-1 w-full grid ${itemArr?.length >= 1 ? "grid-cols-3" : "grid-cols-2"}  opacity-0`}
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
          class="gridItem border-slate-400 z-40 rounded-md absolute top-0 flex p-2 cursor-pointer justify-center items-center h-full w-full"
        >
          <div
            style={`${item?.color ? "background-color: " + item.color : ""}  `}
            class="absolute top-0 h-full w-full opacity-40 rounded-md"
          ></div>

          <div class="w-full h-full absolute flex portrait:flex-col">
            <div
              class="landscape:w-10 bg-white/50 portrait:w-full h-full items-center justify-center flex"
            >
              <img
                src={`icons/${item.text}.svg`}
                class="opacity-30 landscape:size-7 portrait:size-20"
              />
            </div>
            <div
              class="portrait:border-t-2 landscape:border-l-2 border-white/50 border-dashed flex-1 p-2 h-full justify-center items-center flex"
            >
              {item.text}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
