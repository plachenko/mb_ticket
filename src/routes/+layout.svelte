<script>
  import "../app.css";

  let session = $state({
    name: "",
    date: new Date(),
  });
</script>

<slot />
