<script>
  import { fly, fade } from "svelte/transition";
  import { onMount } from "svelte";
  import SpeechRecognition from "$lib/components/SpeechRecognition.svelte";
  import gsap from "gsap";

  let textInput = $state(false);
  let handlingSpeech = $state(false);
  let imglink = $state("");
  let {
    curType,
    curCategory,
    curProduct,
    MenuOpen,
    showHeader,
    curProdType,
    productSearchEvt,
    searchVal,
    curSection,
  } = $props();
  function checkKey(e) {
    e.preventDefault();
    if (e.key == "Enter") {
      return false;
    }
  }

  let showSection = $state(false);

  let curProductBrand = "Any";
  let curProductType = "Any";

  let voiceElShowing = $state(false);
  function showVoice() {
    voiceElShowing = true;
  }

  onMount(() => {});


  $effect(() => {
    productSearchEvt(searchVal);
    if (curSection !== null && curCategory) {
      gsap.to("#curSectionContainer", { y: +50, duration: 0.5, delay: 0.5 });
      gsap.from("#catImg", { x: +10, opacity: 0, duration: 0.4, delay: 0.7 });
      gsap.from("#catTxt", { opacity: 0, x: -10, duration: 0.4, delay: 0.7 });
      /*
      gsap.to(document.getElementById("curSectionContainer"), {
        y: +30,
        duration: 0.3,
      });
      */

      setTimeout(() => {
        showSection = true;
      }, 750);

      if(speechText){
        console.log('speaking', speechText);
      }
    }
  });

  let speechText = $state("test");
  function handleSpeech(transcript) {
    handlingSpeech = true;
    speechText = transcript;
    console.log('handle the speech', transcript);
  }

</script>

{#if showHeader}
  <div
    in:fly={{ y: -50, duration: 1000 }}
    out:fly={{ y: -50, duration: 1000 }}
    class={`border-b ${curSection ? "border-slate-300" : "border-slate-300"} flex gap-2 px-2 py-2 relative items-center`}
  >
    <div class="absolute top-0 left-0 w-full h-full bg-white z-20"></div>
    {#if curSection}
      <div
        in:fade={{ duration: 300 }}
        class="w-full h-full z-20 opacity-40 left-0 top-0 absolute"
        style={`${curSection !== null ? "background-color: " + curSection : ""}`}
      ></div>
    {/if}
    <div
      class="bg-slate-100/70 font-bold z-20 rounded-md p-2 border text-red-100 drop-shadow flex gap-2 cursor-pointer"
      onclick={() => MenuOpen("main")}
    >
      <!--
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
        />
      </svg>
-->

      <!-- <span> On Sale! </span> -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 text-slate-400 border-r border-slate-400 pr-1"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
        />
      </svg>
      <img src="mbstacked.png" class="h-6" />
    </div>
    {#if !curProduct}
      <div
        contenteditable="true"
        placeholder="Enter a product..."
        onblur={() => {
          /*
          if (!handlingSpeech) {
            voiceElShowing = false;
          }
          */
        }}
        onclick={showVoice}
        onkeydown={checkKey}
        bind:textContent={searchVal}
        id="textInputEl"
        class="z-20 bg-slate-100 flex-1 text-nowrap inline-block overflow-hidden p-2 border rounded-md"
      ></div>
      {#if textInput}
        <div in:fly={{ y: -20 }}>
          <SpeechRecognition {speechText} {handleSpeech} />
          <span>{speechText}</span>
        </div>
      {/if}
    {:else}
      <span class="flex-1 font-bold text-center"
        >{curProduct?.product_name}</span
      >
    {/if}
    <div
      onclick={() => {
        MenuOpen("shopping");
      }}
      class="flex z-20 rounded-md bg-slate-100 border-slate-300 text-slate-400 cursor-pointer hover:bg-slate-100 items-center p-2 border justify-center relative"
    >
      <div
        class="absolute rounded-md bg-red-300 text-white size-3 top-[2px] right-[2px] text-[10px] flex items-center justify-center"
      >
        2
      </div>
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class={`size-6 order.length ? "text-slate-300" : "text-red-500"`}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
    </div>
  </div>
  {#if curSection && curCategory}
    <div class="bg-white w-full z-10 relative flex">
      <div
        id="curSectionContainer"
        class={`border-b-2 cursor-pointer border-slate-400 flex relative w-full h-10 bg-white top-[-50px]`}
      >
        <div
          style={`${curSection ? "background-color: " + curSection : ""}`}
          class="w-full h-full opacity-20 absolute shadow-md"
        ></div>
        <div class="flex flex-1 items-center justify-center">
          <div class="px-2">
            <img
              id="catImg"
              src={`icons/${curCategory}.svg`}
              class="opacity-30 size-8 w-10"
            />
          </div>
          <span
            class="p-2 flex-1 justify-center items-center flex border-l-2 pl-2 border-dashed border-slate-800/20"
          >
            <div id="catTxt" class="relative text-xs flex pr-2 capitalize">
              Category &ndash;&nbsp;<span class="font-bold">{curCategory}</span>
            </div>
            <div class="flex-1 border-l-2 px-2 text-xs">{curProdType}</div>
          </span>
        </div>
        {#if curType}
          <div
            class="text-xs border-l-2 border-slate-600/40 relative flex capitalize flex-1 justify-center items-center"
          >
            Type &ndash; &nbsp;<span class="font-bold">{curType}</span>
          </div>
        {/if}
      </div>
      <!--
      <div
        class="text-xs border-l-2 border-slate-600/40 flex flex-1 justify-center items-center"
      >
        Brand &ndash; &nbsp;<span class="font-bold">{curProductBrand}</span>
      </div>
      -->
    </div>
  {/if}
  {#if voiceElShowing}
    <div
      in:fly={{ y: -20 }}
      class="border-b h-10 w-full flex justify-center p-1"
    >
      <SpeechRecognition {speechText} />
    </div>
  {/if}
{/if}
