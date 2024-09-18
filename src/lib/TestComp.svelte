<script>
    let {testVal, testFunc} = $props();

    $effect(() => {
        testFunc(testVal)
        // console.log(testVal);
    })
</script>

<input class="h-10 w-full" type="text" bind:value={testVal} />
