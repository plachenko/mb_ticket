<script>
  import { onMount, onDestroy } from "svelte";

  let { handleSpeech, speechText } = $props();

  let recognition;
  let isListening = $state(false);
  let transcript = "";

  function speechEnd(transcript) {
    // handleSpeech(transcript);
    speechText = transcript;

    console.log(speechText);
  }

  onMount(() => {
    console.log(speechText);
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert("Your browser does not support Speech Recognition API");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      transcript = event.results[event.results.length - 1][0].transcript.trim();
    };

    recognition.onstart = () => {};

    recognition.onend = () => {
      speechEnd(transcript);
      isListening = false;
    };
  });

  onDestroy(() => {
    if (recognition) {
      recognition.stop();
      recognition = null;
    }
  });

  function toggleListening() {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    isListening = !isListening;
  }
</script>

<div class="flex flex-col flex-1">
  <button
    class="flex items-center justify-center bg-blue-500 text-white w-full py-2 rounded relative"
    onclick={toggleListening}
  >
    {#if isListening}
      <div
        class="rounded-full absolute top-1 right-1 bg-red-600 size-[8px]"
      ></div>
      <div
        class="rounded-full absolute top-1 right-1 bg-red-400 size-[8px] animate-ping"
      ></div>
      Stop
    {:else}
      Listen
    {/if}
  </button>
  <div>test {transcript}</div>
</div>

<style>
</style>
